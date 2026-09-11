import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-sea text-white/80">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline">
              <span className="text-xl font-bold text-white">
                visitrhosneigr
              </span>
              <span className="text-xl font-bold text-rockpool">.wales</span>
            </Link>
            <p className="mt-2 text-sm text-white/50">
              Rhosneigr · Anglesey · Wales
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/directory"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Directory
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
              </svg>
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-white/40">
            © {year} visitrhosneigr.wales. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Photos: Google
          </p>
        </div>
      </div>
    </footer>
  );
}
