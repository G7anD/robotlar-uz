import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/lib/sanity/client";
import { categoriesQuery } from "@/lib/sanity/queries";
import { staticCategories, type Category } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kategoriyalar",
  description: "Robotlarni kategoriya bo'yicha ko'ring: sanoat, tibbiy, uy, humanoid va boshqalar.",
};

async function loadCategories(): Promise<Category[]> {
  const cats = await safeFetch<Category[]>(categoriesQuery, undefined, "kategoriyalar:list");
  return cats?.length ? cats : staticCategories;
}

export default async function KategoriyalarPage() {
  const categories = await loadCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>KATEGORIYALAR</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Robot Kategoriyalari</h1>
        <p className="max-w-2xl" style={{ opacity: 0.7 }}>
          Turli sohalarda qo&apos;llaniladigan robotlarni kategoriyalar bo&apos;yicha ko&apos;ring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/robotlar/${cat.slug}`}
            className="card-glow rounded-2xl p-8 border transition-all hover:-translate-y-1"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div className="text-5xl mb-4">{cat.emoji}</div>
            <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ opacity: 0.7 }}>{cat.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}>
                {cat.count} robot
              </span>
              <span className="text-sm" style={{ opacity: 0.5 }}>Ko&apos;rish →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
