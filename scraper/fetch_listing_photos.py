#!/usr/bin/env python3
"""
Fetch Google Places photos for trearddurbay_places that don't yet have a photo_url.
Saves images to public/images/listings/{slug}.jpg and updates Supabase.
"""

import os
import sys
import time
import logging
from pathlib import Path

import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("fetch_listing_photos")

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")
PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
PHOTOS_URL = "https://places.googleapis.com/v1/{photoResource}/media"

MAX_WIDTH = 600
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images" / "listings"

WALES_BBOX = {
    "low": {"latitude": 53.0, "longitude": -5.5},
    "high": {"latitude": 53.5, "longitude": -4.0},
}

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")


def search_place(query: str) -> dict | None:
    """Text search for a place, returning the first result with its photos."""
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


def download_photo(photo_resource: str) -> bytes | None:
    """Download a photo from the Place Photos API."""
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
    """Resize image to max 600px wide and save as JPEG."""
    img = Image.open(BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    width, height = img.size
    if width > MAX_WIDTH:
        new_height = int(height * MAX_WIDTH / width)
        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
    img.save(output_path, "JPEG", quality=82, optimize=True)
    logger.info("  Saved: %s (%dx%d)", output_path.name, *img.size)


def main() -> None:
    if not API_KEY:
        logger.error("GOOGLE_PLACES_API_KEY not set in ~/.env")
        sys.exit(1)
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        logger.error("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in ~/.env")
        sys.exit(1)

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    logger.info("Output directory: %s", IMAGES_DIR)

    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    logger.info("Fetching places without photo_url...")
    response = supabase.table("trearddurbay_places").select(
        "id, name, slug, photo_url"
    ).is_("photo_url", None).execute()
    places = response.data
    logger.info("Found %d places needing photos", len(places))

    if not places:
        logger.info("No places need photos — all done.")
        return

    success = 0
    failed = 0
    skipped = 0

    for place in places:
        place_id = place["id"]
        name = place["name"]
        slug = place["slug"]

        logger.info("%s (%s)...", name, slug)

        # Try multiple query variations
        queries = [
            f"{name} Trearddur Bay Anglesey",
            f"{name} Anglesey",
            name,
        ]

        photo_bytes = None
        for query in queries:
            place_data = search_place(query)
            if not place_data:
                continue
            photos = place_data.get("photos", [])
            if not photos:
                continue
            photo_resource = photos[0].get("name")
            if not photo_resource:
                continue
            photo_bytes = download_photo(photo_resource)
            if photo_bytes:
                break
            time.sleep(0.3)

        if not photo_bytes:
            logger.warning("  FAILED — no photo found for '%s'", name)
            failed += 1
            time.sleep(0.3)
            continue

        output_path = IMAGES_DIR / f"{slug}.jpg"
        resize_and_save(photo_bytes, output_path)

        photo_url = f"/images/listings/{slug}.jpg"
        supabase.table("trearddurbay_places").update(
            {"photo_url": photo_url}
        ).eq("id", place_id).execute()

        logger.info("  SUCCESS → %s", photo_url)
        success += 1
        time.sleep(0.3)

    print("\n" + "=" * 50)
    print(f"{'Result':<20} {'Count':>6}")
    print("-" * 50)
    print(f"{'Success':<20} {success:>6}")
    print(f"{'Failed (no photo)':<20} {failed:>6}")
    print(f"{'Total':<20} {success + failed:>6}")
    print("=" * 50)


if __name__ == "__main__":
    main()
