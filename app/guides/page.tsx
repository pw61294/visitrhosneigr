import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { guides, siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Rhosneigr guides";
  const description =
    "Insider guides to Rhosneigr and Anglesey's west coast — the best surf spots, where to eat, coastal walks, and how to get here. Written by people who actually live here.";
  const url = `${siteConfig.url}/guides`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.domain}`,
      description,
      url,
      locale: "en_GB",
      type: "website",
    },
  };
}

const guideImages: Record<string, string> = {
  "best-beaches": "/images/beaches.jpg",
  "where-to-eat": "/images/sea-shanty.jpg",
  "things-to-do": "/images/activity-south-stack.jpg",
  "walks-and-trails": "/images/coastal-path.jpg",
  "getting-here": "/images/walks.jpg",
};

export default function GuidesIndexPage() {
  const slugMap: Record<string, string> = {
    "/guides/best-beaches": "best-beaches",
    "/guides/where-to-eat": "where-to-eat",
    "/guides/things-to-do": "things-to-do",
    "/guides/walks-and-trails": "walks-and-trails",
    "/guides/getting-here": "getting-here",
  };

  return (
    <div className="py-8 md:py-12">
      {/* Hero banner */}
      <div className="section-container">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative aspect-[3/1] md:aspect-[3/1]">
            <Image
              src="/images/beaches.jpg"
              alt="The coastline at Rhosneigr"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-sea/80 via-slate-sea/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Rhosneigr guides
            </h1>
          </div>
        </div>
      </div>

      {/* Guide cards grid */}
      <div className="section-container mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {guides.map((guide) => {
            const slug = slugMap[guide.href] ?? "";
            const imageSrc = guideImages[slug] ?? "/images/beaches.jpg";
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl overflow-hidden bg-white border border-driftwood/20 hover:border-rockpool/40 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative bg-driftwood/10">
                  <Image
                    src={imageSrc}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-sea/60 via-slate-sea/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-base font-bold text-slate-sea group-hover:text-rockpool transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-slate-sea/55 mt-1 leading-relaxed">
                    {guide.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-rockpool text-sm font-medium">
                    Read guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
