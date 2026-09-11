#!/usr/bin/env python3
"""Move Trearddur Bay Hotel from eat-and-drink/Restaurants to stay/Hotels."""

import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])

# Fetch before state
res = sb.table("trearddurbay_places").select("*").eq("name", "Trearddur Bay Hotel").execute()
places = res.data
if not places:
    print("No place found with name='Trearddur Bay Hotel'")
    exit(1)

place = places[0]
print(f"BEFORE: name={place['name']!r}, category={place['category']!r}, subcategory={place['subcategory']!r}")

# Update
sb.table("trearddurbay_places").update(
    {"category": "stay", "subcategory": "Hotels"}
).eq("name", "Trearddur Bay Hotel").eq("id", place["id"]).execute()

# Fetch after state
res2 = sb.table("trearddurbay_places").select("*").eq("id", place["id"]).execute()
updated = res2.data[0]
print(f"AFTER:  name={updated['name']!r}, category={updated['category']!r}, subcategory={updated['subcategory']!r}")
