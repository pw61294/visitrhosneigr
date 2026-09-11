import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Things to do near Rhosneigr | visitrhosneigr.wales";
  const description =
    "The best activities and attractions near Rhosneigr — seabird watching at South Stack, clifftop golf, kayaking, coasteering, coastal walks and more. Your complete local guide.";
  const url = `${siteConfig.url}/guides/things-to-do`;
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
    { "@type": "ListItem", position: 3, name: "Things to do", item: `${siteConfig.url}/guides/things-to-do` },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Things to do near Rhosneigr",
  description:
    "A local's guide to the best activities and attractions near Rhosneigr, Anglesey — from South Stack seabird watching to kayaking, golf, coasteering and coastal walks.",
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-09-09",
  dateModified: "2026-09-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/guides/things-to-do` },
};

const activities = [
  {
    image: "/images/activity-south-stack.jpg",
    heading: "South Stack Lighthouse",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          One of Anglesey's most iconic landmarks, South Stack lighthouse sits on a tiny island off the western tip of Holy Island, about a ten-minute drive from Trearddur Bay. The lighthouse was built in 1809 to warn ships navigating the treacherous waters towards Holyhead port. To reach it you descend 400 steps down the cliff face — dramatic in any weather.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The lighthouse is open to visitors at certain times through the year, and the views from the island across to Ireland and the Wicklow Mountains are spectacular. Even if the lighthouse itself is closed, the clifftop walk and RSPB visitor centre at Ellin's Tower make the trip worthwhile. Free parking on site.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-rspb.jpg",
    heading: "RSPB South Stack — seabird watching",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The cliffs around South Stack are home to thousands of breeding seabirds between April and July. Puffins, razorbills, guillemots and choughs nest on the sheer rock faces, and you can watch them from Ellin's Tower, the old lighthouse keeper's lookout now run as an RSPB visitor centre.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The puffins are the main draw — arrive in late April and stay through June. Binoculars help but aren't essential; the birds are surprisingly close. Outside breeding season the cliffs are quieter but still worth visiting for the raw coastal scenery. It's one of those places that reminds you why this corner of Wales is special.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-mountain.jpg",
    heading: "Holyhead Mountain",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          At 220 metres, Holyhead Mountain is the highest point on Anglesey and one of the most rewarding short walks in North Wales. The summit takes about 45 minutes from the Breakwater Country Park car park, or you can start from the South Stack car park for a slightly shorter route. The path is rough in places but well-trodden.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          At the top you get 360-degree views — Ireland to the west, Snowdonia to the south-east, the Wicklow Mountains if the air is clear, and the full sweep of Anglesey laid out below. The summit also has the remains of a prehistoric hill fort (Caer y Tŵr), a Scheduled Ancient Monument, with Roman-era fortifications layered on top. History and views in one walk.
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
          On the northern edge of Holyhead, this 200-acre country park is built around the massive Victorian breakwater that protects Holyhead harbour. It's a flat, easy walk along the breakwater itself — perfect for families, dogs, and anyone who wants fresh air without a serious hike.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The park also serves as the starting point for walks up Holyhead Mountain and along the coast towards South Stack. There's a car park, toilets, and a visitor information point. On a clear day you can watch the Irish ferries coming and going from the port while the kids run around on the grass. One of those places that doesn't look like much on paper but works perfectly in practice.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-watersports.jpg",
    heading: "Kayaking and paddleboarding",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Trearddur Bay's sheltered waters make it one of the best spots on Anglesey for getting on the water. Blu Chameleon, based right on the bay, hire out kayaks and paddleboards by the hour — no experience needed, and they'll kit you out with a wetsuit and buoyancy aid. On a calm morning the water is almost turquoise, and you can paddle along the coast to discover small coves and rocky inlets that you'd never find on foot. Keep your eyes open for seals — they're regular visitors to the bay.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          For something more adventurous, several local companies offer coasteering sessions along the rocky coastline south of Trearddur Bay, combining cliff jumping, rock scrambling, and swimming through sea caves. See our directory listing for{" "}
          <Link href="/directory/activities/blu-chameleon" className="text-rockpool hover:underline">Blu Chameleon</Link>.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-coasteering.jpg",
    heading: "Coasteering",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          If kayaking is too gentle, coasteering is the answer. Part rock climbing, part cliff jumping, part wild swimming — you work your way along the base of the cliffs in a wetsuit, scrambling over rocks, jumping off ledges into deep water, and swimming through gaps in the rocks.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Several operators run sessions from around Trearddur Bay and Rhoscolyn, including Anglesey Adventures and Anglesey Outdoors, both based on Porthdafarch Road. Sessions typically last two to three hours and all equipment is provided. It's exhilarating, safe with the right guides, and gives you a completely different perspective on the coastline. Suitable from around age 8 upwards.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-golf.jpg",
    heading: "Holyhead Golf Club",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          A proper 18-hole clifftop links course with views that distract you from your game. Holyhead Golf Club sits on the headland between Trearddur Bay and South Stack, and several holes play right along the cliff edge with the Irish Sea below.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          It's a challenging course in the wind — and it's almost always windy up here — but the setting is spectacular. Green fees are reasonable and visitors are welcome. The clubhouse has a bar and serves food. If you're a golfer staying in Trearddur Bay, this is a must-play.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-beach-golf.jpg",
    heading: "The Beach Golf Course and Foot Golf",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          For something more casual, The Beach Golf Course on Lon St Ffraid in Trearddur Bay offers a relaxed 9-hole par-3 course that's perfect for families and beginners. They also run foot golf — basically golf but with a football, which kids love.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          It's right in the heart of the village, no booking needed, and you can fit a round in during an hour or so. A nice option for an afternoon when you don't want to commit to a full day out. BluFin fishing and outdoors shop is also based here if you want to pick up some gear.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-lifeboat.jpg",
    heading: "Trearddur Bay Lifeboat Station",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The RNLI lifeboat station at the north end of the bay has been part of the village since 1967. It's worth a visit — you can see the lifeboat and learn about the volunteer crew who head out in all conditions to keep the waters safe.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          They hold open days through the year where you can meet the crew and see the boat up close. There's a small shop selling RNLI merchandise. It's one of those community places that reminds you this isn't just a tourist village — people live and work here, and the lifeboat crew are a big part of what makes it tick.
        </p>
      </>
    ),
  },
  {
    image: "/images/activity-sea-zoo.jpg",
    heading: "Anglesey Sea Zoo",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          About 25 minutes' drive from Trearddur Bay on the other side of Anglesey, the Sea Zoo is Wales' largest marine aquarium. It's focused entirely on species found around the Welsh coast — no tropical fish, just the incredible marine life that lives in the waters you've been swimming in.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Highlights include the lobster hatchery, seahorse nursery, and live diving displays. Outside there's crazy golf, a bouncy castle, and a playground. It's a solid rainy-day option for families, or a good half-day trip combined with a stop at the nearby Llanfairpwllgwyngyll (yes, that one) for a photo with the station sign.
        </p>
      </>
    ),
  },
];

export default function ThingsToDoPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Things to do</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/activity-south-stack.jpg"
              alt="South Stack Lighthouse on Anglesey"
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
              Things to do near Rhosneigr
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container">
        <div className="max-w-prose mx-auto">
          {/* Intro */}
          <p className="text-xl text-slate-sea/75 leading-relaxed mb-12 max-w-2xl">
            <span className="font-semibold text-slate-sea">Whether you're here for a week or a weekend, there's no shortage of things to keep you busy.</span>{" "}
            From world-class seabird watching to lazy afternoons on the golf course, here's our guide to
            the best activities in and around Trearddur Bay.
          </p>
        </div>

        {/* Activity sections — alternating layout */}
          {activities.map((activity, index) => (
            <section
              key={activity.heading}
              className={`mt-16 first:mt-0 ${index % 2 === 1 ? "flex flex-col md:flex-row-reverse gap-8 md:items-stretch" : ""}`}
            >
              {index % 2 === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                    <Image
                      src={activity.image}
                      alt={activity.heading}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={index === 0 ? "object-cover object-[center_15%]" : "object-cover"}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-sea">{activity.heading}</h2>
                    <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                    {activity.content}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-sea">{activity.heading}</h2>
                    <div className="w-10 h-0.5 bg-rockpool rounded-full mt-3 mb-6" />
                    {activity.content}
                  </div>
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[280px]">
                    <Image
                      src={activity.image}
                      alt={activity.heading}
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
