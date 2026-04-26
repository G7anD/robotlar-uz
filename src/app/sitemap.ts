import type { MetadataRoute } from "next";
import { latestNews, featuredRobots, categories } from "@/lib/data";

const BASE_URL = "https://robotlar.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/yangiliklar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/robotlar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kategoriyalar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/biz-haqimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/boglanish`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = latestNews.map((a) => ({
    url: `${BASE_URL}/yangiliklar/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/robotlar/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const robotRoutes: MetadataRoute.Sitemap = featuredRobots.map((r) => ({
    url: `${BASE_URL}/robotlar/${r.categorySlug}/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...categoryRoutes, ...robotRoutes];
}
