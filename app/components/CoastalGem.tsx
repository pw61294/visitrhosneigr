import Link from "next/link";
import Image from "next/image";

const smallImages = [
  { src: "/images/coastal-gem-small1.png", alt: "Coastal scene at Rhosneigr" },
  { src: "/images/coastal-gem-small2.png", alt: "Coastal path on Anglesey" },
  { src: "/images/coastal-gem-small3.png", alt: "Rhosneigr beach" },
];

const stats = [
  { value: "2", label: "sandy beaches" },
  { value: "Year-round", label: "surf & kitesurf" },
  { value: "125mi", label: "Anglesey Coastal Path" },
  { value: "Dog friendly", label: "all year (main beach)" },
];

export default function CoastalGem() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

          {/* Text column */}
          <div className="md:col-span-3">
            <p className="text-xs tracking-widest text-rockpool font-semibold">
              DISCOVER
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-sea mt-3 leading-tight">
              Anglesey's windswept west coast
            </h2>
            <p className="mt-4 text-sm text-slate-sea/70 leading-relaxed">
              Rhosneigr is a small, spirited village that punches well above its weight.
              It&apos;s one of the best surf and kitesurf spots in Wales, with wide sandy beaches,
              a laid-back high street, and a community that revolves around the water.
              Whether you&apos;re catching waves, walking the dunes or just sitting outside
              a cafe watching the kites — this place gets under your skin.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 bg-rockpool text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-rockpool/90 transition-colors"
            >
              More about Rhosneigr
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Stats grid */}
            <div className="mt-10 pt-8 border-t border-driftwood/20">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-slate-sea leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-sea/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Large image */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden h-[500px]">
            <Image
              src="/images/coastal-gem-large.jpg"
              alt="Rhosneigr beach"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Decorative caption bottom-right */}
            <div className="absolute bottom-6 right-6">
              <p className="text-white text-xl md:text-2xl font-handwriting font-semibold leading-none">
                Watch the tide come in
              </p>
              {/* Swoosh underline */}
              <svg
                className="mt-1"
                width="80"
                height="8"
                viewBox="0 0 80 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.5C10 3 20 2 40 4C60 6 70 5 78 3"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Small images stacked */}
          <div className="md:col-span-3 flex flex-col gap-4 h-[500px]">
            {smallImages.map((img) => (
              <div
                key={img.src}
                className="relative rounded-xl overflow-hidden flex-1"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
