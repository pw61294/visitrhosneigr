#!/usr/bin/env python3
"""Remove irrelevant listings from trearddurbay_places table."""

import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

TO_DELETE = [
    "Trearddur Bay",
    "Holyhead Retail Park",
    "Tesco Extra",
    "T J's Discount Warehouse",
]

def main():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("ERROR: SUPABASE_URL or SUPABASE_SERVICE_KEY not set in ~/.env")
        return

    client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    for name in TO_DELETE:
        resp = client.table("trearddurbay_places").delete().eq("name", name).execute()
        deleted = len(resp.data)
        print(f"Deleted '{name}': {deleted} row(s)")

    # Count remaining
    remaining = client.table("trearddurbay_places").select("id", count="exact").execute()
    print(f"\nRemaining rows: {remaining.count}")

if __name__ == "__main__":
    main()
