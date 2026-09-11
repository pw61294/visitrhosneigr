#!/usr/bin/env python3
"""Clean up duplicate and malformed listing names in trearddurbay_places."""

import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))
sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])

# ── 1. Delete duplicate (id=123) ──────────────────────────────────────────
print("=== DELETE duplicate ===")
row = sb.table("trearddurbay_places").select("*").eq("id", 123).execute()
if row.data:
    print(f"  DELETING id=123: {row.data[0]['name']!r}")
    sb.table("trearddurbay_places").delete().eq("id", 123).execute()
    print("  Done.")
else:
    print("  id=123 not found — already deleted?")

# ── 2. Rename 3 entries ─────────────────────────────────────────────────────
renames = [
    (101, "Tyn Rhos Camping Site"),
    (122, "Anchorage House"),
    (124, "Trearddur Bay Holiday Cottage"),
]

for id_, new_name in renames:
    row = sb.table("trearddurbay_places").select("*").eq("id", id_).execute()
    if not row.data:
        print(f"  id={id_} not found")
        continue
    old_name = row.data[0]["name"]
    print(f"\n=== RENAME id={id_} ===")
    print(f"  BEFORE: {old_name!r}")
    sb.table("trearddurbay_places").update({"name": new_name}).eq("id", id_).execute()
    row2 = sb.table("trearddurbay_places").select("name").eq("id", id_).execute()
    print(f"  AFTER:  {row2.data[0]['name']!r}")
