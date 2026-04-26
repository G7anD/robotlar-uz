import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/lib/sanity/client";
import { categoriesQuery, featuredRobotsQuery } from "@/lib/sanity/queries";
import {
  staticCategories,
  staticFeaturedRobots,
  type Category,
  type RobotProfile,
} from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Robot Katalogi",
  description: "500+ robot profili bilan dunyo robototekasining to'liq katalogi.",
};

async function loadData() {
  const [cats, robots] = await Promise.all([
    safeFetch<Category[]>(categoriesQuery, undefined, "robotlar:categories"),
    safeFetch<RobotProfile[]>(featuredRobotsQuery, undefined, "robotlar:featured"),
  ]);
  return {
    categories: cats?.length ? cats : staticCategories,
    featuredRobots: robots?.length ? robots : staticFeaturedRobots,
  };
}

export default async function RobotlarPage() {
  const { categories, featuredRobots } = await loadData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>KATALOG</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Robot Katalogi</h1>
        <p className="max-w-2xl" style={{ opacity: 0.7 }}>
          Sanoat, tibbiy, uy va boshqa sohalardagi 500+ robot profili.
          Har bir robot haqida batafsil ma&apos;lumot va xususiyatlar.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-6">Kategoriyalar bo&apos;yicha</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/robotlar/${cat.slug}`}
              className="card-glow rounded-xl p-5 text-center transition-all hover:-translate-y-1 border"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <div className="text-sm font-medium mb-1">{cat.name}</div>
              <div className="text-xs" style={{ opacity: 0.5 }}>{cat.count} robot</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured robots */}
      <div>
        <h2 className="text-xl font-bold mb-6">Tanlangan Robotlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRobots.map((robot) => (
            <Link
              key={robot.id}
              href={`/robotlar/${robot.categorySlug}/${robot.slug}`}
              className="card-glow rounded-2xl p-6 border transition-all hover:-translate-y-1"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: "rgba(0,212,255,0.08)" }}
                >
                  {robot.emoji}
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}
                >
                  {robot.category}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{robot.name}</h3>
              <p className="text-sm mb-3" style={{ opacity: 0.6 }}>
                {robot.manufacturer} · {robot.year}
              </p>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{robot.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
