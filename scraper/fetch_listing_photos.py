#!/usr/bin/env python3
"""
Fetch Google Places photos for rhosneigr_places that don't yet have a photo_url.
Saves images to public/images/listings/{slug}.jpg and updates Supabase.
"""

import os
import sys
import time
import logging
import re
from pathlib import Path

import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("fetch_rhosneigr_photos")

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")
PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
PLACES_DETAIL_URL = "https://places.googleapis.com/v1/places/{place_id}"
PHOTOS_URL = "https://places.googleapis.com/v1/{photoResource}/media"

MAX_WIDTH = 600
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images" / "listings"
TABLE_NAME = "rhosneigr_places"

WALES_BBOX = {
    "low": {"latitude": 53.0, "longitude": -5.5},
    "high": {"latitude": 53.5, "longitude": -4.0},
}

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")


def search_place(query: str) -> dict | None:
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.name,places.photos",
        "Content-Type": "application/json",
    }
    body = {
        "textQuery": query,
        "locationBias": {"rectangle": WALES_BBOX},
        "maxResultCount": 1,
    }
    try:
        resp = requests.post(PLACES_SEARCH_URL, headers=headers, json=body, timeout=30)
        if resp.status_code == 429:
            logger.warning("Rate limited — backing off 3s")
            time.sleep(3)
            resp = requests.post(PLACES_SEARCH_URL, headers=headers, json=body, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        places = data.get("places", [])
        if places:
            return places[0]
        logger.warning("No results for query: %s", query)
        return None
    except requests.exceptions.RequestException as exc:
        logger.error("Search error for '%s': %s", query, exc)
        return None


def get_place_photos(place_id: str) -> list:
    """Get photos for a place by its ID."""
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.photos",
        "Content-Type": "application/json",
    }
    url = PLACES_DETAIL_URL.format(place_id=place_id)
    try:
        resp = requests.get(url, headers=headers, timeout=30)
        if resp.status_code == 429:
            logger.warning("Rate limited on detail — backing off 3s")
            time.sleep(3)
            resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        return data.get("photos", [])
    except requests.exceptions.RequestException as exc:
        logger.error("Detail error for '%s': %s", place_id, exc)
        return []


def download_photo(photo_resource: str) -> bytes | None:
    url = PHOTOS_URL.format(photoResource=photo_resource)
    params = {"maxWidthPx": MAX_WIDTH, "key": API_KEY}
    try:
        resp = requests.get(url, params=params, timeout=30)
        if resp.status_code == 429:
            logger.warning("Rate limited on photo — backing off 3s")
            time.sleep(3)
            resp = requests.get(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.content
    except requests.exceptions.RequestException as exc:
        logger.error("Photo download error for '%s': %s", photo_resource, exc)
        return None


def resize_and_save(image_bytes: bytes, output_path: Path) -> None:
    img = Image.open(BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    width, height = img.size
    if width > MAX_WIDTH:
        new_height = int(height * MAX_WIDTH / width)
        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
    img.save(output_path, "JPEG", quality=82, optimize=True)
    logger.info("Saved: %s (%dx%d)", output_path.name, *img.size)


def generate_slug(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug


def main() -> None:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        logger.error("SUPABASE_URL / SUPABASE_SERVICE_KEY not set in ~/.env")
        sys.exit(1)
    if not API_KEY:
        logger.error("GOOGLE_PLACES_API_KEY not set in ~/.env")
        sys.exit(1)

    sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    # Fetch listings that don't yet have a photo_url
    resp = sb.table(TABLE_NAME).select("id, place_id, name, slug, photo_url").is_("photo_url", "null").execute()
    listings = resp.data
    logger.info("Found %d listings without photos", len(listings))

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    for listing in listings:
        place_id = listing.get("place_id")
        name = listing["name"]
        slug = listing["slug"]
        listing_id = listing["id"]

        if not place_id:
            logger.warning("No place_id for '%s' — skipping", name)
            continue

        logger.info("Fetching photos for: %s (place_id=%s)", name, place_id)

        # Get photos from place detail
        photos = get_place_photos(place_id)
        if not photos:
            # Fallback to text search
            logger.info("  No detail photos — trying text search...")
            place = search_place(f"{name} Rhosneigr")
            if place:
                photos = place.get("photos", [])

        if not photos:
            logger.warning("  No photos found for '%s'", name)
            time.sleep(1.5)
            continue

        photo_resource = photos[0].get("name")
        if not photo_resource:
            logger.warning("  Photo has no name for '%s'", name)
            time.sleep(1.5)
            continue

        image_bytes = download_photo(photo_resource)
        if not image_bytes:
            logger.warning("  Failed to download photo for '%s'", name)
            time.sleep(1.5)
            continue

        output_path = IMAGES_DIR / f"{slug}.jpg"
        resize_and_save(image_bytes, output_path)

        # Update Supabase with the public URL
        photo_url = f"/images/listings/{slug}.jpg"
        update_resp = sb.table(TABLE_NAME).update(
            {"photo_url": photo_url, "updated_at": "now()"}
        ).eq("id", listing_id).execute()

        if update_resp.data:
            logger.info("  Updated photo_url for '%s': %s", name, photo_url)
        else:
            logger.warning("  Failed to update photo_url for '%s'", name)

        time.sleep(1.5)  # Google rate limit


if __name__ == "__main__":
    main()
