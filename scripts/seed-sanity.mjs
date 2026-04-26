#!/usr/bin/env node
/**
 * Seed script: imports static data from src/lib/data.ts into Sanity.
 *
 * Required env: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN (write).
 * Optional: NEXT_PUBLIC_SANITY_DATASET (default "production"),
 *           NEXT_PUBLIC_SANITY_API_VERSION (default "2024-01-01").
 *
 * Usage: node scripts/seed-sanity.mjs [--reset]
 *   --reset  Delete existing seeded docs (category, robotProfile, newsArticle
 *            with _id starting with "seed.") before re-importing.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
  process.exit(1);
}
if (!token) {
  console.error("ERROR: SANITY_API_TOKEN is not set (needs write access).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataTsPath = resolve(__dirname, "../src/lib/data.ts");

function extractArrayLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Could not find ${exportName} in data.ts`);
  const eq = source.indexOf("=", start);
  const arrStart = source.indexOf("[", eq);
  let depth = 0;
  let i = arrStart;
  for (; i < source.length; i++) {
    const c = source[i];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const literal = source.slice(arrStart, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const reset = process.argv.includes("--reset");

async function main() {
  console.log(`Seeding into ${projectId}/${dataset} ...`);
  const dataSource = readFileSync(dataTsPath, "utf8");

  const categories = extractArrayLiteral(dataSource, "staticCategories");
  const robots = extractArrayLiteral(dataSource, "staticFeaturedRobots");
  const news = extractArrayLiteral(dataSource, "staticLatestNews");

  if (reset) {
    console.log("Deleting existing seeded docs ...");
    await client.delete({ query: '*[_id in path("seed.**")]' });
  }

  // Categories
  const categoryIdBySlug = new Map();
  for (const c of categories) {
    const _id = `seed.category.${c.slug}`;
    categoryIdBySlug.set(c.slug, _id);
    await client.createOrReplace({
      _id,
      _type: "category",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      emoji: c.emoji,
      description: c.description,
    });
    console.log(`  category: ${c.slug}`);
  }

  // Robots
  for (const r of robots) {
    const _id = `seed.robot.${r.slug}`;
    const categoryRef = categoryIdBySlug.get(r.categorySlug);
    await client.createOrReplace({
      _id,
      _type: "robotProfile",
      name: r.name,
      slug: { _type: "slug", current: r.slug },
      manufacturer: r.manufacturer,
      category: r.category,
      ...(categoryRef ? { categoryRef: { _type: "reference", _ref: categoryRef } } : {}),
      year: r.year,
      description: r.description,
      emoji: r.emoji,
      featured: !!r.featured,
    });
    console.log(`  robot: ${r.slug}`);
  }

  // Default seed author
  const seedAuthorId = "seed.author.robotlar-uz";
  await client.createOrReplace({
    _id: seedAuthorId,
    _type: "author",
    name: "Robotlar.uz",
    slug: { _type: "slug", current: "robotlar-uz" },
    bio: "Robotlar.uz tahririyati.",
  });

  // News
  for (const n of news) {
    const _id = `seed.news.${n.slug}`;
    await client.createOrReplace({
      _id,
      _type: "newsArticle",
      title: n.title,
      slug: { _type: "slug", current: n.slug },
      excerpt: n.excerpt,
      category: n.category,
      imageEmoji: n.imageEmoji,
      publishedAt: new Date(n.date).toISOString(),
      readTime: n.readTime,
      featured: !!n.featured,
      author: { _type: "reference", _ref: seedAuthorId },
    });
    console.log(`  news: ${n.slug}`);
  }

  console.log(
    `Done. categories=${categories.length} robots=${robots.length} news=${news.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
