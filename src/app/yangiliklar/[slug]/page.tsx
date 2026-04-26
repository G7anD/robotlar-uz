import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { safeFetch } from "@/lib/sanity/client";
import { newsArticleBySlugQuery, newsArticleSlugsQuery, newsArticlesQuery } from "@/lib/sanity/queries";
import { staticLatestNews, type NewsArticle } from "@/lib/data";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await safeFetch<{ slug: string }[]>(newsArticleSlugsQuery, undefined, "news:slugs");
  if (slugs?.length) return slugs.filter((s) => s.slug);
  return staticLatestNews.map((a) => ({ slug: a.slug }));
}

async function loadArticle(slug: string): Promise<NewsArticle | null> {
  const article = await safeFetch<NewsArticle | null>(newsArticleBySlugQuery, { slug }, "news:bySlug");
  return article ?? staticLatestNews.find((a) => a.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await loadArticle(slug);
  if (!article) notFound();

  const fetchedAll = await safeFetch<NewsArticle[]>(newsArticlesQuery, undefined, "news:related");
  const allArticles: NewsArticle[] = fetchedAll?.length ? fetchedAll : staticLatestNews;
  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/yangiliklar" className="inline-flex items-center gap-2 text-sm mb-8 hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
        ← Yangiliklarga qaytish
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}>
          {article.category}
        </span>
        <span className="text-xs" style={{ opacity: 0.4 }}>{article.readTime} daqiqa o&apos;qish</span>
        <span className="text-xs" style={{ opacity: 0.4 }}>
          {new Date(article.date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-6">{article.title}</h1>

      <div className="h-64 rounded-2xl flex items-center justify-center text-8xl mb-10 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
        {article.imageEmoji}
      </div>

      <div className="prose max-w-none space-y-5 leading-relaxed" style={{ opacity: 0.85 }}>
        <p className="text-lg">{article.excerpt}</p>
        <p>
          Robototexnika sohasidagi bu so&apos;nggi voqea sanoat ekspertlari tomonidan katta qiziqish bilan kutib olindi.
          Mutaxassislar bu yangilikni texnologiya rivojlanishidagi muhim qadam sifatida baholashmoqda.
        </p>
        <p>
          Keyingi yillarda robototexnika sohasidagi investitsiyalar keskin o&apos;sib bormoqda. Yetakchi texnologiya
          kompaniyalari avtomatlashtirish va sun&apos;iy intellekt sohasiga milliardlab dollar sarflamoqda.
        </p>
        <p>
          O&apos;zbekistonda ham ushbu texnologiyalarga qiziqish ortib bormoqda. Mahalliy muhandislar va tadqiqotchilar
          dunyo standartilarida raqobatbardosh mahsulotlar yaratish ustida ishlamoqda.
        </p>
        <div className="rounded-xl p-6 border my-8" style={{ background: "rgba(0,212,255,0.05)", borderColor: "rgba(0,212,255,0.15)" }}>
          <p className="text-sm italic" style={{ color: "var(--accent)", opacity: 0.9 }}>
            &ldquo;Bu sohadagi rivojlanish tezligi biz kutgandan ham yuqori. Kelgusi 5 yilda robotlar
            kundalik hayotimizning ajralmas qismiga aylanadi.&rdquo;
          </p>
          <p className="text-xs mt-2" style={{ opacity: 0.5 }}>— Robotika tadqiqotchisi</p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-bold mb-6">O&apos;xshash Maqolalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/yangiliklar/${r.slug}`} className="card-glow rounded-xl p-4 border transition-all hover:-translate-y-1" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-3">{r.imageEmoji}</div>
                <p className="text-sm font-medium leading-snug mb-2">{r.title}</p>
                <p className="text-xs" style={{ opacity: 0.5, color: "var(--accent)" }}>{r.category}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
