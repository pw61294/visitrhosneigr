import Link from "next/link";
import { directoryCategories } from "@/lib/config";

const iconPaths: Record<string, React.ReactNode> = {
  utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
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
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5 10 7.89 8 10 8 12h0a2 2 0 0 1 2 2v2" />
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

const gradientMap: Record<string, string> = {
  "eat-and-drink": "from-rockpool to-rockpool/80",
  stay: "from-sunset to-sunset/80",
  activities: "from-slate-sea to-slate-sea/80",
  shops: "from-driftwood to-driftwood/70",
};

export default function Categories() {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {directoryCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/directory/${cat.slug}`}
              className="group shrink-0"
            >
              <div
                className={`
                  flex items-center gap-3 px-8 py-3 rounded-full
                  bg-gradient-to-r ${gradientMap[cat.slug]}
                  shadow-sm hover:shadow-md
                  transition-all duration-300 hover:scale-105
                  hover:brightness-110
                `}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {iconPaths[cat.icon]}
                </svg>
                <span className="text-sm font-semibold text-white whitespace-nowrap">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
