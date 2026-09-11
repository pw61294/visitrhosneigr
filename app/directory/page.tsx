import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { directoryCategories, siteConfig } from "@/lib/config";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Local Directory | ${siteConfig.name}`;
  const description =
    "Discover local businesses, restaurants, activities and places to stay in and around Rhosneigr, Anglesey.";
  const url = `${siteConfig.url}/directory`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: "en_GB",
      type: "website",
    },
  };
}

const iconPaths: Record<string, React.ReactNode> = {
  utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </>
  ),
  bed: (
    <>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  "shopping-bag": (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
};

async function getCategoryCounts() {
  const counts: Record<string, number> = {};
  for (const cat of directoryCategories) {
    const { count } = await supabaseAdmin
      .from("rhosneigr_places")
      .select("*", { count: "exact", head: true })
      .eq("category", cat.slug);
    counts[cat.slug] = count ?? 0;
  }
  return counts;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rhosneigr Local Directory",
  description: "Local businesses, restaurants, activities and places to stay in and around Rhosneigr, Anglesey.",
  url: "https://visitrhosneigr.wales/directory",
  numberOfItems: directoryCategories.length,
  itemListElement: directoryCategories.map((cat, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cat.label,
    url: `https://visitrhosneigr.wales/directory/${cat.slug}`,
  })),
};

export default async function DirectoryPage() {
  const counts = await getCategoryCounts();

  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="section-container">
        {/* Breadcrumb — above hero */}
        <nav className="mt-6 md:mt-8 mb-6 text-sm text-slate-sea/60" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-rockpool transition-colors">Home</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li className="text-slate-sea font-medium" aria-current="page">Directory</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/beaches.jpg"
              alt="Rhosneigr, Anglesey"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              Local directory
            </h1>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <p className="text-xl text-slate-sea/75 leading-relaxed max-w-2xl">
            Discover local businesses, restaurants, activities and places to stay
            in and around Rhosneigr, Anglesey.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {directoryCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/directory/${cat.slug}`}
              className="group relative rounded-xl overflow-hidden bg-gradient-to-br p-6 md:p-8 flex flex-col justify-end min-h-[180px] hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: `linear-gradient(135deg, var(--color-sand) 0%, color-mix(in srgb, var(--color-rockpool) 8%, var(--color-sand)) 100%)` }}
            >
              {/* Decorative accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />

              {/* Icon */}
              <div className="absolute top-5 left-6">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-sea"
                  >
                    {iconPaths[cat.icon]}
                  </svg>
                </div>
              </div>

              <div className="relative">
                <p className="text-xs font-medium text-rockpool uppercase tracking-wide">
                  {counts[cat.slug]} {counts[cat.slug] === 1 ? "place" : "places"}
                </p>
                <h2 className="mt-1 text-xl md:text-2xl font-bold text-slate-sea group-hover:text-rockpool transition-colors">
                  {cat.label}
                </h2>
                <p className="mt-1 text-sm text-slate-sea/60 leading-snug">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
