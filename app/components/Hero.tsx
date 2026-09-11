import Image from "next/image";
import Link from "next/link";

const categories = [
  { label: "Eat & Drink", subtitle: "Local cafes, great coffee", href: "/directory/eat-and-drink", icon: "utensils" },
  { label: "Stay", subtitle: "Coastal cottages & B&Bs", href: "/directory/stay", icon: "bed" },
  { label: "Things to do", subtitle: "Surf, kite, explore", href: "/guides/things-to-do", icon: "compass" },
  { label: "Walk", subtitle: "Dunes, headlands & coast", href: "/guides/walks-and-trails", icon: "footprints" },
  { label: "Beaches", subtitle: "Sandy bays & surf spots", href: "/guides/best-beaches", icon: "waves" },
];

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
  footprints: (
    <>
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5 10 7.89 8 10 8 12a2 2 0 0 1 2 2v2" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 2.39 2 4.5 2 6.5a2 2 0 0 1-2 2v2" />
    </>
  ),
  "shopping-bag": (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  waves: (
    <>
      <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
      <path d="M2 18c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
    </>
  ),
};

export default function Hero() {
  return (
    <section className="relative h-[min(80vh,54rem)] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Rhosneigr, Anglesey's surf village"
        fill
        priority
        quality={90}
        className="object-cover object-[center_20%] md:object-[center_25%]"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Main content — left aligned, vertically at ~42% */}
      <div className="absolute top-[42%] -translate-y-1/2 left-0 right-0">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
            Welcome to
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-normal leading-[1.08] tracking-tight text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Rhosneigr
            <br />
            <span className="text-white">Anglesey's surf village</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-md leading-relaxed">
            Wind, waves, wide beaches and a village that knows
            how to make the most of them all.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md">
            <div className="flex items-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 overflow-hidden">
              <svg className="ml-4 shrink-0 text-white/50" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                placeholder="Search businesses, places, events..."
                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 py-3.5 px-3 focus:outline-none"
              />
              <button className="px-5 py-2.5 m-1.5 rounded-full bg-rockpool text-white text-sm font-semibold hover:bg-rockpool/90 transition-colors shrink-0">
                Explore &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category bar — floating over image, no background */}
      <div className="absolute bottom-32 left-0 right-0">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="flex items-center justify-between">
            {categories.map((cat, i) => (
              <div key={cat.href} className="flex items-center">
                {i > 0 && <div className="w-px h-12 bg-white/35 mx-5 md:mx-8 hidden sm:block" />}
                <Link href={cat.href} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:border-white/50 transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      {iconPaths[cat.icon]}
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-lg font-bold text-white" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{cat.label}</p>
                    <p className="text-sm text-white/60" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{cat.subtitle}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-6 h-9 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div className="w-1 h-1.5 rounded-full bg-white/80 animate-scroll-dot" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-px bg-white/60" />
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/70">Scroll to explore</p>
          <div className="w-14 h-px bg-white/60" />
        </div>
      </div>
    </section>
  );
}
