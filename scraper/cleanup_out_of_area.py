#!/usr/bin/env python3
"""
Review and clean Rhosneigr listings for out-of-area and duplicate entries.
Edit the deletes list before running.
"""

import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.env"))

TABLE_NAME = "rhosneigr_places"

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_KEY"],
)

# -------------------------------------------------------------------
# 1. DELETE out-of-area places — these appeared in Google Places results
#    but are NOT in Rhosneigr village
# -------------------------------------------------------------------
# Trearddur Bay entries (appear in Google due to "Bay" keyword)
deletes = [
    "Ocean's Edge Restaurant",
    "Sea Shanty Cafe",
    "The Cliff Park",
    "Lola's",
    "Anglesey Caravan Parks - Private Holiday Homes",
    "Gecko Surf",
    "Gwynedd Sub Aqua Club",
    "Gwynfair Caravan Park",
    "Seacroft, Trearddur Bay",
    "Trearddur Bay Hotel",
    "The Beach Motel",
    "Porth Castell",
    "Porth Diana North Wales Wildlife Trust Nature Reserve",
    "Tyn Towyn Caravan Park",
    "The Inn at the Bay",
    "Trearddur bay Holiday Bungalows",
    # Valley entries
    "Catch 22 Anglesey",
    "The Valley Hotel",
    # Rhoscolyn entries
    "The White Eagle",
    "B-Active@Rhoscolyn",
    "Silver Bay Holiday Park - Bulmer Leisure",
    "Tyn Y Felin",
    # Holyhead / wider Anglesey (from broad queries)
    "Anglesey",
    "Anglesey Area of Outstanding Natural Beauty",
    "Anglesey Activities",
    "Anglesey Adventures",
    "Anglesey Outdoors.",
    "Anglesey Pursuits",
    "Anglesey Sea Zoo Marine Conservation Centre",
    "Anglesey Transport Museum and Cafe - Tacla Taid",
    "Anglesey Gifts",
    "Ann's Pantry",
    "Awen Menai",
    "Bay Tree Gallery",
    "Bay View Restaurant & Bar, Gwesty Gadlys Hotel",
    "Beaumaris Castle",
    "Beaumaris Gaol and Courthouse",
    "Bodafon Caravan Park",
    "Breakwater Country Park",
    "Bryn Ednyfed Caravan & Motorhome Park For Adults Only",
    "Bwa Du",
    "Bwa Gwyn",
    "Caffi Cornel Clyd - Cosy Corner Cafe",
    "Caffi Siop Mechell",
    "Cardiau Môn Cards",
    "Château Rhianfa",
    "Coasteering Now",
    "Cors Bodeilio National Nature Reserve",
    "Crempog Môn Anglesey Pancakes",
    "Cuffed-in Coffee The Hive",
    "Dingle Llangefni",
    "Dronwy Caravan Park",
    "Dylan's Menai Bridge",
    "Echo Beach",
    "Eryl Môr",
    "Foel Farm Park",
    "Four Crosses, Porthaethwy",
    "Freckled Angel",
    "Garth Pier",
    "Glan Gors Holiday Park",
    "Grumble Studios",
    "Gwesty Carreg Bran Hotel",
    "Hiraeth Hire",
    "Home Farm Caravan Park",
    "Hootons Homegrown Farmer Hootons Tatws Poeth Jacket Potatoes",
    "Hootons Homegrown Farm Shop",
    "Huglets",
    "Isle of Anglesey Coastal Path",
    "James Pringle Weavers",
    "Janet Bell Gallery & Lifestyle Store",
    "Kalico",
    "Llyn Parc Mawr Community Woodland",
    "Llys Llewelyn Cegin Bar",
    "Llys Rhosyr",
    "Llywelyn Fawr",
    "Market Inn",
    "Menter Y Pentre",
    "Minffordd Caravan Park",
    "Mornest Caravan Park",
    "Nant Newydd Caravan Park",
    "Nant-y-Pandy",
    "Nant Yr Odyn Country Hotel",
    "National Trust - Plas Newydd House and Gardens",
    "Newborough Forest Holiday Park",
    "Newborough National Nature Reserve and Forest",
    "North Wales Coastal Path",
    "Oriel Beaumaris",
    "Oriel Cemaes Gallery",
    "Oriel Ger Y Fenai Gallery",
    "Oriel Glyn Davies Gallery",
    "Oriel Môn",
    "Parc Arfordirol Penrhos Coastal Park",
    "PEBBLES BISTRO",
    "Penmon Point",
    "Pen Parc Caravan Park",
    "Penrhyn Bay Caravan Park",
    "Pensieri Caravan Park",
    "Pili Palas Nature World",
    "Pinecones Cosy B&B",
    "Plas Cadnant Hidden Gardens",
    "Plas Coch - Holiday Park & Holiday Homes - Park Leisure",
    "Plas Menai National Outdoor Centre - Canolfan Awyr Agored Genedlaethol",
    "Plas Newydd National Trust Cafe",
    "Premier Inn Holyhead hotel",
    "Prism and Print",
    "Realm of Nerds",
    "Reubens Cafe and Coffee",
    "Rhos Farm Caravan Park",
    "RibRide",
    "Romana's Italian Restaurant",
    "RSPB Valley Wetlands",
    "Rusty's To - Go",
    "Sage Kitchen Menai Bridge",
    "Sandy Beach Caravan Park",
    "Sawna Bach - The Scenic Sauna (Anglesey)",
    "Seacoast Safaris",
    "Seapig",
    "Ship Inn",
    "South Stack Lighthouse",
    "SPAR - Wayside Stores",
    "Standing Stones",
    "Starida Puffin Island Cruises and Sea Fishing Trips",
    "St Cwyfan's Church",
    "St. David's Park",
    "Stone Science",
    "Tafarn Y Rhos",
    "Tafarn Yr Iorwerth",
    "The Anglesey Golf Club",  # outside Rhosneigr
    "The Bay Cafe",
    "The Bell - Y Gloch",
    "The Boathouse",
    "The Bull Hotel, Bar & Restaurant. Book direct and save.",
    "The Bull's Head Inn, Beaumaris",
    "The Bulkeley Hotel",
    "The Enchanted Hares",
    "The Exchange Beaumaris",
    "The Haven Guest House.",
    "The Kinmel Arms",
    "The Mock Turtle",
    "The Penrhos Arms",
    "The Pilot House Cafe",
    "The Port Inn",
    "The Seafront Inn Holyhead",
    "The Sea View Guest House",
    "the Shabby & Chic",
    "The Tavern on The Bay",
    "The Trecastell",
    "Tre-Ysgawen Hall, Country House Hotel & Spa",
    "Trwyn Du Lighthouse",
    "Tŷ Bach",
    "Tyddyn Isaf Caravan Park",
    "Tŷ Newydd Leisure Park",
    "Trewan Sands Caravan Park",
    "Ucheldre Centre",
    "Wavecrest Cafe",
    "Y Cwt Mwg Smokehouse",
    "Y Goron",
    # Non-businesses to remove
    "Anglesey Arms",
    "Anglesey Boat Trips",
    "Anglesey Coastal Path",
    "Anglesey Golf Club",
    "Rhosneigr Memorial Garden",
    "Rhosneigr Pay & Display Car Park",
    "Rhosneigr Village Hall",
    "Rhosneigr Sports Club",
    "RAF Valley Viewing Area",
    "Traeth Crigyll",
    "Traeth Llydan",
    # Suspicious / zero-reviews entries
    "Cowrie Cottage",
    "Jacuma",
    "Plas Gwylan",
    "St Winifred's Cottage",
    "Victoria House",
    "Wingelock",
    "Anglesey Coastal Path",
    # Entries with rating 0 that are dubious
    "The Anglesey Golf Club",
    # Accommodation outside Rhosneigr proper
    "Anchorage Hotel",
    "Plas Newydd",  # Llanfaelog - check if actually in Rhosneigr
]

print("=== DELETE OUT-OF-AREA ===")
if not deletes:
    print("  (no entries in deletes list — skipping)")
else:
    for name in deletes:
        resp = supabase.table(TABLE_NAME).select("id, name").eq("name", name).execute()
        if not resp.data:
            print(f"  [NOT FOUND] {name}")
            continue
        for row in resp.data:
            del_resp = supabase.table(TABLE_NAME).delete().eq("id", row["id"]).execute()
            print(f"  [DELETED] {row['name']} (id={row['id']})")

print()

# -------------------------------------------------------------------
# 2. Print all listings grouped by category for manual review
# -------------------------------------------------------------------
print("=== CURRENT LISTINGS BY CATEGORY ===\n")
for cat in ["eat-and-drink", "stay", "activities", "shops"]:
    resp = (
        supabase.table(TABLE_NAME)
        .select("id, name, address, rating, review_count, subcategory")
        .eq("category", cat)
        .order("name")
        .execute()
    )
    print(f"[{cat}] — {len(resp.data)} listings:")
    for p in resp.data:
        rating_str = f"{p['rating']}/5" if p.get("rating") else "no rating"
        addr = p.get("address") or ""
        # Flag if address doesn't contain Rhosneigr or nearby
        flag = " ⚠️ NOT IN RHOSNEIGR" if addr and "rhosneigr" not in addr.lower() else ""
        print(f"  [{p['id']}] {p['name']} | {rating_str} | {addr}{flag}")
    print()

# -------------------------------------------------------------------
# 3. Check for duplicate place_ids
# -------------------------------------------------------------------
print("=== DUPLICATE place_ids ===\n")
resp = supabase.table(TABLE_NAME).select("place_id, name").execute()
place_ids = [r["place_id"] for r in resp.data if r.get("place_id")]
from collections import Counter
duplicates = [pid for pid, count in Counter(place_ids).items() if count > 1]
if not duplicates:
    print("  No duplicates found.")
else:
    for dup in duplicates:
        dup_rows = [r for r in resp.data if r.get("place_id") == dup]
        print(f"  Duplicate place_id={dup}:")
        for r in dup_rows:
            print(f"    - {r['name']} (id={r.get('id')})")
print()

# -------------------------------------------------------------------
# 4. Flag entries with no address (likely bad data)
# -------------------------------------------------------------------
print("=== ENTRIES WITH NO ADDRESS ===\n")
resp = supabase.table(TABLE_NAME).select("id, name, address").is_("address", None).execute()
if not resp.data:
    print("  None.")
else:
    for p in resp.data:
        print(f"  [{p['id']}] {p['name']}")
print()

# -------------------------------------------------------------------
# 5. Summary of subcategorization
# -------------------------------------------------------------------
print("=== SUBCATEGORY STATUS ===\n")
for cat in ["eat-and-drink", "stay", "activities", "shops"]:
    total = supabase.table(TABLE_NAME).select("id", count="exact").eq("category", cat).execute()
    uncount = (
        supabase.table(TABLE_NAME)
        .select("id", count="exact")
        .eq("category", cat)
        .is_("subcategory", None)
        .execute()
    )
    print(f"  [{cat}] {uncount.count} uncategorised / {total.count} total")
