import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Walks and trails from Rhosneigr";
  const description =
    "The best walks from Rhosneigr, Anglesey — coastal paths, cliff walks, and nature reserves. Includes the route to Porth Dafarch, Rhoscolyn, South Stack, Holyhead Mountain, Breakwater Country Park and more.";
  const url = `${siteConfig.url}/guides/walks-and-trails`;
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
    { "@type": "ListItem", position: 3, name: "Walks and trails", item: `${siteConfig.url}/guides/walks-and-trails` },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Walks and trails from Rhosneigr",
  description:
    "A local's guide to the best walks near Rhosneigr, Anglesey — covering coastal paths, cliff walks, nature reserves and family-friendly trails.",
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/guides/walks-and-trails` },
};

const walks = [
  {
    image: "/images/walks.jpg",
    heading: "Trearddur Bay to Porth Dafarch",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The shortest walk on this list but arguably the most beautiful per minute. From the
          south end of Trearddur Bay beach, a well-maintained coastal path climbs gently
          along the cliffs southwards, with views across to Holyhead Mountain and the Irish
          Sea the whole way. At around twenty minutes&apos; walking pace, it&apos;s manageable for
          children and pushchairs (with care), and the views reward every step.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Porth Dafarch itself is a small, sheltered cove popular with kayakers and snorkellers.
          From here the path continues further south to Porth y Post, another tiny inlet that
          requires a bit of rock-hopping to access properly. The full Porth Dafarch to Porth
          y Post section takes about another twenty minutes and feels much more remote than
          you&apos;d expect this close to the main bay.
        </p>
      </>
    ),
  },
  {
    image: "/images/coastal-path-2.jpg",
    heading: "Trearddur Bay to Rhoscolyn — the classic coastal path day walk",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          This is the big one, and for good reason. From Trearddur Bay south along the Anglesey
          Coastal Path to Rhoscolyn Headland takes two to three hours at a comfortable walking
          pace, covering some of the most dramatic coastline on the island. The path undulates
          along cliff tops, dipping down to small coves and back up again, with views that
          constantly reward the effort.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          You pass Porth Dafarch and Porth y Post along the way, and the further south you go
          the more dramatic the cliffs become. When you reach Rhoscolyn Headland, The White
          Eagle pub is waiting at the end — which feels like exactly the right kind of reward
          for a long walk. You can either retrace your steps or take the bus back (check
          Arriva Cymru for times — it&apos;s not frequent, so plan ahead).
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Anglesey Coastal Path runs 125 miles around the entire island, and Trearddur Bay
          sits on one of its most spectacular sections. If you&apos;re here for a week and enjoy
          walking, you could spend several days exploring different stretches without covering
          the same ground twice.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-mountain.jpg",
    heading: "South Stack and Holyhead Mountain",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          About ten minutes&apos; drive from Trearddur Bay, South Stack is one of Anglesey&apos;s
          most dramatic landmarks. The RSPB reserve here is home to thousands of seabirds —
          puffins, razorbills, guillemots and chough — most visible in spring and summer
          when they breed on the cliffs. The crossing to Ellin&apos;s Tower, the old lighthouse
          keeper&apos;s station now run as a visitor centre, gives you the full cliff-edge experience
          without needing to do a serious climb.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Above South Stack, Holyhead Mountain rises steeply — the highest point on Anglesey
          and one of the highest peaks in north Wales. The summit walk is rough in places
          but straightforward enough in good conditions, and the 360-degree views are
          exceptional. On a clear day you can see across to Ireland, Snowdonia&apos;s peaks
          to the east, and the full sweep of the Irish Sea. It&apos;s the kind of view that
          makes you understand why people have lived on this island for thousands of years.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Holyhead Mountain is also a Scheduled Ancient Monument, with the remains of
          prehistoric settlements and Roman fortifications visible on the upper slopes.
          The history layered into the landscape adds something extra to a walk that
          would be worth doing for the views alone.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-breakwater.jpg",
    heading: "Breakwater Country Park",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          For something completely different, the Breakwater Country Park on the edge of
          Holyhead offers easy, flat walking with a strong industrial heritage narrative.
          The breakwater itself was built in the 19th century to protect the harbour —
          it&apos;s over a mile long and an impressive piece of Victorian engineering even now.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The country park paths are suitable for all ages and abilities, including
          wheelchairs and pushchairs. There&apos;s a visitor centre, a pond, and a stretch
          of reclaimed industrial land that&apos;s been allowed to rewild into meadow and
          wetland. It&apos;s popular with dog walkers and families, and a good option if
          you want a gentle morning walk that doesn&apos;t require any fitness or navigation.
          The café by the visitor centre does decent coffee and cakes.
        </p>
      </>
    ),
  },
  {
    image: "/images/porth-diana.jpg",
    heading: "Porth Diana Nature Reserve",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Right on the northern edge of Trearddur Bay, Porth Diana is managed by the
          Wildlife Trust of South Wales and offers a short, pleasant loop through
          wildflower meadows and coastal grassland. The reserve is small — you can
          walk the full loop in twenty to thirty minutes — but it&apos;s a lovely
          place to spend an hour, particularly in summer when the meadow flowers
          attract butterflies and bees.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The path leads down to a rocky beach at the cove itself, which isn&apos;t suitable
          for swimming but is excellent for birdwatching and, at low tide, rockpooling.
          It connects to the coastal path heading north, giving you the option to extend
          the walk if you want to. One of those places that&apos;s easy to walk straight
          past without noticing, but worth making time for.
        </p>
      </>
    ),
  },
];

export default function WalksAndTrailsPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Walks and trails</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/guide-walks.jpg"
              alt="The Anglesey Coastal Path overlooking the Irish Sea"
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
              Walks and trails from Rhosneigr
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container">
        <div className="max-w-prose mx-auto">
          {/* Intro */}
          <p className="text-xl text-slate-sea/75 leading-relaxed mb-12 max-w-2xl">
            <span className="font-semibold text-slate-sea">One of the things that most surprises people who move here or holiday here for the first time is how much walking is on offer.</span>{" "}
            From a ten-minute stroll to a full day on the cliffs, the variety within a few miles of our bay is genuinely remarkable.
          </p>
        </div>

        {/* Walk sections — alternating layout */}
        {walks.map((walk, index) => (
          <section
            key={walk.heading}
            className={`mt-16 first:mt-0 ${index % 2 === 1 ? "flex flex-col md:flex-row-reverse gap-8 md:items-stretch" : ""}`}
          >
            {index % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={walk.image}
                    alt={walk.heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{walk.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {walk.content}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div>
                  <h2 className="text-2xl font-bold text-slate-sea">{walk.heading}</h2>
                  <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                  {walk.content}
                </div>
                <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                  <Image
                    src={walk.image}
                    alt={walk.heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Things to know section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-sea">Things worth knowing before you set off</h2>
          <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
          <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
            The Anglesey Coastal Path is well-signed throughout and there are map boards
            at regular intervals, but it&apos;s worth carrying a map or having a phone GPS
            to hand for the less obvious paths. Conditions on cliff paths can change
            quickly in Welsh weather — even in summer — so proper footwear and a layer
            are always sensible. Dogs are welcome on most walks, though some nature
            reserves have seasonal restrictions, so it&apos;s worth checking before you go.
          </p>
          <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
            For beach walks like the one to Porth Dafarch, check the tide times before
            you go. The path is generally clear at any tide, but the approach to some
            coves can be cut off at high water. The local tourist information office in
            Holyhead has tide tables, or there are apps that cover it. Most of the
            locals check the tide before heading out — it&apos;s just part of living here.
          </p>
          <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
            If you&apos;re doing the longer walks, carry water and something to eat. There
            are pubs at either end of the Trearddur Bay to Rhoscolyn route, but the
            section in between has no facilities. For Holyhead Mountain, start early
            enough to be off the summit before the afternoon wind picks up, which can
            be strong even when it&apos;s calm at sea level.
          </p>
        </section>

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
