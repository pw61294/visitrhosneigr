import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = `About Rhosneigr | ${siteConfig.domain}`;
  const description =
    "An independent, locally-focused guide to Rhosneigr — why we built this site and what it's for.";
  const url = `${siteConfig.url}/about`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, locale: "en_GB", type: "website" },
  };
}

const breadcrumbLd = {
  "@context": "https://schema.org" as const,
  "@type": "BreadcrumbList" as const,
  itemListElement: [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem" as const, position: 2, name: "About", item: `${siteConfig.url}/about` },
  ],
};

export default function AboutPage() {
  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="mt-6 md:mt-8 mb-8 text-sm text-slate-sea/60" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-rockpool transition-colors">Home</Link></li>
            <li><span className="text-slate-sea/40" aria-hidden>›</span></li>
            <li className="text-slate-sea font-medium" aria-current="page">About</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-sea">
            About Rhosneigr
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-prose">
          <div className="text-base text-slate-sea/80 leading-relaxed space-y-5">

            <p>
              Rhosneigr is one of those rare places that feels genuinely special. One of Wales&apos; best
              surf and kitesurf spots, wide sandy beaches, a laid-back village high street, and a
              community that takes real pride in where they live. It&apos;s the kind of place people visit
              once and immediately start planning when to come back.
            </p>

            <p>
              For a long time, there wasn&apos;t a proper online home for all of that. Most of what existed
              online was generic booking platforms or community pages that hadn&apos;t been updated in years.
              The businesses were scattered across Google Maps, social media, and a dozen different sites.
              If you wanted to know which beach worked best on a south-westerly wind, or where the locals
              actually go for coffee, you had to ask someone who already knew.
            </p>

            <p>
              This site started with the <strong>Instagram account</strong> —{' '}
              <a
                href="https://instagram.com/visitrhosneigr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rockpool hover:underline"
              >
                @visitrhosneigr
              </a>{' '}
              — which began posting photographs of the village and the water, and gradually built a following
              of people who loved the area as much as the people who live here. The Instagram community
              is still where a lot of the conversation happens, and where the project really grew from.
            </p>

            <p>
              This website is the next step: an independent, locally-focused guide to Rhosneigr and
              Anglesey&apos;s west coast. A place to find out what&apos;s worth doing, where to eat and
              drink, where to stay, and who the local businesses are. The directory is actively growing
              — built from a combination of local knowledge and public business data, checked and expanded
              over time.
            </p>

            <p>
              If you run a business in the area and something isn&apos;t right in the directory — a phone
              number, an address, a missing entry — we&apos;d love to hear from you. Same if you&apos;re a
              regular visitor or a local who knows something we don&apos;t. The best version of this site
              gets built with the community, not just for it.
            </p>

            <p>
              You can reach us at{' '}
              <a
                href="mailto:hello@visitrhosneigr.wales"
                className="text-rockpool hover:underline"
              >
                hello@visitrhosneigr.wales
              </a>{' '}
              or via Instagram{' '}
              <a
                href="https://instagram.com/visitrhosneigr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rockpool hover:underline"
              >
                @visitrhosneigr
              </a>
              .
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
