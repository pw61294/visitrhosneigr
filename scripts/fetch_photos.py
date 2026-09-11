#!/usr/bin/env python3
"""
Fetch photos from Google Places API for trearddurbay.wales homepage cards.
"""

import os
import sys
import time
import logging
import argparse
from pathlib import Path

import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.env"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("fetch_photos")

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")
PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
PLACES_DETAIL_URL = "https://places.googleapis.com/v1/places/{place_id}"
PHOTOS_URL = "https://places.googleapis.com/v1/{photoResource}/media"

MAX_WIDTH = 800
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"

PLACES = [
    ("Sea Shanty Cafe Trearddur Bay", "sea-shanty.jpg"),
    ("Trearddur Bay Hotel Anglesey", "trearddur-hotel.jpg"),
    ("Blu Chameleon Trearddur Bay", "blu-chameleon.jpg"),
    ("Anglesey Coastal Path Trearddur Bay", "coastal-path.jpg"),
    ("Trearddur Bay Beach Anglesey", "beaches.jpg"),
    ("Porth Dafarch Beach Anglesey", "walks.jpg"),
]

WALES_BBOX = {
    "low": {"latitude": 53.0, "longitude": -5.5},
    "high": {"latitude": 53.5, "longitude": -4.0},
}


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
    """Resize image to max 800px wide and save as JPEG."""
    img = Image.open(BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    width, height = img.size
    if width > MAX_WIDTH:
        new_height = int(height * MAX_WIDTH / width)
        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
    img.save(output_path, "JPEG", quality=82, optimize=True)
    logger.info("Saved: %s (%dx%d)", output_path.name, *img.size)


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch photos from Google Places API")
    parser.add_argument(
        "--photo-index",
        type=int,
        default=0,
        help="Index of the photo to fetch from each place's photo list (default: 0)",
    )
    parser.add_argument(
        "--query",
        type=str,
        help="Fetch photo for a specific place query only (e.g. 'Sea Shanty Cafe Trearddur Bay')",
    )
    parser.add_argument(
        "--output",
        type=str,
        help="Output filename when using --query (e.g. 'sea-shanty.jpg')",
    )
    args = parser.parse_args()

    if not API_KEY:
        logger.error("GOOGLE_PLACES_API_KEY not set in ~/.env")
        sys.exit(1)

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    logger.info("Output directory: %s", IMAGES_DIR)

    if args.query and args.output:
        places_to_fetch = [(args.query, args.output)]
    else:
        places_to_fetch = PLACES

    for query, filename in places_to_fetch:
        logger.info("Searching: %s", query)
        place = search_place(query)
        if not place:
            logger.warning("Skipping '%s' — no place found", query)
            time.sleep(1)
            continue

        place_id = place.get("id")
        place_name = place.get("name")
        photos = place.get("photos", [])
        if not photos:
            logger.warning("No photos for '%s' (place_id=%s)", place_name, place_id)
            time.sleep(1)
            continue

        photo_index = args.photo_index
        if photo_index >= len(photos):
            logger.warning(
                "Photo index %d out of range for '%s' (has %d photos) — using last photo",
                photo_index, place_name, len(photos)
            )
            photo_index = len(photos) - 1

        photo_resource = photos[photo_index].get("name")
        logger.info(
            "  Found: %s (place_id=%s), fetching photo index %d...",
            place_name, place_id, photo_index
        )

        image_bytes = download_photo(photo_resource)
        if not image_bytes:
            logger.warning("Failed to download photo for '%s'", place_name)
            time.sleep(1)
            continue

        output_path = IMAGES_DIR / filename
        resize_and_save(image_bytes, output_path)

        # Google requires attribution — done via footer, not per-image
        time.sleep(1.5)  # Rate limit between calls


if __name__ == "__main__":
    main()
