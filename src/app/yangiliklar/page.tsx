import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/lib/sanity/client";
import { newsArticlesQuery } from "@/lib/sanity/queries";
import { staticLatestNews, type NewsArticle } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Yangiliklar",
  description: "Dunyo robototexnikasidagi eng so'nggi yangiliklar, tahlillar va tadqiqotlar.",
};

async function getNews(): Promise<NewsArticle[]> {
  const data = await safeFetch<NewsArticle[]>(newsArticlesQuery, undefined, "news:list");
  return data?.length ? data : staticLatestNews;
}

export default async function YangilikPage() {
  const articles = await getNews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>YANGILIKLAR</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Robototexnika Yangiliklari</h1>
        <p className="max-w-2xl" style={{ opacity: 0.7 }}>
          Dunyo bo&apos;ylab robotika, sun&apos;iy intellekt va texnologiya sohasidagi eng so&apos;nggi yangiliklar.
          Har kuni yangilanib turadi.
        </p>
      </div>

      {articles.length > 0 && (
        <div className="mb-12">
          <Link
            href={`/yangiliklar/${articles[0].slug}`}
            className="card-glow grid md:grid-cols-2 rounded-2xl border overflow-hidden transition-all hover:-translate-y-1"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div
              className="h-64 md:h-auto flex items-center justify-center text-8xl"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {articles[0].imageEmoji}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}>
                  {articles[0].category}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.08)", opacity: 0.6 }}>
                  Tanlangan
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">{articles[0].title}</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>{articles[0].excerpt}</p>
              <p className="text-xs" style={{ opacity: 0.4 }}>
                {new Date(articles[0].date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
                {" · "}{articles[0].readTime} daqiqa o&apos;qish
              </p>
            </div>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1).map((article) => (
          <Link
            key={article.id}
            href={`/yangiliklar/${article.slug}`}
            className="card-glow rounded-2xl border overflow-hidden transition-all hover:-translate-y-1"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div className="h-40 flex items-center justify-center text-6xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              {article.imageEmoji}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}>
                  {article.category}
                </span>
                <span className="text-xs" style={{ opacity: 0.4 }}>{article.readTime} daqiqa</span>
              </div>
              <h3 className="font-semibold leading-snug mb-2">{article.title}</h3>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{article.excerpt}</p>
              <p className="text-xs mt-3" style={{ opacity: 0.4 }}>
                {new Date(article.date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
