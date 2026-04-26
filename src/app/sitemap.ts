import type { MetadataRoute } from "next";
import { safeFetch } from "@/lib/sanity/client";
import {
  sitemapCategoriesQuery,
  sitemapNewsQuery,
  sitemapRobotsQuery,
} from "@/lib/sanity/queries";
import { latestNews, featuredRobots, categories } from "@/lib/data";

const BASE_URL = "https://robotlar.uz";

type SitemapNews = { slug: string | null; date: string | null };
type SitemapRobot = { slug: string | null; categorySlug: string | null; updatedAt: string | null };
type SitemapCategory = { slug: string | null; updatedAt: string | null };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/yangiliklar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/robotlar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kategoriyalar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/galereya`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/biz-haqimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/boglanish`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const [sanityNews, sanityRobots, sanityCategories] = await Promise.all([
    safeFetch<SitemapNews[]>(sitemapNewsQuery, undefined, "sitemap:news"),
    safeFetch<SitemapRobot[]>(sitemapRobotsQuery, undefined, "sitemap:robots"),
    safeFetch<SitemapCategory[]>(sitemapCategoriesQuery, undefined, "sitemap:categories"),
  ]);

  const newsSource =
    sanityNews && sanityNews.length > 0
      ? sanityNews
          .filter((n): n is { slug: string; date: string | null } => Boolean(n.slug))
          .map((n) => ({ slug: n.slug, date: n.date ?? new Date().toISOString() }))
      : latestNews.map((a) => ({ slug: a.slug, date: a.date }));

  const newsRoutes: MetadataRoute.Sitemap = newsSource.map((a) => ({
    url: `${BASE_URL}/yangiliklar/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categorySource =
    sanityCategories && sanityCategories.length > 0
      ? sanityCategories
          .filter((c): c is { slug: string; updatedAt: string | null } => Boolean(c.slug))
          .map((c) => ({ slug: c.slug, updatedAt: c.updatedAt }))
      : categories.map((c) => ({ slug: c.slug, updatedAt: null }));

  const categoryRoutes: MetadataRoute.Sitemap = categorySource.map((c) => ({
    url: `${BASE_URL}/robotlar/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const robotSource =
    sanityRobots && sanityRobots.length > 0
      ? sanityRobots
          .filter(
            (r): r is { slug: string; categorySlug: string; updatedAt: string | null } =>
              Boolean(r.slug && r.categorySlug),
          )
          .map((r) => ({ slug: r.slug, categorySlug: r.categorySlug, updatedAt: r.updatedAt }))
      : featuredRobots.map((r) => ({ slug: r.slug, categorySlug: r.categorySlug, updatedAt: null }));

  const robotRoutes: MetadataRoute.Sitemap = robotSource.map((r) => ({
    url: `${BASE_URL}/robotlar/${r.categorySlug}/${r.slug}`,
    lastModified: r.updatedAt ? new Date(r.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...categoryRoutes, ...robotRoutes];
}
