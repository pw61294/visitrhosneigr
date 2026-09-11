import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const alt = "Rhosneigr — Anglesey's surf village";
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          position: "relative",
          background: "#0d2137",
        }}
      >
        {/* Background image — inline SVG data URL avoids build-time fetch */}
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231a4d7a'/%3E%3Cstop offset='60%25' stop-color='%232d6fa3'/%3E%3Cstop offset='100%25' stop-color='%233a8fbf'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='630' fill='url(%23g)'/%3E%3Ccircle cx='900' cy='200' r='250' fill='%2345a9d4' opacity='0.15'/%3E%3Ccircle cx='1100' cy='50' r='350' fill='%2345a9d4' opacity='0.1'/%3E%3C/svg%3E"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(13,33,55,0.3) 0%, rgba(13,33,55,0.88) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "60px 72px",
            gap: "16px",
          }}
        >
          {/* Site name */}
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: "88px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-2px",
                lineHeight: 1,
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              visitrhosneigr
            </span>
            <span
              style={{
                fontSize: "88px",
                fontWeight: 700,
                color: "#3ec6a0",
                letterSpacing: "-2px",
                lineHeight: 1,
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              .wales
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.3px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Wind, waves, wide beaches and a laid-back village
          </span>

          {/* Sub-location */}
          <span
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              marginTop: "6px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Anglesey, Wales
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
