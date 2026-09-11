#!/usr/bin/env python3
"""
Classify trearddurbay_places into subcategories based on name heuristics.
Run after 002_add_subcategory.sql has been applied.
"""

import os
import logging
import unicodedata
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv(os.path.expanduser("~/.env"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("add_subcategories")

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

# Subcategory keyword patterns (lowercase)
EAT_AND_DRINK_SUBS = {
    "Restaurants": [
        "ocean's edge", "bay restaurant", "catch 22", "langdons", "the harbourfront bistro",
        "standing stones", "seacroft", "catch 22 anglesey", "trearddur bay hotel",
        "sosban", "trearddur bay hotel",
    ],
    "Cafes": [
        "sea shanty cafe", "the stores", "lola's",
        "green island", "caffi m", "caffi'r parc", "picnics", "sunny valley",
        "anglesey transport museum", "the old shipping office",
        "holyhead pavilion", "the skerries",
    ],
    "Pubs": [
        "the inn at the bay", "farrell's bar", "bert's family pub", "gwynfair family pub",
        "the white eagle", "the beach motel", "the driftwood bar",
        "albert vaults", "four crosses", "george hotel", "oyster catcher",
        "paddlers return", "rose & crown", "tafarn y rhos", "tafarn yr iorwerth",
        "the boathouse", "the branch", "the crown bodedern", "the tavern on the bay",
        "y morfa",
    ],
    "Takeaways": [
        "scarlett's fish & chips", "garlic takeaway", "holyhead kebab & pizza",
        "royal kebabs and pizza", "moonlight express", "agra", "lotus garden",
        "little indian chef", "feast brothers",
        "chanthi's thai to go", "mete's smash burger", "mandarin kitchen",
    ],
}

STAY_SUBS = {
    "Hotels": [
        "trearddur bay hotel", "the seafront inn holyhead", "travelodge",
    ],
    "Holiday cottages": [
        "blue bay villa", "trearddur house cottage", "beach house", "min y môr",
        "cwm farm", "clydfan", "anchorage house", "tŷ haf", "cottage", "house",
        "11 capel farm", "harbour watch",
        "seaside sanctuary", "trearddur bay holiday homes", "blackthorn farm",
        "gorsgoch farm", "black sheep lodge", "stanley arms", "trearddur country park",
        "valley of the rocks",
    ],
    "B&Bs": [
        "ty'r ffynnon bed & breakfast", "pinecones cosy b&b", "bed & breakfast",
    ],
    "Caravan & camping": [
        "tyn towyn caravan park", "gwynfair caravan park", "caravan",
        "the cliff park", "country park", "valley of the rocks",
    ],
    "Apartments": [
        "cliff apartments", "gull house",
    ],
}

ACTIVITIES_SUBS = {
    "Watersports": [
        "blu chameleon", "gecko surf", "b-active@rhoscolyn",
        "seawake",
    ],
    "Golf": [
        "holyhead golf club", "the beach golf course & foot golf",
    ],
    "Walking & nature": [
        "isle of anglesey coastal path", "rspb south stack", "porth diana",
        "breakwater country park", "trefignath chambered tomb", "porth castell",
        "porth y post", "bwa du", "the range",
        "south stack lighthouse", "skinner's monument", "titanic memorial",
        "holyhead promenade", "garreglwyd park", "anglesey area of outstanding",
        "church bay", "anglesey aonb",
        "porth dafarch", "porth isallt bach", "porth tywyn mawr", "porth y corwgl",
        "bwa gwyn", "nant-y-pandy", "llyn parc mawr", "traeth coch pentraeth",
        "anglesey boat trips", "anglesey fishing", "menai cruises",
        "starida puffin", "dolphin", "penmon point",
        "ty mawr hut circles", "ty mawr standing stone",
        "coasteering now", "gwynedd sub aqua club", "seacoast safaris",
        "anglesey sea zoo", "ucheldre centre",
        "newborough", "cors bodeilio",
    ],
    "Activity providers": [
        "anglesey activities", "anglesey adventures", "anglesey outdoors",
        "anglesey pursuits",
        "ribride", "anglesey boat charters",
    ],
    "Attractions": [
        "holyhead maritime museum", "foel farm park",
        "lôn isallt play area", "trearddur bay village hall",
        "anglesey sea zoo marine conservation centre", "ucheldre centre",
        "anglesey transport museum", "oriel môn",
    ],
}

SHOPS_SUBS = {
    "Gifts & galleries": [
        "bay tree gallery", "anglesey & north wales landscapes", "anglesey gifts",
        "realm of nerds", "the enchanted hares", "y cwt creu",
        "a little bit eco", "anglesey soap", "embroidery or print",
        "piggy & moo", "oriel beaumaris", "oriel cemaes",
    ],
    "Local shops": [
        "spar", "trearddur bay post office", "llefrith cybi", "port shop",
        "kalico", "the celtic cavern", "the chocolate box family shopper",
        "the celtic cavern/bargain box",
        "asda holyhead", "hootons homegrown", "premier",
        "holyhead retail park", "home bargains", "t j's discount warehouse", "tesco extra",
    ],
    "Outdoor & sports": [
        "blufin", "summit to sea",
    ],
    "Services": [
        "rnli",
    ],
}

# Fallback keyword mappings for unrecognised names
FALLBACK_KEYWORDS = {
    "Holiday cottages": ["cottage", "house", "villa", "bungalow"],
    "Hotels": ["hotel"],
    "B&Bs": ["bed & breakfast", "b&b"],
    "Restaurants": ["restaurant", "bistro"],
    "Cafes": ["cafe", "coffee", "café"],
    "Pubs": ["pub", "bar", "inn"],
    "Takeaways": ["takeaway", "take-away", "pizza", "kebab", "fish & chips", "chips"],
    "Caravan & camping": ["caravan", "camping", "campsite"],
    "Apartments": ["apartment", "flat"],
    "Watersports": ["surf", "kayak", "paddle", "sailing", "watersport"],
    "Golf": ["golf"],
    "Walking & nature": ["walk", "hike", "coastal", "rspb", "nature"],
    "Activity providers": ["activities", "adventures", "outdoors", "pursuits"],
    "Attractions": ["museum", "farm", "play area", "village hall"],
    "Gifts & galleries": ["gallery", "gift", "souvenir", "art"],
    "Local shops": ["shop", "store", "post office", "spar"],
    "Outdoor & sports": ["outdoor", "sport", "fishing", "climbing"],
    "Services": ["rnli", "lifeboat", "service"],
}


def build_name_map(subs: dict) -> dict[str, str]:
    """Flatten subcategory name lists into lowercase name → subcategory."""
    result = {}
    for sub, names in subs.items():
        for name in names:
            result[name.lower()] = sub
    return result


def normalize(s: str) -> str:
    """Strip diacritics: NFD decompose then drop combining marks."""
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def classify_name(name: str, category: str) -> str | None:
    """Classify a place by name within a category."""
    name_lower = normalize(name).lower()

    if category == "eat-and-drink":
        name_map = build_name_map(EAT_AND_DRINK_SUBS)
    elif category == "stay":
        name_map = build_name_map(STAY_SUBS)
    elif category == "activities":
        name_map = build_name_map(ACTIVITIES_SUBS)
    elif category == "shops":
        name_map = build_name_map(SHOPS_SUBS)
    else:
        return None

    # Direct name match (exact)
    if name_lower in name_map:
        return name_map[name_lower]

    # Partial name match — check if any known name appears in the place name
    for known_name, subcategory in name_map.items():
        if known_name in name_lower:
            return subcategory

    # Partial match on normalized known_name
    name_norm = normalize(name_lower)
    for known_name, subcategory in name_map.items():
        if normalize(known_name) in name_norm:
            return subcategory

    # Keyword fallback — normalize to handle diacritics
    fallback_map = FALLBACK_KEYWORDS
    name_norm = normalize(name_lower)
    for sub, keywords in fallback_map.items():
        for kw in keywords:
            if normalize(kw) in name_norm:
                # Only apply fallback if we're in the right category group
                if sub in (EAT_AND_DRINK_SUBS if category == "eat-and-drink"
                           else STAY_SUBS if category == "stay"
                           else ACTIVITIES_SUBS if category == "activities"
                           else SHOPS_SUBS):
                    return sub

    return None


def main():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        logger.error("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in ~/.env")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    logger.info("Fetching all places from Supabase...")
    response = supabase.table("trearddurbay_places").select("*").execute()
    places = response.data
    logger.info("Found %d places", len(places))

    unclassified = []
    counts: dict[str, dict[str, int]] = {}

    updates = []

    for place in places:
        name = place.get("name", "")
        category = place.get("category", "")
        subcategory = classify_name(name, category)

        if subcategory:
            updates.append({"id": place["id"], "subcategory": subcategory})
            logger.debug("  %s (%s) → %s", name, category, subcategory)
        else:
            unclassified.append({"name": name, "category": category, "id": place["id"]})
            logger.warning("  UNCLASSIFIED: %s (%s)", name, category)

        # Count
        if category not in counts:
            counts[category] = {}
        if subcategory:
            counts[category][subcategory] = counts[category].get(subcategory, 0) + 1

    # Upsert subcategories
    if updates:
        logger.info("Updating %d places with subcategory...", len(updates))
        for row in updates:
            supabase.table("trearddurbay_places").update(
                {"subcategory": row["subcategory"]}
            ).eq("id", row["id"]).execute()
        logger.info("Done.")
    else:
        logger.info("No places to update.")

    # Summary table
    print("\n" + "=" * 60)
    print(f"{'Category':<20} {'Subcategory':<25} {'Count':>6}")
    print("-" * 60)
    for cat, subs in sorted(counts.items()):
        for sub, count in sorted(subs.items(), key=lambda x: -x[1]):
            print(f"{cat:<20} {sub:<25} {count:>6}")
    print("=" * 60)

    if unclassified:
        print(f"\n{len(unclassified)} places could not be classified:")
        for p in unclassified:
            print(f"  [{p['category']}] {p['name']} (id={p['id']})")


if __name__ == "__main__":
    main()
