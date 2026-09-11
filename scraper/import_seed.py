#!/usr/bin/env python3
"""
Import Rhosneigr seed data from other-villages-seed-data.csv into rhosneigr_places.
Run after the table is created: python import_seed.py
"""
import os, re, csv
from datetime import datetime, timezone
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")
TABLE_NAME = "rhosneigr_places"

CSV_PATH = os.path.join(os.path.dirname(__file__), "exports", "other-villages-seed-data.csv")


def generate_slug(name: str, existing_slugs: set[str]) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    base = slug
    counter = 1
    while slug in existing_slugs:
        slug = f"{base}-{counter}"
        counter += 1
    return slug


def main():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("ERROR: SUPABASE_URL / SUPABASE_SERVICE_KEY not set in ~/.env")
        return

    sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    # Get existing slugs to avoid conflicts
    resp = sb.table(TABLE_NAME).select("slug").execute()
    existing_slugs = {r["slug"] for r in resp.data if r.get("slug")}
    print(f"Existing slugs in {TABLE_NAME}: {len(existing_slugs)}")

    # Load seed CSV
    rows_imported = 0
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get("name", "").strip()
            category = row.get("category", "").strip()

            if not name:
                continue

            # Filter to Rhosneigr entries only
            address = row.get("address", "") or ""
            if "rhosneigr" not in address.lower():
                continue

            # Parse lng if present (seed CSV is missing it for some rows)
            lat = row.get("lat", "")
            lng = row.get("lng", "") or None

            slug = generate_slug(name, existing_slugs)

            place = {
                "name": name,
                "slug": slug,
                "address": address,
                "phone": row.get("phone") or None,
                "website": row.get("website") or None,
                "google_maps_url": None,
                "rating": float(row["rating"]) if row.get("rating") else None,
                "review_count": int(row["review_count"]) if row.get("review_count") else None,
                "place_id": row.get("place_id", "").strip(),
                "category": category,
                "subcategory": None,
                "photo_url": None,
                "lat": float(lat) if lat else None,
                "lng": float(lng) if lng else None,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }

            result = sb.table(TABLE_NAME).upsert(place, on_conflict="place_id").execute()
            if result.data:
                print(f"  Upserted: {name} ({category})")
                existing_slugs.add(slug)
                rows_imported += 1
            else:
                print(f"  Skipped (no data returned): {name}")

    print(f"\nTotal Rhosneigr entries upserted: {rows_imported}")


if __name__ == "__main__":
    main()
