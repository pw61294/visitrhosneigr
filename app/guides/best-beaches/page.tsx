import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Best beaches in and around Rhosneigr";
  const description =
    "Discover the best beaches near Rhosneigr, Anglesey — from the main Blue Flag sandy bay to hidden coves like Porth Dafarch, Porth Diana and Borth Wen. Full guide with parking, facilities and what each beach is like.";
  const url = `${siteConfig.url}/guides/best-beaches`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.domain}`,
      description,
      url,
      locale: "en_GB",
      type: "article",
    },
  };
}

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
    { "@type": "ListItem", position: 3, name: "Best beaches", item: `${siteConfig.url}/guides/best-beaches` },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best beaches in and around Rhosneigr",
  description:
    "A local's guide to the best beaches near Rhosneigr, Anglesey — covering Trearddur Bay Beach, Porth Dafarch, Porth Diana, Borth Wen, Silver Bay and more.",
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/guides/best-beaches` },
};

const beaches = [
  {
    image: "/images/guide-beaches.jpg",
    heading: "Trearddur Bay Beach — our main sandy stretch",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          This is the beach most people picture when they think of Trearddur Bay, and it&apos;s earned its reputation.
          A long sweep of sand backed by the village, with shallow water that&apos;s ideal for swimming and children —
          it&apos;s been awarded the Blue Flag for water quality, which matters when you&apos;re paddling at ankle depth
          on a hot August afternoon. Lifeguards are on duty through the summer season.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The bay curves round gently, giving views west towards Holyhead Mountain and the Irish Sea. At low tide,
          rockpools appear on both ends of the beach — the north end near Ravenspoint Road and the south end near
          Lon St Ffraid. Bring a bucket and you&apos;ll find crabs, anemones and whatever else the tide left behind.
          It&apos;s the kind of thing that makes this place feel like it belongs to the people who live here, not just
          to tourists.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Parking is on Lon St Ffraid — the main road that runs parallel to the beach — and also on Ravenspoint Road
          at the north end. Arrive by 10am in peak summer and you&apos;ll usually find a space. After that, it fills
          up fast and the village gets that lovely buzzy feel of a place that&apos;s genuinely popular.
        </p>
      </>
    ),
  },
  {
    image: "/images/porth-dafarch.jpg",
    heading: "Porth Dafarch — our best kept secret",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Ten minutes&apos; walk south along the coastal path from Trearddur Bay, Porth Dafarch is a smaller,
          more sheltered cove that regulars tend to keep to themselves. It&apos;s popular with kayakers and snorkellers
          because the water is clear and the rocky headlands create natural channels. On a calm morning the water
          here looks almost tropical.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          A small car park sits right above the beach — it fills early on summer weekends, but if you time it
          right you&apos;ll often have the place almost to yourself even in August. There are no lifeguards here,
          but the sheltered nature of the cove makes it relatively safe for stronger swimmers. The coastal path
          continues south from Porth Dafarch towards Porth y Post and eventually Rhoscolyn, so you can make it
          part of a longer walk.
        </p>
      </>
    ),
  },
  {
    image: "/images/porth-diana.jpg",
    heading: "Porth Diana — right on our doorstep",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Porth Diana is easy to miss because there&apos;s no obvious car park or signpost. It&apos;s a tiny rocky beach
          at the northern edge of the bay, accessible from the end of Ravenspoint Road, and it&apos;s part of the
          Wildlife Trust&apos;s nature reserve. The approach takes you through wildflower meadows that in summer
          are full of butterflies, which is a nice surprise.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          It&apos;s not a swimming beach — the rocks make entry difficult — but for rockpooling it&apos;s one of the
          best spots around. You can spend an hour here and find something different every time. Because it&apos;s
          tucked away, it tends to be quieter than the main bay even in peak season. One of those places that
          rewards the curious.
        </p>
      </>
    ),
  },
  {
    image: "/images/rhoscolyn.jpg",
    heading: "Borth Wen and Silver Bay — worth the drive to Rhoscolyn",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          About fifteen minutes&apos; drive south, the Rhoscolyn Headland has two beaches that are genuinely
          worth the trip. Borth Wen is a stunning secluded beach backed by dunes, accessed down a farm track
          from the road. It&apos;s the kind of beach you&apos;d film for a tourism advert — golden sand, clear water,
          and a proper sense of space. The White Eagle pub is a short walk from the car park, which makes it
          a perfect day: beach in the morning, walk up to the pub for lunch.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Silver Bay is further along the coast, and harder to get to — which is precisely why it stays quiet.
          The approach involves a bit of a walk, and that keeps the crowds away even in August. The water is
          crystal clear and the beach is genuinely beautiful. It&apos;s the kind of place people drive all the
          way from Chester to spend a day at, and then wonder why they don&apos;t do it more often. Dogs are
          welcome on both beaches, which matters to a lot of the people who live here.
        </p>
      </>
    ),
  },
];

export default function BestBeachesPage() {
  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="mt-6 md:mt-8 mb-6 text-sm text-slate-sea/60" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-rockpool transition-colors">Home</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li><Link href="/guides" className="hover:text-rockpool transition-colors">Guides</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li className="text-slate-sea font-medium" aria-current="page">Best beaches</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/guide-beaches.jpg"
              alt="The sandy sweep of Rhosneigr Beach"
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
              Best beaches in and around Rhosneigr
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container">
        <div className="max-w-prose mx-auto">
          {/* Intro */}
          <p className="text-xl text-slate-sea/75 leading-relaxed mb-12 max-w-2xl">
            <span className="font-semibold text-slate-sea">Our bay has some of the finest coastline in Wales, and the best part is you don&apos;t have to walk far to enjoy it.</span>{" "}
            Here&apos;s our insider&apos;s guide to every beach worth knowing about.
          </p>
        </div>

        {/* Beach sections — alternating layout */}
        {beaches.map((beach, index) => (
          <section
            key={beach.heading}
            className={`mt-16 first:mt-0 ${index % 2 === 1 ? "flex flex-col md:flex-row-reverse gap-8 md:items-stretch" : ""}`}
          >
            {index % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={beach.image}
                    alt={beach.heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{beach.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {beach.content}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{beach.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {beach.content}
                </div>
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={beach.image}
                    alt={beach.heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm text-center">
          <h3 className="text-xl font-bold text-slate-sea mb-2">Explore more of Rhosneigr</h3>
          <p className="text-slate-sea/60 mb-6">Find local businesses, activities, and everything else our bay has to offer.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/directory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rockpool text-white text-sm font-semibold hover:bg-rockpool/90 transition-colors"
            >
              Browse the directory
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-rockpool text-rockpool text-sm font-semibold hover:bg-rockpool/5 transition-colors"
            >
              Read more guides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
