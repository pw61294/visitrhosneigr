import { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { directoryCategories, guides } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = "https://visitrhosneigr.wales";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/directory`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Guide pages
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE}${guide.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: guide.href === "/guides/things-to-do" ? 0.8 : 0.7,
  }));

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = directoryCategories.map((cat) => ({
    url: `${BASE}/directory/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Individual listing pages
  const { data: places } = await supabaseAdmin
    .from("rhosneigr_places")
    .select("slug, category, updated_at");

  const listingRoutes: MetadataRoute.Sitemap = (places ?? []).map((place) => ({
    url: `${BASE}/directory/${place.category}/${place.slug}`,
    lastModified: place.updated_at ? new Date(place.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: place.category === "stay" ? 0.7 : 0.6,
  }));

  return [...staticRoutes, ...guideRoutes, ...categoryRoutes, ...listingRoutes];
}
