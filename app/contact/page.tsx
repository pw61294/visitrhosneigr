import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Get in touch | ${siteConfig.domain}`;
  const description = "Get in touch with the Rhosneigr team — corrections, additions, or just to say hello.";
  const url = `${siteConfig.url}/contact`;
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
    { "@type": "ListItem" as const, position: 2, name: "Contact", item: `${siteConfig.url}/contact` },
  ],
};

export default function ContactPage() {
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
            <li className="text-slate-sea font-medium" aria-current="page">Contact</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-sea">
            Get in touch
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-prose">
          <p className="text-base text-slate-sea/80 leading-relaxed mb-8">
            Whether you run a business in the area and something in the directory needs correcting,
            you&apos;ve spotted something that&apos;s out of date, or you just want to say hello — we&apos;d love
            to hear from you.
          </p>

          {/* Email CTA */}
          <div className="mb-10">
            <a
              href="mailto:hello@visitrhosneigr.wales"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-rockpool text-white font-semibold text-base hover:bg-rockpool/90 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              hello@visitrhosneigr.wales
            </a>
          </div>

          {/* Instagram alternative */}
          <div className="flex items-start gap-4">
            <div>
              <p className="text-sm text-slate-sea/60 mb-1">Or reach out on Instagram</p>
              <a
                href="https://instagram.com/visitrhosneigr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rockpool hover:underline text-sm font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                </svg>
                @visitrhosneigr
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
