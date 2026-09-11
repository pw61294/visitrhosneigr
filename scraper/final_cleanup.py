#!/usr/bin/env python3
"""
Final directory cleanup:
1. Export other-village businesses to CSV (already done)
2. Delete those rows from trearddurbay_places
3. Delete 4 non-business entries (Anglesey, Holyhead, Dingle Llangefni, Trearddur Bay)
"""

import os, csv
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.env"))
supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])

EXPORT_FILE = "exports/other-villages-seed-data.csv"

# -------------------------------------------------------------------
# STEP 1: Read exported place_ids from CSV
# -------------------------------------------------------------------
print("=== LOADING EXPORTED VILLAGE BUSINESSES ===")
with open(EXPORT_FILE, newline="") as f:
    reader = csv.DictReader(f)
    exported = list(reader)
export_ids = [r["place_id"] for r in exported]
print(f"Loaded {len(export_ids)} place_ids from {EXPORT_FILE}")
for r in sorted(exported, key=lambda x: x["name"]):
    print(f"  [{r['category']}] {r['name']}")

# -------------------------------------------------------------------
# STEP 2: Delete exported rows from Supabase
# -------------------------------------------------------------------
print("\n=== DELETING EXPORTED VILLAGE BUSINESSES ===")
deleted_export = 0
for pid in export_ids:
    resp = supabase.table("trearddurbay_places").delete().eq("place_id", pid).execute()
    if resp.data:
        print(f"  [DELETED] place_id={pid}")
        deleted_export += 1
    else:
        print(f"  [NOT FOUND] place_id={pid}")
print(f"Deleted {deleted_export} exported village businesses")

# -------------------------------------------------------------------
# STEP 3: Delete 4 non-business entries
# -------------------------------------------------------------------
non_businesses = [
    ("Anglesey", 196),
    ("Holyhead", 183),
    ("Dingle Llangefni", 209),
    ("Trearddur Bay", 126),
]

print("\n=== DELETING NON-BUSINESS ENTRIES ===")
deleted_nb = 0
for name, expected_id in non_businesses:
    resp = supabase.table("trearddurbay_places").select("id, name").eq("name", name).execute()
    if not resp.data:
        print(f"  [NOT FOUND] {name}")
        continue
    for row in resp.data:
        del_resp = supabase.table("trearddurbay_places").delete().eq("id", row["id"]).execute()
        print(f"  [DELETED] {row['name']} (id={row['id']})")
        deleted_nb += 1
print(f"Deleted {deleted_nb} non-business entries")

# -------------------------------------------------------------------
# STEP 4: Final count
# -------------------------------------------------------------------
print("\n=== REMAINING PLACES ===")
resp = supabase.table("trearddurbay_places").select("id").execute()
print(f"Total places remaining: {len(resp.data)}")
