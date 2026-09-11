#!/usr/bin/env python3
"""Clean up duplicate and malformed listing names in rhosneigr_places."""

import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))
sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])
TABLE_NAME = "rhosneigr_places"

# ── 1. Delete specific duplicate IDs (edit as needed) ───────────────────────
deletes = [
    # (id, "name"),  # uncomment and fill to delete
]

print("=== DELETE duplicates ===")
for id_, name in deletes:
    row = sb.table(TABLE_NAME).select("*").eq("id", id_).execute()
    if row.data:
        print(f"  DELETING id={id_}: {row.data[0]['name']!r}")
        sb.table(TABLE_NAME).delete().eq("id", id_).execute()
    else:
        print(f"  id={id_} not found — already deleted?")

# ── 2. Rename malformed names ────────────────────────────────────────────────
# Common patterns to fix: Google sometimes returns listing titles like
# "THE OYSTER CATCHER, dog friendly pub with sea views..." instead of "The Oyster Catcher"
renames = [
    # (id, "new_clean_name"),  # uncomment and fill to rename
]

print("\n=== RENAME malformed names ===")
for id_, new_name in renames:
    row = sb.table(TABLE_NAME).select("*").eq("id", id_).execute()
    if not row.data:
        print(f"  id={id_} not found")
        continue
    old_name = row.data[0]["name"]
    if old_name == new_name:
        print(f"  id={id_}: already clean ({old_name!r})")
        continue
    print(f"  id={id_}: {old_name!r} → {new_name!r}")
    sb.table(TABLE_NAME).update({"name": new_name}).eq("id", id_).execute()

if not deletes and not renames:
    print("  (no entries configured — edit this script to add fixes)")

# ── 3. Print entries with names > 60 chars (potentially malformed) ───────────
print("\n=== POTENTIALLY MALFORMED NAMES (len > 60) ===")
resp = sb.table(TABLE_NAME).select("id, name").execute()
flagged = [r for r in resp.data if len(r["name"]) > 60]
if not flagged:
    print("  None found.")
else:
    for r in flagged:
        print(f"  [{r['id']}] {r['name']!r}")

# ── 4. Print entries with ALL CAPS names (unusual) ───────────────────────────
print("\n=== ALL-CAPS NAMES (may be malformed) ===")
flagged2 = [r for r in resp.data if r["name"].isupper() and len(r["name"]) > 3]
if not flagged2:
    print("  None found.")
else:
    for r in flagged2:
        print(f"  [{r['id']}] {r['name']!r}")
