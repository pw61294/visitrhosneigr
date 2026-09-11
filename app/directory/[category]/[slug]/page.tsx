import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { directoryCategories, siteConfig } from "@/lib/config";

export const revalidate = 3600;

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const { data: places } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("category, slug");

  return (places ?? []).map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

function categoryLabel(slug: string) {
  return directoryCategories.find((c) => c.slug === slug)?.label ?? slug;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const { data: place } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("name, category, address, rating")
    .eq("category", category)
    .eq("slug", slug)
    .single();

  if (!place) return {};

  const catLabel = categoryLabel(category);
  const title = `${place.name} — ${catLabel} in Rhosneigr`;
  const description = [
    place.address,
    place.rating != null ? `${place.rating.toFixed(1)} stars` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const url = `${siteConfig.url}/directory/${category}/${slug}`;

  return {
    title,
    description: `${description}. ${catLabel} in Rhosneigr, Holy Island, Anglesey.`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: `${description}. ${catLabel} in Rhosneigr, Holy Island, Anglesey.`,
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
        <svg key={`f${i}`} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-sunset">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {half === 1 && (
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-sunset">
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
        <svg key={`e${i}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-driftwood/50">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default async function BusinessPage({ params }: Props) {
  const { category, slug } = await params;

  const { data: place } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .single();

  if (!place) notFound();

  const catLabel = categoryLabel(place.category);

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: place.name,
    address: place.address,
    telephone: place.phone ?? undefined,
    url: place.website ?? undefined,
    geo: place.lat && place.lng
      ? { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng }
      : undefined,
    aggregateRating:
      place.rating != null
        ? {
            "@type": "AggregateRating",
            ratingValue: place.rating,
            reviewCount: place.review_count,
          }
        : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://visitrhosneigr.wales" },
      { "@type": "ListItem", position: 2, name: "Directory", item: "https://visitrhosneigr.wales/directory" },
      {
        "@type": "ListItem",
        position: 3,
        name: catLabel,
        item: `https://visitrhosneigr.wales/directory/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: place.name,
        item: `https://visitrhosneigr.wales/directory/${category}/${slug}`,
      },
    ],
  };

  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-driftwood" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-rockpool transition-colors">Home</Link></li>
            <li><span aria-hidden>›</span></li>
            <li><Link href="/directory" className="hover:text-rockpool transition-colors">Directory</Link></li>
            <li><span aria-hidden>›</span></li>
            <li><Link href={`/directory/${category}`} className="hover:text-rockpool transition-colors">{catLabel}</Link></li>
            <li><span aria-hidden>›</span></li>
            <li className="text-slate-sea/60" aria-current="page">{place.name}</li>
          </ol>
        </nav>

        <div className="max-w-2xl">
          {/* Category badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-rockpool/10 text-rockpool text-xs font-semibold uppercase tracking-wide mb-3">
            {catLabel}
          </span>

          {/* Business name */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-sea">
            {place.name}
          </h1>

          {/* Rating */}
          {place.rating != null && (
            <div className="flex items-center gap-3 mt-3">
              {renderStars(place.rating)}
              <span className="text-sm text-slate-sea/60">
                {place.rating.toFixed(1)} ({place.review_count ?? 0}{" "}
                {place.review_count === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Details grid */}
          <div className="mt-8 space-y-4">
            {/* Address */}
            {place.address && (
              <div className="flex items-start gap-3">
                <svg width="18" height="18" className="mt-0.5 shrink-0 text-rockpool" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  {place.google_maps_url ? (
                    <a
                      href={place.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-sea hover:text-rockpool transition-colors"
                    >
                      {place.address}
                    </a>
                  ) : (
                    <p className="text-slate-sea">{place.address}</p>
                  )}
                </div>
              </div>
            )}

            {/* Phone */}
            {place.phone && (
              <div className="flex items-center gap-3">
                <svg width="18" height="18" className="shrink-0 text-rockpool" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href={`tel:${place.phone.replace(/\s/g, "")}`}
                  className="text-slate-sea hover:text-rockpool transition-colors"
                >
                  {place.phone}
                </a>
              </div>
            )}

            {/* Website */}
            {place.website && (
              <div className="flex items-center gap-3">
                <svg width="18" height="18" className="shrink-0 text-rockpool" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-sea hover:text-rockpool transition-colors"
                >
                  {domainFromUrl(place.website)}
                </a>
              </div>
            )}
          </div>

          {/* Google Maps embed */}
          {place.lat != null && place.lng != null && (
            <div className="mt-8 rounded-xl overflow-hidden border border-driftwood/20">
              <iframe
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${place.lat},${place.lng}&output=embed&hl=en&z=14`}
                title={`Map of ${place.name}`}
              />
            </div>
          )}

          {/* Report link */}
          <p className="mt-6 text-xs text-driftwood">
            Is something wrong with this listing?{" "}
            <a
              href={`mailto:hello@visitrhosneigr.wales?subject=Issue with ${place.name}`}
              className="underline hover:text-rockpool transition-colors"
            >
              Report an issue
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
