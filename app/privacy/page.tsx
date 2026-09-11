import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Privacy policy | ${siteConfig.domain}`;
  const description = "How Rhosneigr uses and protects any data collected on this website.";
  const url = `${siteConfig.url}/privacy`;
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
    { "@type": "ListItem" as const, position: 2, name: "Privacy", item: `${siteConfig.url}/privacy` },
  ],
};

export default function PrivacyPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Privacy policy</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-sea">
            Privacy policy
          </h1>
          <p className="mt-2 text-sm text-slate-sea/50">Last updated: 10 September 2026</p>
        </div>

        {/* Content */}
        <div className="max-w-prose">
          <div className="text-base text-slate-sea/80 leading-relaxed space-y-5">

            <h2 className="text-xl font-semibold text-slate-sea mt-8">What we collect</h2>
            <p>
              You can browse the Rhosneigr directory and read all content on this website without
              providing any personal information. We do not require registration or sign-up to use the site.
            </p>
            <p>
              If and when a newsletter or mailing list is introduced (planned for a future update),
              we will only collect email addresses provided voluntarily by subscribers, and will only
              use them for the stated purpose of sending updates about Rhosneigr.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Cookies</h2>
            <p>
              This site does not currently use tracking cookies, analytics, or any third-party
              tracking technology. When you browse the site, no personal data is collected about your
              visit.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Third-party services</h2>
            <p>This site uses the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Vercel</strong> — hosting and edge delivery. Vercel may log standard
                server-side request data in accordance with their privacy policy.
              </li>
              <li>
                <strong>Supabase</strong> — database for the business directory. Business
                listing data (names, addresses, ratings) is stored and served via Supabase.
              </li>
              <li>
                <strong>Google Places API</strong> — used to source and refresh business
                listing data. Google may log API requests in accordance with Google&apos;s privacy
                policy.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Directory data accuracy</h2>
            <p>
              Business information in the directory — including names, addresses, phone numbers,
              websites, and ratings — is sourced from publicly available Google Places data and
              supplemented with manual additions. While we make reasonable efforts to keep
              information current, we cannot guarantee that all listings are accurate or up to date.
              We recommend verifying details directly with the business before visiting or making
              bookings.
            </p>
            <p>
              If you are a business owner and believe your listing contains inaccurate information,
              please contact us at{' '}
              <a href="mailto:hello@visitrhosneigr.wales" className="text-rockpool hover:underline">
                hello@visitrhosneigr.wales
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Contact</h2>
            <p>
              If you have any questions about this privacy policy or how we handle data, please
              contact us at{' '}
              <a href="mailto:hello@visitrhosneigr.wales" className="text-rockpool hover:underline">
                hello@visitrhosneigr.wales
              </a>
              .
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
