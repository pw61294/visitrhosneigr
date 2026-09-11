import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Getting to Rhosneigr";
  const description =
    "How to get to Rhosneigr, Anglesey by car, train, bus and ferry. Includes driving directions from the A55, parking advice, nearest train stations, and ferry connections from Dublin.";
  const url = `${siteConfig.url}/guides/getting-here`;
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
    { "@type": "ListItem", position: 3, name: "Getting here", item: `${siteConfig.url}/guides/getting-here` },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Getting to Rhosneigr",
  description:
    "A practical guide to getting to Rhosneigr, Anglesey — driving directions, parking, train connections, bus routes and ferry services.",
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/guides/getting-here` },
};

const directions = [
  {
    image: "/images/guide-britannia.jpg",
    heading: "By car — the main approach for most visitors",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The A55, known as the North Wales Expressway, is the main route onto Anglesey.
          From Chester, it&apos;s straight up the A483 and then the A55 across the A55
          itself — allow around ninety minutes to Holyhead. From Birmingham, you&apos;re looking
          at three to three and a half hours via the M6 and A5. From London, four to
          five hours is realistic, and it&apos;s one of those journeys that feels shorter
          than the clock says because the landscape changes so much as you head north.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Britannia Bridge crossing from the mainland to Anglesey is the only
          significant crossing point — the second crossing at Conwy is much further
          east and rarely worth considering unless you&apos;re coming from further north.
          On busy summer weekends, the bridge can get congested, particularly on
          Sunday afternoon when day-trippers head home. If you&apos;re arriving on a
          Saturday morning, you&apos;ll usually sail through.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Once on Anglesey, stay on the A55 past Holyhead until you take the B4545
          signposted to Trearddur Bay. The B4545 runs directly into the village —
          you&apos;ll see the bay appear on your left and the village unfolds from there.
          From the A55 junction to the bay is about five minutes. There&apos;s only
          one main road through the village, so you really can&apos;t go wrong.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-parking.jpg",
    heading: "Parking — the practical thing to know before you arrive",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          There is no parking charge anywhere in Trearddur Bay, which surprises people
          who are used to the enforced payment systems at most British seaside resorts.
          The main free parking is along Lon St Ffraid, the road that runs parallel
          to the main beach. There&apos;s also a small car park on Ravenspoint Road at
          the north end of the bay, and a larger one above Porth Dafarch for the
          southern beach.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          In peak summer — July and August, particularly at weekends and during school
          holidays — the village parking fills up by mid-morning on good weather days.
          If you&apos;re staying in the village, your accommodation may have parking,
          so check before you arrive. For day visitors, the best strategy is to arrive
          before 10am in August, or be prepared to park slightly further away and walk
          in. On quiet weekdays outside of school holidays, you&apos;ll usually find a
          space without any trouble.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The lack of parking charges is genuinely unusual for a beach resort of this
          popularity and is one of those things that locals appreciate and try to
          preserve. It does mean the village can get very full on peak days — but
          it also means people who come for the day aren&apos;t being penalised for
          enjoying the place.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-train.jpg",
    heading: "By train — closer than you might think",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Holyhead railway station is on the mainline from London Euston, with direct
          services from Birmingham New Street, Crewe and Chester. Avanti West Coast
          runs the London service — it&apos;s about three and a half hours from London
          Euston to Holyhead, which is genuinely competitive with driving once you
          factor in traffic and rest stops. Transport for Wales also runs services
          along the coast from Cardiff and other Welsh destinations.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          From Holyhead station to Trearddur Bay is about three miles. A taxi is the
          most practical option — there are usually taxis waiting at the station, or
          you can book in advance. There is a bus service, but it&apos;s infrequent and
          the timetable doesn&apos;t make it a practical option unless you&apos;re
          specifically planning around it.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          One of the underappreciated aspects of getting here by train is the journey
          itself. The line runs along the north Wales coast with sea views for large
          sections, and crossing the Britannia Bridge by train is an experience —
          you emerge onto Anglesey with the mountains of Snowdonia on one side
          and the Irish Sea on the other. Worth doing once just for that.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-ferry.jpg",
    heading: "By ferry — the Irish connection",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Holyhead is one of the principal ferry ports for crossings from Dublin,
          operated by Irish Ferries and Stena Line. If you&apos;re coming from Ireland
          — or if you&apos;re combining a Welsh holiday with a trip to the Republic —
          Holyhead is an extremely convenient arrival point. The crossing from
          Dublin to Holyhead takes about three and a half hours with Irish Ferries,
          or just under two hours with Stena&apos;s fast craft.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Trearddur Bay is about five minutes&apos; drive from the ferry terminal, which
          makes it one of the most conveniently located holiday bases on Anglesey
          for anyone arriving from Ireland. A lot of people who own holiday homes
          in Trearddur Bay and the surrounding area originally discovered it this
          way — they came over on the ferry, found the bay, and kept coming back.
          It&apos;s a pattern you hear repeatedly here, and one we&apos;re rather proud of.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-mountain.jpg",
    heading: "By air — nearest airports and driving times",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          There is no airport on Anglesey itself, so all air travel involves a
          onward drive. Manchester Airport is about two hours&apos; drive — the most
          convenient for a lot of international visitors and the one most car
          rental companies use. Liverpool John Lennon Airport is closer at about
          ninety minutes. Birmingham Airport is roughly three hours.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Dublin Airport is also worth considering if you&apos;re coming from the US
          or Canada and fancy combining Wales with Ireland — the ferry crossing
          from Dublin to Holyhead is straightforward and the total journey time
          from Dublin city centre to Trearddur Bay is about five and a half hours
          door to door, which is genuinely competitive with connecting flights
          and a drive from Manchester.
        </p>
      </>
    ),
  },
];

export default function GettingHerePage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Getting here</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/guide-getting-here.jpg"
              alt="The Britannia Bridge crossing to Anglesey"
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
              Getting to Rhosneigr
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container">
        <div className="max-w-prose mx-auto">
          {/* Intro */}
          <p className="text-xl text-slate-sea/75 leading-relaxed mb-12 max-w-2xl">
            <span className="font-semibold text-slate-sea">Trearddur Bay is on the western edge of Anglesey, about as far west as you can
            get in Wales before you&apos;re in the Irish Sea.</span>{" "}
            It&apos;s further from London than some people expect — but the journey is part of the appeal,
            and once you&apos;re here everything is close at hand.
          </p>
        </div>

        {/* Direction sections — alternating layout */}
        {directions.map((section, index) => (
          <section
            key={section.heading}
            className={`mt-16 first:mt-0 ${index % 2 === 1 ? "flex flex-col md:flex-row-reverse gap-8 md:items-stretch" : ""}`}
          >
            {index % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={section.image}
                    alt={section.heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{section.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {section.content}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{section.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {section.content}
                </div>
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={section.image}
                    alt={section.heading}
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
