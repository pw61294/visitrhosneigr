import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { directoryCategories, siteConfig } from "@/lib/config";

export const revalidate = 3600;

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return directoryCategories.map((cat) => ({ category: cat.slug }));
}

const SEO_INTROS: Record<string, string> = {
  "eat-and-drink":
    "From beachfront cafes to cosy pubs, Rhosneigr and the surrounding area has plenty of places to eat and drink. Whether you're after fresh seafood, a coffee with a view, or a classic pub lunch after a surf, you'll find it here.",
  stay: "Find the perfect place to stay in Rhosneigr, from hotels overlooking the beach to self-catering holiday cottages and cosy B&Bs. Book your Anglesey getaway and wake up to the sound of the sea.",
  activities:
    "Rhosneigr is a haven for outdoor activities. From surfing and kitesurfing to coastal walks, golf, and wildlife watching, there's something for everyone.",
  shops: "Browse local shops, surf shops and gift shops in and around Rhosneigr. Pick up unique Anglesey art, local crafts, and surf gear to take home.",
};

const SUBSECTION_ORDER: Record<string, string[]> = {
  "eat-and-drink": ["Restaurants", "Cafes", "Pubs", "Takeaways"],
  stay: ["Hotels", "Holiday cottages", "B&Bs", "Apartments", "Caravan & camping"],
  activities: ["Watersports", "Golf", "Walking & nature", "Activity providers", "Attractions"],
  shops: ["Gifts & galleries", "Local shops", "Outdoor & sports", "Services"],
};

const CATEGORY_HERO_IMAGES: Record<string, string> = {
  "eat-and-drink": "/images/sea-shanty.jpg",
  stay: "/images/trearddur-hotel.jpg",
  activities: "/images/activity-south-stack.jpg",
  shops: "/images/beaches.jpg",
};

const CATEGORY_HERO_TITLES: Record<string, string> = {
  "eat-and-drink": "Eat & Drink",
  stay: "Stay",
  activities: "Activities & Watersports",
  shops: "Shops & Galleries",
};

function categoryMeta(slug: string) {
  return directoryCategories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta(category);
  if (!meta) return {};

  const url = `${siteConfig.url}/directory/${category}`;
  return {
    title: `${meta.label} in Rhosneigr | ${siteConfig.domain}`,
    description: `${meta.description} in and around Rhosneigr, Anglesey.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.label} in Rhosneigr | ${siteConfig.domain}`,
      description: `${meta.description} in and around Rhosneigr, Anglesey.`,
      url,
      locale: "en_GB",
      type: "website",
    },
  };
}

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-sunset">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {half === 1 && (
        <svg width="13" height="13" viewBox="0 0 24 24" className="text-sunset">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" stroke="currentColor" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-driftwood/50">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function shortenAddress(address: string): string {
  const parts = address.split(",").map((p) => p.trim());
  const first = parts[0] ?? "";
  if (/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i.test(first)) {
    return parts.slice(1, 3).join(", ") || first;
  }
  return parts.slice(0, 2).join(", ");
}

type Place = {
  id: number;
  name: string;
  slug: string;
  address: string;
  rating: number | null;
  review_count: number | null;
  category: string;
  subcategory: string | null;
  photo_url: string | null;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = categoryMeta(category);
  if (!meta) notFound();

  const { data: places } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("id, name, slug, address, rating, review_count, category, subcategory, photo_url")
    .eq("category", category)
    .order("subcategory")
    .order("rating", { ascending: false })
    .order("name");

  const count = places?.length ?? 0;
  const seoIntro = SEO_INTROS[category] ?? null;
  const subsectionOrder = SUBSECTION_ORDER[category] ?? [];
  const heroImage = CATEGORY_HERO_IMAGES[category] ?? "/images/beaches.jpg";
  const heroTitle = CATEGORY_HERO_TITLES[category] ?? meta.label;

  // Group places by subcategory
  const grouped: Record<string, Place[]> = {};
  for (const place of places ?? []) {
    const sub = place.subcategory ?? "Other";
    if (!grouped[sub]) grouped[sub] = [];
    grouped[sub].push(place);
  }

  // Sort places within each group by rating descending (nulls last)
  for (const sub of Object.keys(grouped)) {
    grouped[sub].sort((a, b) => {
      if (a.rating == null && b.rating == null) return 0;
      if (a.rating == null) return 1;
      if (b.rating == null) return -1;
      return b.rating - a.rating;
    });
  }

  // Sort subsections by preferred order, unrecognised groups last
  const sortedSubsections = [
    ...subsectionOrder.filter((s) => grouped[s]),
    ...Object.keys(grouped).filter((s) => !subsectionOrder.includes(s)).sort(),
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${meta.label} in Rhosneigr`,
    description: meta.description,
    numberOfItems: count,
    itemListElement: (places ?? []).map((place, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: place.name,
      url: `https://visitrhosneigr.wales/directory/${category}/${place.slug}`,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://visitrhosneigr.wales" },
      { "@type": "ListItem", position: 2, name: "Directory", item: "https://visitrhosneigr.wales/directory" },
      { "@type": "ListItem", position: 3, name: meta.label, item: `https://visitrhosneigr.wales/directory/${category}` },
    ],
  };

  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="section-container">
        {/* Breadcrumb — above hero */}
        <nav className="mt-6 md:mt-8 mb-6 text-sm text-slate-sea/60" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-rockpool transition-colors">Home</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li><Link href="/directory" className="hover:text-rockpool transition-colors">Directory</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li className="text-slate-sea font-medium" aria-current="page">{meta.label}</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src={heroImage}
              alt={`${heroTitle} in Rhosneigr`}
              fill
              priority
              className="object-cover object-[center_30%]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              {heroTitle}
            </h1>
          </div>
        </div>

        {/* Count + intro */}
        <div className="mb-10">
          <p className="text-sm text-rockpool font-medium mb-3">
            {count === 1 ? "1 place" : `${count} places`} in and around Rhosneigr
          </p>
          {seoIntro && (
            <p className="text-xl text-slate-sea/75 leading-relaxed max-w-2xl">
              {seoIntro}
            </p>
          )}
        </div>

        {/* Listings — grouped by subcategory */}
        {count === 0 ? (
          <p className="text-slate-sea/50">No listings yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {sortedSubsections.map((subsection) => {
              const places_in_sub = grouped[subsection];
              return (
                <section key={subsection}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="text-xl font-semibold text-slate-sea">{subsection}</h2>
                    <span className="text-sm text-driftwood">
                      {places_in_sub.length === 1
                        ? "1 place"
                        : `${places_in_sub.length} places`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {places_in_sub.map((place) => (
                      <Link
                        key={place.id}
                        href={`/directory/${category}/${place.slug}`}
                        className="group rounded-xl border border-driftwood/20 bg-white/60 overflow-hidden hover:border-rockpool/40 hover:shadow-sm transition-all"
                      >
                        {/* Photo */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {place.photo_url ? (
                            <Image
                              src={place.photo_url}
                              alt={place.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-rockpool/20 to-sunset/10" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-slate-sea group-hover:text-rockpool transition-colors leading-snug">
                              {place.name}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-sea/50 leading-snug mb-2">
                            {shortenAddress(place.address)}
                          </p>
                          {place.rating != null && (
                            <div className="flex items-center gap-2">
                              {renderStars(place.rating)}
                              {place.review_count != null && (
                                <span className="text-xs text-driftwood">
                                  ({place.review_count})
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
