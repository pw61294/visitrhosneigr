import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Terms of use | ${siteConfig.domain}`;
  const description = "Terms and conditions for using the Rhosneigr website and directory.";
  const url = `${siteConfig.url}/terms`;
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
    { "@type": "ListItem" as const, position: 2, name: "Terms", item: `${siteConfig.url}/terms` },
  ],
};

export default function TermsPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Terms of use</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-sea">
            Terms of use
          </h1>
          <p className="mt-2 text-sm text-slate-sea/50">Last updated: 10 September 2026</p>
        </div>

        {/* Content */}
        <div className="max-w-prose">
          <div className="text-base text-slate-sea/80 leading-relaxed space-y-5">

            <h2 className="text-xl font-semibold text-slate-sea mt-8">General information</h2>
            <p>
              The Rhosneigr website is provided as a guide to local businesses, attractions,
              and services in and around Rhosneigr and Anglesey&apos;s west coast. All information
              on this site is provided in good faith, but is given without any guarantee of
              accuracy, completeness, or timeliness.
            </p>
            <p>
              Opening hours, prices, contact details, ratings, and availability change frequently
              and are outside our control. We strongly recommend verifying information directly
              with the relevant business before visiting, making bookings, or making decisions
              based on directory content.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">External links</h2>
            <p>
              The site may contain links to third-party websites, including business websites
              and booking platforms. These links are provided for convenience only. Inclusion
              of a link does not imply endorsement or affiliation. We are not responsible for
              the content, privacy practices, or any transactions that occur on third-party sites.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Directory listings</h2>
            <p>
              Business listings are sourced primarily from publicly available Google Places data
              and supplemented with manually added entries. While we aim to keep the directory
              accurate and up to date, we cannot guarantee that all information is current or
              correct at any given time.
            </p>
            <p>
              Business owners wishing to correct inaccurate information, or to request the
              removal of a listing, may contact us at{' '}
              <a href="mailto:hello@visitrhosneigr.wales" className="text-rockpool hover:underline">
                hello@visitrhosneigr.wales
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Limitation of liability</h2>
            <p>
              Rhosneigr and its operators shall not be held liable for any loss, injury,
              or disappointment arising from reliance on information provided on this website.
              This includes, but is not limited to, decisions made about where to eat, stay,
              or spend time, based on directory listings or editorial content.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Content and photography</h2>
            <p>
              All content and photography on this website is the property of Rhosneigr or
              used with appropriate rights. Unauthorized reproduction, copying, or distribution
              of site content without prior written consent is not permitted.
            </p>

            <h2 className="text-xl font-semibold text-slate-sea mt-8">Contact</h2>
            <p>
              If you have any questions about these terms, please contact us at{' '}
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
