#!/usr/bin/env python3
"""
Remove out-of-area places and reclassify nature reserves in trearddurbay_places.
"""

import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.env"))

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_KEY"],
)

# -------------------------------------------------------------------
# 1. DELETE out-of-area places
# -------------------------------------------------------------------
deletes = [
    "Llandudno Boat Trips",
    "Raspberry Watersports",
    "Y Cwt Mwg Smokehouse",
]

print("=== DELETE OUT-OF-AREA ===")
for name in deletes:
    # Fetch by name to get id
    resp = supabase.table("trearddurbay_places").select("id, name").eq("name", name).execute()
    if not resp.data:
        print(f"  [NOT FOUND] {name}")
        continue
    for row in resp.data:
        del_resp = supabase.table("trearddurbay_places").delete().eq("id", row["id"]).execute()
        print(f"  [DELETED] {row['name']} (id={row['id']})")

print()

# -------------------------------------------------------------------
# 2. REclassify nature reserves
# -------------------------------------------------------------------
nature_reserves = [
    ("Newborough National Nature Reserve", "Walking & nature"),
    ("Cors Bodeilio", "Walking & nature"),
]

print("=== REClassify nature reserves ===")
for name, subcategory in nature_reserves:
    resp = supabase.table("trearddurbay_places").select("id, name, subcategory").eq("name", name).execute()
    if not resp.data:
        print(f"  [NOT FOUND] {name}")
        continue
    for row in resp.data:
        upd_resp = (
            supabase.table("trearddurbay_places")
            .update({"subcategory": subcategory})
            .eq("id", row["id"])
            .execute()
        )
        print(f"  [{row['subcategory']} → {subcategory}] {row['name']} (id={row['id']})")

print()

# -------------------------------------------------------------------
# 3. Print summary of all (none) subcategory places for review
# -------------------------------------------------------------------
print("=== UNCLASSIFIED PLACES (subcategory = null/none) ===\n")
for cat in ["eat-and-drink", "activities", "shops", "stay"]:
    resp = (
        supabase.table("trearddurbay_places")
        .select("id, name, category, subcategory")
        .eq("category", cat)
        .is_("subcategory", None)
        .execute()
    )
    print(f"[{cat}] — {len(resp.data)} uncategorized:")
    for p in sorted(resp.data, key=lambda x: x["name"]):
        print(f"  {p['name']} (id={p['id']})")
    print()
