import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Where to eat in Rhosneigr";
  const description =
    "The best places to eat in and around Rhosneigr — beachfront cafes, local pubs, fine dining and great takeaways. Our insider guide to where and what to eat in Holy Island, Anglesey.";
  const url = `${siteConfig.url}/guides/where-to-eat`;
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
    { "@type": "ListItem", position: 3, name: "Where to eat", item: `${siteConfig.url}/guides/where-to-eat` },
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Where to eat in Rhosneigr",
  description:
    "A local's guide to the best places to eat in Rhosneigr — covering cafes, restaurants, pubs and takeaways in Holy Island, Anglesey.",
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/guides/where-to-eat` },
};

const eatSections = [
  {
    image: "/images/sea-shanty.jpg",
    heading: "Beachfront cafes",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Sea Shanty Cafe is probably the most visited place in the village, and for good reason.
          Sitting right on the beach front with a terrace that catches the afternoon sun, it does
          excellent coffee, good breakfasts, and homemade cakes that you can genuinely taste the
          difference in. The indoor seating is warm and full of local character, and the outdoor
          tables fill up fast on a fine day. Come early for a fry-up and you&apos;ll understand why
          it&apos;s been a fixture here for years.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Stores is harder to categorise but it&apos;s one of the best things in the village. Part
          pizza place, part deli, part seafood counter — they do fresh lobster and crab hampers
          that you can take down to the beach. The pizza is cooked in a proper wood-fired oven and
          the quality is consistently high. Pick up a hamper on your way to the beach and you&apos;ve
          got the makings of a very good day.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-restaurants.jpg",
    heading: "Restaurants worth dressing up for",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Ocean&apos;s Edge is the place to come when you want a proper night out. The bay views from
          the dining room are genuinely stunning, particularly at sunset when the water turns the
          colour of the sky. The menu changes regularly with the seasons and the cooking is thoughtful
          without being fussy — local seafood, properly handled, with produce from the island where
          possible. It&apos;s the kind of restaurant that a lot of places on the Welsh coast would
          like to be and isn&apos;t.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Bay Restaurant at the Trearddur Bay Hotel is more accessible but no less enjoyable.
          Seasonal menus that lean heavily on local produce, a dining room that opens to the
          terrace overlooking the bay, and prices that don&apos;t require a special occasion to justify.
          For a relaxed evening where the setting does half the work for you, it&apos;s hard to beat.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Catch 22 in Valley is a short drive inland but it draws a loyal local following for good
          reason. A proper neighbourhood restaurant with a gastropub sensibility — confident cooking
          in a room that actually feels alive. The steak and chips is excellent and the cocktails
          are worth the trip alone. Well worth the fifteen minutes in the car.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Seacroft has built a reputation as the gastropub in this part of Anglesey. Locally
          sourced ingredients, a menu that changes with the seasons, and a dining room that strikes
          the right balance between pub and restaurant. The Sunday roast is properly good, and
          in summer the garden is one of the best outdoor drinking spots in the area.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-pubs.jpg",
    heading: "Pubs — from a quiet pint to live music",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Inn at the Bay is the Trearddur Bay Hotel&apos;s own pub, which means it benefits from
          being attached to one of the best bay-view beer gardens in the area. JW Lees beers on
          tap, a menu that covers everything from a bowl of chips to a proper dinner, and a
          atmosphere that manages to be lively without feeling like it&apos;s trying too hard.
          It&apos;s become the default gathering place for a lot of locals, which is usually a good sign.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Farrell&apos;s Bar has a different energy — live music most weekends, a slightly more
          alternative crowd, and a vibe that feels like it belongs to a proper seaside town rather
          than a polished resort. The drinks are well-priced and the place has a genuine
          following. If you&apos;re after something that feels less touristy and more like how
          pubs used to be, this is it.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Bert&apos;s Family Pub lives up to its name — straightforward, welcoming, popular with
          families and dog owners, and completely unpretentious. Exactly what a village pub
          should be and often isn&apos;t anymore. No reservations, no attitude, just good pub
          food and a warm welcome.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The White Eagle in Rhoscolyn is worth the drive south for its position alone —
          right above the beach with a large outdoor area that catches the sun all afternoon.
          It&apos;s a classic beach pub done well: good beer, generous portions, and a crowd that
          mixes locals with walkers finishing the coastal path. After a morning on Borth Wen
          or Silver Bay, it&apos;s a welcome sight.
        </p>
      </>
    ),
  },
  {
    image: "/images/guide-takeaway.jpg",
    heading: "Takeaway and casual eating",
    content: (
      <>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          Scarlett&apos;s Fish and Chips is the reliable option when you want something quick and
          satisfying. The fish is fresh, the chips are proper chipshop chips, and the kids
          will be happy. Not much more to say except that when you&apos;ve had a long day at the
          beach and can&apos;t face cooking, this is exactly what you want.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Little Indian Chef does a brisk trade from its location on Lon St Ffraid and has
          built up a strong local following. The food is reliably good, the service is quick,
          and it&apos;s become a regular fixture for people who live here. A sensible option for
          a night in when you don&apos;t want to go out but want something better than a microwave meal.
        </p>
        <p className="text-base leading-relaxed text-slate-sea/80 mb-4">
          The Driftwood Bar at The Beach Motel sits right on the beach path and does a good line
          in casual dining — think sharing boards, local seafood, and a decent wine list. It&apos;s
          a nice option for a relaxed evening without the formality of a full restaurant.
        </p>
      </>
    ),
  },
];

export default function WhereToEatPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Where to eat</li>
          </ol>
        </nav>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[2/1] md:aspect-[3/1]">
            <Image
              src="/images/guide-food.jpg"
              alt="Sea Shanty Cafe on the Rhosneigr waterfront"
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
              Where to eat in Rhosneigr
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container">
        <div className="max-w-prose mx-auto">
          {/* Intro */}
          <p className="text-xl text-slate-sea/75 leading-relaxed mb-12 max-w-2xl">
            <span className="font-semibold text-slate-sea">Eating well here is easier than you might expect for a village of this size.</span>{" "}
            From a proper beachfront coffee to some genuinely excellent restaurants, our local food scene has
            surprised more than a few people who thought they were coming to a quiet corner of Wales.
          </p>
        </div>

        {/* Eat sections — alternating layout */}
        {eatSections.map((section, index) => (
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
