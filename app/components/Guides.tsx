import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/config";

const guideImages: Record<string, string> = {
  "/guides/best-beaches": "/images/beaches.jpg",
  "/guides/where-to-eat": "/images/sea-shanty.jpg",
  "/guides/things-to-do": "/images/activity-south-stack.jpg",
  "/guides/walks-and-trails": "/images/coastal-path.jpg",
};

const guideStats = [
  { value: "5", label: "in-depth guides" },
  { value: "30+", label: "places covered" },
];

export default function Guides() {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-5 gap-8 md:gap-14 items-start">
          {/* Left text column */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest text-rockpool font-semibold uppercase">
              The ultimate guide
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-slate-sea mt-1 leading-tight">
              Plan your perfect day in Rhosneigr
            </h2>
            <p className="mt-4 text-base text-slate-sea/70 leading-relaxed max-w-sm">
              From the best surf spots and beach walks to where to eat after a morning
              in the water — get the inside scoop on everything this corner of Anglesey
              has to offer.
            </p>
            <p className="mt-4 text-base text-slate-sea/70 leading-relaxed max-w-sm">
              Our guides are written from real local knowledge — not generic travel
              content. Each one covers what you actually need: where to park,
              which beach breaks work on which wind, and where locals go for coffee.
            </p>
            <Link
              href="/guides"
              className="mt-6 inline-flex items-center gap-2 bg-rockpool text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-rockpool/90 transition-colors"
            >
              Explore the full guide
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Stats grid */}
            <div className="mt-10 pt-8 border-t border-driftwood/20">
              <div className="grid grid-cols-2 gap-8">
                {guideStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-bold text-slate-sea leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-sea/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guide cards grid — 2x2 layout */}
          <div className="md:col-span-3 grid grid-cols-2 gap-5">
            {guides.filter((g) => g.href !== "/guides/getting-here").map((guide) => {
              const imageSrc = guideImages[guide.href] ?? "/images/beaches.jpg";
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={imageSrc}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Strong gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-sea/90 via-slate-sea/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-snug">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-1 text-white/60 text-xs font-medium mt-0.5">
                        Read guide
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
