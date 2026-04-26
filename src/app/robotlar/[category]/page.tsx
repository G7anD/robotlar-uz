import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { categoriesQuery, categorySlugsQuery, robotsByCategoryQuery } from "@/lib/sanity/queries";
import { staticCategories, staticFeaturedRobots, type Category, type RobotProfile } from "@/lib/data";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(categorySlugsQuery);
    if (slugs?.length) return slugs.map((s) => ({ category: s.slug }));
  } catch {}
  return staticCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  try {
    const cats = await client.fetch<Category[]>(categoriesQuery);
    const cat = cats?.find((c) => c.slug === category);
    if (cat) return { title: cat.name, description: cat.description };
  } catch {}
  const cat = staticCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  let cat: Category | undefined;
  let robots: RobotProfile[] = [];

  try {
    const cats = await client.fetch<Category[]>(categoriesQuery);
    cat = cats?.find((c) => c.slug === category);
    if (cat) {
      robots = await client.fetch<RobotProfile[]>(robotsByCategoryQuery, { categorySlug: category });
    }
  } catch {}

  if (!cat) {
    cat = staticCategories.find((c) => c.slug === category);
    robots = staticFeaturedRobots.filter((r) => r.categorySlug === category);
  }
  if (!cat) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/robotlar" className="inline-flex items-center gap-2 text-sm mb-8 hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
        ← Robot Katalogiga qaytish
      </Link>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: "rgba(0,212,255,0.08)" }}>
          {cat.emoji}
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--accent)" }}>KATEGORIYA</p>
          <h1 className="text-2xl md:text-3xl font-bold">{cat.name}</h1>
        </div>
      </div>
      <p className="mb-12 max-w-2xl" style={{ opacity: 0.7 }}>{cat.description}</p>

      {robots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {robots.map((robot) => (
            <Link
              key={robot.id}
              href={`/robotlar/${robot.categorySlug}/${robot.slug}`}
              className="card-glow rounded-2xl p-6 border transition-all hover:-translate-y-1"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4" style={{ background: "rgba(0,212,255,0.08)" }}>
                {robot.emoji}
              </div>
              <h3 className="font-bold text-lg mb-1">{robot.name}</h3>
              <p className="text-sm mb-3" style={{ opacity: 0.6 }}>{robot.manufacturer} · {robot.year}</p>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{robot.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl p-12 text-center border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <div className="text-5xl mb-4">{cat.emoji}</div>
          <p className="text-lg font-medium mb-2">Tez orada!</p>
          <p style={{ opacity: 0.6 }}>Bu kategoriya uchun {cat.count} ta robot profili tayyorlanmoqda.</p>
        </div>
      )}
    </div>
  );
}
