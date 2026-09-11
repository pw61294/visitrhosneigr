export const siteConfig = {
  name: "Rhosneigr",
  domain: "visitrhosneigr.wales",
  tagline: "Anglesey's surf village",
  description:
    "Discover Rhosneigr — surf, kitesurf, wide beaches, great food and a laid-back village on Anglesey's west coast. Your guide to Wales' best-kept surf spot.",
  url: "https://visitrhosneigr.wales",
  instagram: "https://instagram.com/visitrhosneigr",
  instagramHandle: "@visitrhosneigr",
  facebook: "#",
  youtube: "#",
} as const;

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Things To Do", href: "/guides/things-to-do" },
  { label: "Eat & Drink", href: "/directory/eat-and-drink" },
  { label: "Stay", href: "/directory/stay" },
  { label: "Shop", href: "/directory/shops" },
  { label: "Beaches", href: "/guides/best-beaches" },
  { label: "Local", href: "/directory" },
];

export const directoryCategories = [
  {
    slug: "eat-and-drink",
    label: "Eat & drink",
    description: "Restaurants, pubs and cafes",
    icon: "utensils",
    color: "from-rockpool/20 to-rockpool/5",
  },
  {
    slug: "stay",
    label: "Stay",
    description: "Hotels, B&Bs, cottages and caravan parks",
    icon: "bed",
    color: "from-sunset/20 to-sunset/5",
  },
  {
    slug: "activities",
    label: "Activities & watersports",
    description: "Watersports, walks, golf and days out",
    icon: "compass",
    color: "from-rockpool/15 to-driftwood/15",
  },
  {
    slug: "shops",
    label: "Shops & galleries",
    description: "Gift shops, galleries and local stores",
    icon: "shopping-bag",
    color: "from-driftwood/25 to-driftwood/10",
  },
] as const;

export const guides = [
  {
    title: "Best beaches",
    description: "Sandy bays, surf breaks and dunes",
    href: "/guides/best-beaches",
    image: "/images/placeholder-beaches.jpg",
  },
  {
    title: "Where to eat",
    description: "Local food, great coffee, beachside views",
    href: "/guides/where-to-eat",
    image: "/images/placeholder-eat.jpg",
  },
  {
    title: "Things to do",
    description: "Surf, kite, explore and unwind",
    href: "/guides/things-to-do",
    image: "/images/activity-south-stack.jpg",
  },
  {
    title: "Walks & trails",
    description: "Coastal, dunes and countryside",
    href: "/guides/walks-and-trails",
    image: "/images/placeholder-walks.jpg",
  },
  {
    title: "Getting here",
    description: "Directions, parking, public transport",
    href: "/guides/getting-here",
    image: "/images/walks.jpg",
  },
] as const;
