"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { awesomeRobots, categories, type AwesomeRobot } from "@/lib/awesome-robots";

const formatColors: Record<string, string> = {
  URDF: "rgba(0,212,255,0.15)",
  MJCF: "rgba(124,58,237,0.15)",
  Xacro: "rgba(16,185,129,0.15)",
  COLLADA: "rgba(245,158,11,0.15)",
  VRML: "rgba(239,68,68,0.15)",
  SDF: "rgba(251,146,60,0.15)",
};

const formatTextColors: Record<string, string> = {
  URDF: "#00d4ff",
  MJCF: "#a78bfa",
  Xacro: "#34d399",
  COLLADA: "#fbbf24",
  VRML: "#f87171",
  SDF: "#fb923c",
};

function RobotCard({ robot }: { robot: AwesomeRobot }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={robot.github_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glow rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 flex flex-col"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {/* Image */}
      <div
        className="relative w-full h-44 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {robot.galleryImage && !imgError ? (
          <Image
            src={robot.galleryImage}
            alt={robot.name}
            fill
            className="object-contain p-3"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 opacity-30">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <span className="text-xs">3D model</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm leading-tight">{robot.name}</h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full shrink-0"
            style={{ background: "rgba(0,212,255,0.08)", color: "var(--accent)" }}
          >
            {robot.categoryUz}
          </span>
        </div>

        {robot.manufacturer && (
          <p className="text-xs" style={{ opacity: 0.6 }}>{robot.manufacturer}</p>
        )}

        {/* Formats */}
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {robot.formats.map((fmt) => (
            <span
              key={fmt}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: formatColors[fmt] ?? "rgba(255,255,255,0.05)",
                color: formatTextColors[fmt] ?? "var(--foreground)",
              }}
            >
              {fmt}
            </span>
          ))}
          {robot.license && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", opacity: 0.6 }}
            >
              {robot.license}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export default function RobotGallery() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return awesomeRobots.filter((r) => {
      const matchCat = activeCategory === "all" || r.category === activeCategory;
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.manufacturer?.toLowerCase().includes(q) ?? false) ||
        r.formats.some((f) => f.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const withImage = filtered.filter((r) => r.galleryImage).length;

  return (
    <div>
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Robot nomi, ishlab chiqaruvchi, format..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-cyan-400"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
        <div className="text-xs self-center" style={{ opacity: 0.5 }}>
          {filtered.length} robot · {withImage} ta rasm
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
          style={
            activeCategory === "all"
              ? { background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }
              : { background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--foreground)", opacity: 0.7 }
          }
        >
          Hammasi ({awesomeRobots.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={
              activeCategory === cat.name
                ? { background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }
                : { background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--foreground)", opacity: 0.7 }
            }
          >
            {cat.nameUz} ({cat.count})
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 opacity-40">
          <p className="text-lg">Hech narsa topilmadi</p>
          <p className="text-sm mt-2">Boshqa kalit so&apos;z bilan qidiring</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((robot) => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      )}

      {/* Source attribution */}
      <div className="mt-12 pt-8 border-t text-center text-xs" style={{ borderColor: "var(--border)", opacity: 0.4 }}>
        Ma&apos;lumot manbasi:{" "}
        <a
          href="https://github.com/robot-descriptions/awesome-robot-descriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 underline"
        >
          awesome-robot-descriptions
        </a>
      </div>
    </div>
  );
}
