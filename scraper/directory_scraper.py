#!/usr/bin/env python3
"""
Trearddur Bay Directory Scraper

Scrapes Google Places API (New) for local businesses in Trearddur Bay, Anglesey
and upserts results into Supabase.

Usage:
  python directory_scraper.py --category eat-and-drink --dry-run --verbose
  python directory_scraper.py --category all
  python directory_scraper.py --dry-run --verbose
"""

import os
import re
import sys
import time
import json
import logging
import argparse
from datetime import datetime, timezone
from dotenv import load_dotenv
from functools import wraps

import httpx
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")
GOOGLE_PLACES_API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")

PLACES_API_URL = "https://places.googleapis.com/v1/places:searchText"

# Trearddur Bay centre, 3km default radius
LOCATION = {"latitude": 53.2773, "longitude": -4.6217}
DEFAULT_RADIUS_M = 3000

# Each entry: (query, radius_override_metres or None for default)
CATEGORIES = {
    "eat-and-drink": [
        ("restaurants Trearddur Bay", None),
        ("cafes Trearddur Bay", None),
        ("pubs Trearddur Bay", None),
        ("takeaway Trearddur Bay", None),
        ("cafe Holyhead Anglesey", None),
        ("restaurant Holyhead Anglesey", None),
        ("pub Holyhead Anglesey", None),
        ("coffee shop Trearddur Bay", None),
        ("fine dining Anglesey", None),
        ("gastropub Anglesey", None),
    ],
    "stay": [
        ("hotels Trearddur Bay", None),
        ("accommodation Trearddur Bay", None),
        ("B&B Trearddur Bay", None),
        ("holiday cottages Trearddur Bay", None),
        ("caravan park Trearddur Bay", 5000),
        ("camping Trearddur Bay", 5000),
        ("caravan park Holyhead Anglesey", 5000),
        ("campsite Holyhead Anglesey", 5000),
        ("static caravans Trearddur Bay", 5000),
        ("hotels Holyhead Anglesey", 5000),
        ("guest house Trearddur Bay", 5000),
    ],
    "activities": [
        ("activities Trearddur Bay", None),
        ("watersports Trearddur Bay", None),
        ("kayak hire Trearddur Bay", None),
        ("golf Trearddur Bay", None),
        ("attractions Holyhead Anglesey", None),
        ("things to do Anglesey", None),
        ("tourist attraction Trearddur Bay", None),
        ("walking trails Anglesey", None),
        ("diving Anglesey", None),
        ("boat trips Anglesey", None),
        ("coasteering Anglesey", None),
    ],
    "shops": [
        ("shops Trearddur Bay", None),
        ("gift shop Trearddur Bay", None),
        ("gallery Trearddur Bay", None),
        ("gift shop Holyhead Anglesey", None),
        ("farm shop Anglesey", None),
        ("art gallery Anglesey", None),
        ("convenience store Trearddur Bay", None),
    ],
}

FIELDS_MASK = (
    "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,"
    "places.websiteUri,places.googleMapsUri,places.rating,places.userRatingCount,"
    "places.location"
)


def setup_logging(verbose: bool = False) -> logging.Logger:
    level = logging.DEBUG if verbose else logging.INFO
    fmt = "%(asctime)s [%(levelname)s] %(message)s"
    logging.basicConfig(level=level, format=fmt)
    return logging.getLogger("trearddurbay_scraper")


def generate_slug(name: str, existing_slugs: set[str]) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    base = slug
    counter = 1
    while slug in existing_slugs:
        slug = f"{base}-{counter}"
        counter += 1
    return slug


def search_places(
    query: str,
    api_key: str,
    logger: logging.Logger,
    radius_metres: int | None = None,
) -> list[dict]:
    """Call Google Places API (New) Text Search with circular location bias."""
    radius = radius_metres if radius_metres is not None else DEFAULT_RADIUS_M
    headers = {
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": FIELDS_MASK,
        "Content-Type": "application/json",
    }
    body = {
        "textQuery": query,
        "locationBias": {
            "circle": {
                "center": LOCATION,
                "radius": radius,
            }
        },
        "maxResultCount": 20,
    }

    try:
        resp = httpx.post(PLACES_API_URL, headers=headers, json=body, timeout=30)
        if resp.status_code == 429:
            logger.warning("Rate limited by Google — backing off 5s")
            time.sleep(5)
            return search_places(query, api_key, logger)
        resp.raise_for_status()
        data = resp.json()
    except httpx.HTTPStatusError as exc:
        logger.error("Places API error for query '%s': %s %s", query, exc.response.status_code, exc.response.text[:200])
        return []
    except httpx.RequestError as exc:
        logger.error("Places API error for query '%s': %s", query, exc)
        return []

    places = data.get("places", [])
    logger.debug("Query '%s' returned %d places", query, len(places))
    return places


def normalise_place(place: dict, category: str, existing_slugs: set[str]) -> dict:
    """Transform a Google Places result into the trearddurbay_places schema."""
    display_name = place.get("displayName", {})
    name = display_name.get("text", "Unknown")
    place_id = place.get("id", "")
    address = place.get("formattedAddress", "")
    phone = place.get("nationalPhoneNumber")
    website = place.get("websiteUri")
    maps_url = place.get("googleMapsUri")
    rating = place.get("rating")
    review_count = place.get("userRatingCount", 0)
    location = place.get("location", {})
    lat = location.get("latitude")
    lng = location.get("longitude")

    slug = generate_slug(name, existing_slugs)

    return {
        "name": name,
        "slug": slug,
        "address": address,
        "phone": phone,
        "website": website,
        "google_maps_url": maps_url,
        "rating": rating,
        "review_count": review_count,
        "place_id": place_id,
        "category": category,
        "lat": lat,
        "lng": lng,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


def with_retries(max_attempts: int = 3, initial_backoff: float = 2.0):
    """Decorator to retry a function on httpx connection errors."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            backoff = initial_backoff
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except (httpx.RemoteProtocolError, httpx.ConnectError, httpx.ReadTimeout) as exc:
                    if attempt == max_attempts - 1:
                        raise
                    _logger = logging.getLogger("trearddurbay_scraper")
                    _logger.warning(
                        "Supabase connection error (attempt %d/%d): %s — retrying in %.1fs",
                        attempt + 1, max_attempts, exc, backoff
                    )
                    time.sleep(backoff)
                    backoff *= 2
        return wrapper
    return decorator


@with_retries()
def get_existing_place_ids(supabase) -> set[str]:
    resp = supabase.table("trearddurbay_places").select("place_id").execute()
    return {r["place_id"] for r in resp.data if r.get("place_id")}


@with_retries()
def get_existing_slugs(supabase) -> set[str]:
    resp = supabase.table("trearddurbay_places").select("slug").execute()
    return {r["slug"] for r in resp.data if r.get("slug")}


@with_retries()
def upsert_place(supabase, place: dict, existing_ids: set[str]) -> tuple[str, bool]:
    """
    Upsert a place. Returns (place_id, is_new).
    Uses place_id as the conflict key.
    """
    is_new = place["place_id"] not in existing_ids

    resp = supabase.table("trearddurbay_places").upsert(
        place,
        on_conflict="place_id",
        ignore_duplicates=False,
    ).execute()

    if resp.data:
        returned_id = resp.data[0].get("id") or resp.data[0].get("place_id")
        if not returned_id:
            fetch_resp = supabase.table("trearddurbay_places").select("id").eq(
                "place_id", place["place_id"]
            ).execute()
            returned_id = fetch_resp.data[0]["id"] if fetch_resp.data else None
    else:
        fetch_resp = supabase.table("trearddurbay_places").select("id").eq(
            "place_id", place["place_id"]
        ).execute()
        returned_id = fetch_resp.data[0]["id"] if fetch_resp.data else None

    return returned_id, is_new


def run(
    categories: list[str],
    dry_run: bool,
    verbose: bool,
    logger: logging.Logger,
) -> dict:
    stats = {
        "api_calls": 0,
        "unique_places": 0,
        "new_places": 0,
        "updated_places": 0,
        "skipped_duplicates": 0,
        "categories_zero": [],
    }

    if not GOOGLE_PLACES_API_KEY:
        logger.error("GOOGLE_PLACES_API_KEY not set in ~/.env")
        return stats

    if not dry_run:
        if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
            logger.error("SUPABASE_URL / SUPABASE_SERVICE_KEY not set in ~/.env")
            return stats
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        existing_ids = get_existing_place_ids(supabase)
        existing_slugs = get_existing_slugs(supabase)
        logger.info("Loaded %d existing place_ids from Supabase", len(existing_ids))
    else:
        supabase = None
        existing_ids = set()
        existing_slugs = set()

    for category in categories:
        queries = CATEGORIES.get(category, [])
        if not queries:
            logger.warning("No queries defined for category: %s", category)
            continue

        category_found = 0

        for query_item in queries:
            # Support both plain string and (query, radius) tuple
            if isinstance(query_item, tuple):
                query, radius_override = query_item
            else:
                query, radius_override = query_item, None

            logger.info("[%s] Query: %s%s", category, query,
                        f" (radius={radius_override}m)" if radius_override else "")
            places = search_places(query, GOOGLE_PLACES_API_KEY, logger, radius_override)
            stats["api_calls"] += 1
            time.sleep(1.1)  # Google rate limit: 1 req/s for Text Search

            for place in places:
                normalised = normalise_place(place, category, existing_slugs)

                if normalised["place_id"] in existing_ids:
                    stats["skipped_duplicates"] += 1
                    continue

                stats["unique_places"] += 1
                category_found += 1

                if dry_run:
                    logger.info(
                        "  [DRY RUN] %s | %s | rating=%.1f (%d reviews) | %s | %s",
                        normalised["name"],
                        normalised["address"],
                        normalised["rating"] or 0,
                        normalised["review_count"] or 0,
                        normalised["phone"] or "no phone",
                        normalised["website"] or "no website",
                    )
                else:
                    place_id, is_new = upsert_place(supabase, normalised, existing_ids)
                    if place_id:
                        existing_ids.add(normalised["place_id"])
                        existing_slugs.add(normalised["slug"])
                        if is_new:
                            stats["new_places"] += 1
                        else:
                            stats["updated_places"] += 1

        if category_found == 0:
            stats["categories_zero"].append(category)
            logger.warning("No results for category: %s", category)

    return stats


def main() -> None:
    parser = argparse.ArgumentParser(description="Trearddur Bay Directory Scraper")
    parser.add_argument(
        "--category",
        default="all",
        help="Category to scrape: eat-and-drink, stay, activities, shops, or 'all' (default: all)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print results without writing to Supabase",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable DEBUG logging",
    )
    args = parser.parse_args()

    logger = setup_logging(args.verbose)

    if args.category == "all":
        target_categories = list(CATEGORIES.keys())
    elif args.category in CATEGORIES:
        target_categories = [args.category]
    else:
        logger.error("Unknown category: %s. Valid: %s", args.category, list(CATEGORIES.keys()))
        sys.exit(1)

    logger.info("=== Trearddur Bay Directory Scraper started ===")
    logger.info("Location: %.4f, %.4f  default radius: %dm", LOCATION["latitude"], LOCATION["longitude"], DEFAULT_RADIUS_M)
    logger.info("Categories: %s", target_categories)
    logger.info("Mode: DRY RUN" if args.dry_run else "LIVE")

    stats = run(target_categories, args.dry_run, args.verbose, logger)

    logger.info("=== Summary ===")
    logger.info("API calls made:       %d", stats["api_calls"])
    logger.info("Unique places:        %d", stats["unique_places"])
    logger.info("Skipped duplicates:   %d", stats["skipped_duplicates"])
    if not args.dry_run:
        logger.info("New places:           %d", stats["new_places"])
        logger.info("Updated places:      %d", stats["updated_places"])
    if stats["categories_zero"]:
        logger.info("Categories with 0 results: %s", stats["categories_zero"])
    logger.info("=== Done ===")


if __name__ == "__main__":
    main()
