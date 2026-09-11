"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = scrolled || !isHomepage;

  const wordmarkColor = isSolid ? "text-slate-sea" : "text-white";
  const navLinkColor = isSolid
    ? "text-slate-sea/70 hover:text-slate-sea"
    : "text-white/80 hover:text-white";
  const iconColor = isSolid ? "#2C3E50" : "#ffffff";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolid
          ? "bg-sand/95 backdrop-blur-sm border-b border-driftwood/30"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Wordmark + tagline group */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-baseline gap-0 shrink-0">
            <span
              className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${wordmarkColor}`}
            >
              visitrhosneigr
            </span>
            <span className={`text-2xl md:text-3xl font-bold tracking-tight ${isSolid ? "text-rockpool" : "text-emerald-400"}`}>
              .wales
            </span>
          </Link>
          {!isSolid && (
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/40 hidden md:block">
              EXPLORE · EAT · STAY · DO · LOCAL
            </span>
          )}
        </div>

        {/* Desktop nav */}
        {navLinks.length > 0 && (
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors ${navLinkColor}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right icons — search + hamburger */}
        <div className="flex items-center gap-3">
          {!isSolid && (
            <button aria-label="Search" className="p-2 -mr-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          {/* Mobile menu button — always visible on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && navLinks.length > 0 && (
        <nav className="lg:hidden border-t border-driftwood/30 bg-sand">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base font-medium text-slate-sea/80 hover:text-slate-sea transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
