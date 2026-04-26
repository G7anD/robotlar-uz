import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { robotBySlugQuery, robotSlugsQuery, categoriesQuery } from "@/lib/sanity/queries";
import { staticFeaturedRobots, staticCategories, type RobotProfile, type Category } from "@/lib/data";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string; categorySlug: string }[]>(robotSlugsQuery);
    if (slugs?.length) return slugs.map((s) => ({ category: s.categorySlug, slug: s.slug }));
  } catch {}
  return staticFeaturedRobots.map((r) => ({ category: r.categorySlug, slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const robot = await client.fetch<RobotProfile | null>(robotBySlugQuery, { slug });
    if (robot) return { title: `${robot.name} — ${robot.manufacturer}`, description: robot.description };
  } catch {}
  const robot = staticFeaturedRobots.find((r) => r.slug === slug);
  if (!robot) return {};
  return { title: `${robot.name} — ${robot.manufacturer}`, description: robot.description };
}

export default async function RobotDetailPage({ params }: Props) {
  const { category, slug } = await params;

  let robot: RobotProfile | null = null;
  let cat: Category | undefined;
  let related: RobotProfile[] = [];

  try {
    robot = await client.fetch<RobotProfile | null>(robotBySlugQuery, { slug });
    if (robot) {
      const cats = await client.fetch<Category[]>(categoriesQuery);
      cat = cats?.find((c) => c.slug === category);
      const { robotsByCategoryQuery } = await import("@/lib/sanity/queries");
      const allInCat = await client.fetch<RobotProfile[]>(robotsByCategoryQuery, { categorySlug: category });
      related = allInCat.filter((r) => r.id !== robot!.id).slice(0, 3);
    }
  } catch {}

  if (!robot) {
    robot = staticFeaturedRobots.find((r) => r.slug === slug && r.categorySlug === category) ?? null;
    cat = staticCategories.find((c) => c.slug === category);
    related = staticFeaturedRobots.filter((r) => r.categorySlug === category && r.id !== robot?.id).slice(0, 3);
  }
  if (!robot) notFound();

  const specs = robot.specs ?? [
    { label: "Ishlab chiqaruvchi", value: robot.manufacturer },
    { label: "Yaratilgan yil", value: robot.year.toString() },
    { label: "Kategoriya", value: robot.category },
    { label: "Status", value: "Aktiv" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href={`/robotlar/${category}`} className="inline-flex items-center gap-2 text-sm mb-8 hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
        ← {cat?.name ?? "Robotlar"}ga qaytish
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="rounded-3xl flex items-center justify-center h-64 md:h-auto text-9xl border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          {robot.emoji}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>
              {robot.category}
            </span>
            {robot.featured && (
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}>
                Tanlangan
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{robot.name}</h1>
          <p className="text-xl mb-6" style={{ opacity: 0.6 }}>{robot.manufacturer}</p>
          <p className="leading-relaxed mb-6" style={{ opacity: 0.8 }}>{robot.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {specs.map(({ label, value }) => (
              <div key={label} className="rounded-xl p-4 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <p className="text-xs mb-1" style={{ opacity: 0.5 }}>{label}</p>
                <p className="font-semibold text-sm" style={{ color: "var(--accent)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-8 border mb-12" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
        <h2 className="text-xl font-bold mb-4">Batafsil Ma&apos;lumot</h2>
        <div className="space-y-4 leading-relaxed" style={{ opacity: 0.8 }}>
          <p>{robot.description}</p>
          <p>
            {robot.manufacturer} kompaniyasi tomonidan yaratilgan {robot.name} roboti {robot.year} yildan beri
            faoliyat yuritmoqda. Ushbu robot o&apos;z sohasida yetakchi texnologik yechimlardan biri hisoblanadi.
          </p>
          <p>
            Zamonaviy sensorlar, ilg&apos;or AI algoritmlari va mustahkam mexanik tuzilma bilan jihozlangan bu robot
            murakkab vazifalarni mustaqil bajarish qobiliyatiga ega.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">O&apos;xshash Robotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/robotlar/${r.categorySlug}/${r.slug}`} className="card-glow rounded-xl p-5 border transition-all hover:-translate-y-1" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="text-4xl mb-3">{r.emoji}</div>
                <h3 className="font-bold mb-1">{r.name}</h3>
                <p className="text-sm" style={{ opacity: 0.6 }}>{r.manufacturer}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
