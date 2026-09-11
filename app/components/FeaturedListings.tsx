import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const revalidate = 3600;

const FEATURED = [
  {
    name: "Oyster Catcher",
    slug: "oyster-catcher",
    category: "Eat & drink",
    categorySlug: "eat-and-drink",
    description: "Beachside restaurant with stunning views and local seafood.",
    image: "/images/sea-shanty.jpg",
  },
  {
    name: "Y Morfa",
    slug: "y-morfa",
    category: "Eat & drink",
    categorySlug: "eat-and-drink",
    description: "Cosy village pub with great food and a warm welcome.",
    image: "/images/trearddur-hotel.jpg",
  },
  {
    name: "Rhosneigr Surf School",
    slug: "rhosneigr-surf-school",
    category: "Do",
    categorySlug: "activities",
    description: "Learn to surf or kitesurf with local instructors.",
    image: "/images/activity-watersports.jpg",
  },
  {
    name: "Anglesey Coastal Path",
    slug: "anglesey-coastal-path",
    category: "Walks",
    categorySlug: "activities",
    description: "125 miles of stunning coastal walking around Anglesey.",
    image: "/images/coastal-path.jpg",
  },
];

function renderStars(rating: number, size: number = 12) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-sunset">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {half === 1 && (
        <svg width={size} height={size} viewBox="0 0 24 24" className="text-sunset">
          <defs>
            <linearGradient id={`half-${rating}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill={`url(#half-${rating})`} stroke="currentColor" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-driftwood/50">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default async function FeaturedListings() {
  // Fetch ratings from Supabase for the 4 featured places by name
  const { data: ratings } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("name, rating, review_count")
    .in(
      "name",
      FEATURED.map((f) => f.name)
    );

  const ratingMap: Record<string, { rating: number; review_count: number }> = {};
  for (const r of ratings ?? []) {
    ratingMap[r.name] = { rating: r.rating ?? 0, review_count: r.review_count ?? 0 };
  }

  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        {/* Section heading */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-rockpool font-semibold uppercase">
            Local favourites
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-slate-sea mt-1">
            Top places to visit
          </h2>
          <div className="mt-2 h-0.5 w-16 bg-rockpool rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FEATURED.map((listing) => {
            const ratingData = ratingMap[listing.name];
            return (
              <Link
                key={listing.slug}
                href={`/directory/${listing.categorySlug}/${listing.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full">
                  {/* Image */}
                  <div className="aspect-[4/3] relative bg-driftwood/10">
                    <Image
                      src={listing.image}
                      alt={listing.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Category badge */}
                    <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-rockpool/10 text-rockpool text-xs font-medium">
                      {listing.category}
                    </span>

                    {/* Name */}
                    <h3 className="text-base font-semibold text-slate-sea group-hover:text-rockpool transition-colors leading-snug">
                      {listing.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-sea/55 mt-1 leading-snug">
                      {listing.description}
                    </p>

                    {/* Rating */}
                    {ratingData && ratingData.rating > 0 && (
                      <div className="flex items-center gap-1.5 mt-2">
                        {renderStars(ratingData.rating, 11)}
                        <span className="text-xs text-driftwood">
                          ({ratingData.review_count})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-6 text-right">
          <Link
            href="/directory"
            className="text-sm font-medium text-rockpool hover:text-rockpool/80 transition-colors"
          >
            View all listings →
          </Link>
        </div>
      </div>
    </section>
  );
}
