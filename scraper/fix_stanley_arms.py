#!/usr/bin/env python3
"""Move Stanley Arms from Holiday cottages to B&Bs."""

import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(os.path.expanduser("~/.env"))

sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])

res = sb.table("trearddurbay_places").select("*").eq("name", "Stanley Arms").execute()
places = res.data
if not places:
    print("No place found with name='Stanley Arms'")
    exit(1)

place = places[0]
print(f"BEFORE: name={place['name']!r}, category={place['category']!r}, subcategory={place['subcategory']!r}")

sb.table("trearddurbay_places").update(
    {"subcategory": "B&Bs"}
).eq("id", place["id"]).execute()

res2 = sb.table("trearddurbay_places").select("*").eq("id", place["id"]).execute()
updated = res2.data[0]
print(f"AFTER:  name={updated['name']!r}, category={updated['category']!r}, subcategory={updated['subcategory']!r}")
