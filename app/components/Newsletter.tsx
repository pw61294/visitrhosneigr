"use client";

import Image from "next/image";
import KitForm from "./KitForm";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        {/* Full-bleed rounded container */}
        <div className="relative rounded-2xl overflow-hidden">

          {/* Background photo */}
          <div className="absolute inset-0">
            <Image
              src="/images/coastal-gem-large.jpg"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
            {/* Teal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-rockpool/75 via-rockpool/55 to-rockpool/75" />
          </div>

          {/* Top border line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rockpool to-sunset z-10" />

          {/* Left tagline */}
          <div className="absolute top-8 left-8 md:left-12 z-10">
            <p className="font-handwriting text-white text-xl md:text-2xl font-semibold leading-none">
              Stay connected
            </p>
            <svg
              className="mt-1"
              width="70"
              height="8"
              viewBox="0 0 70 8"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 5C10 3 20 2 35 4C50 6 60 5 68 3"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Right tagline */}
          <div className="absolute top-8 right-8 md:right-12 z-10 text-right">
            <p className="font-handwriting text-white/85 text-xl md:text-2xl font-semibold leading-none">Same waves.</p>
            <p className="font-handwriting text-white/85 text-xl md:text-2xl font-semibold leading-none ml-2">New stories.</p>
            <p className="font-handwriting text-white/85 text-xl md:text-2xl font-semibold leading-none ml-4">Every week.</p>
            <svg
              className="mt-1 ml-auto"
              width="90"
              height="8"
              viewBox="0 0 90 8"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 5C15 3 30 2 45 4C60 6 72 5 88 3"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 pt-24 md:pt-28">
            <div className="md:flex md:items-center md:justify-between md:gap-12">
              <div className="md:flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Get the latest from Rhosneigr
                </h2>
                <p className="mt-2 text-base text-white/80 leading-relaxed max-w-md">
                  Be the first to know about local events, new listings,
                  surf conditions and special offers. No spam, ever.
                </p>
              </div>

              <div className="mt-6 md:mt-0 md:flex-1 md:max-w-md">
                <KitForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
