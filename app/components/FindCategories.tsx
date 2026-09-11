import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    label: "Eat & Drink",
    subtitle: "Restaurants, pubs & cafes",
    href: "/directory/eat-and-drink",
    image: "/images/sea-shanty.jpg",
    icon: "utensils",
  },
  {
    label: "Stay",
    subtitle: "Hotels, cottages & campsites",
    href: "/directory/stay",
    image: "/images/trearddur-hotel.jpg",
    icon: "bed",
  },
  {
    label: "Do",
    subtitle: "Watersports & attractions",
    href: "/guides/things-to-do",
    image: "/images/activity-watersports.jpg",
    icon: "compass",
  },
  {
    label: "Walk",
    subtitle: "Coastal paths & trails",
    href: "/guides/walks-and-trails",
    image: "/images/walks.jpg",
    icon: "footprints",
  },
  {
    label: "Shop",
    subtitle: "Galleries & local shops",
    href: "/directory/shops",
    image: "/images/coastal-gem-small1.png",
    icon: "shopping-bag",
  },
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
};

export default function FindCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest text-rockpool">
              EXPLORE
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-slate-sea mt-3">
              Find what you&apos;re looking for
            </h2>
          </div>
          <Link
            href="/directory"
            className="text-rockpool hover:text-rockpool/80 text-sm font-medium transition-colors shrink-0 pt-6"
          >
            View all categories →
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    {/* Icon circle */}
                    <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        {iconPaths[cat.icon]}
                      </svg>
                    </span>
                    <p className="text-white text-sm font-semibold leading-snug">
                      {cat.label}
                    </p>
                  </div>
                  <p className="text-white/60 text-xs leading-snug mt-0.5 pl-10">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
