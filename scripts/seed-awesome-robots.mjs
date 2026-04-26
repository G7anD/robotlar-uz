#!/usr/bin/env node
/**
 * Seed script: imports awesome-robot-descriptions catalog into Sanity.
 *
 * Reads src/lib/awesome-robots.ts and writes one robotProfile per item
 * (with source="awesome-robots") plus a category document per Uzbek
 * category name. Idempotent: uses deterministic _id per slug, so re-runs
 * overwrite the existing docs.
 *
 * Required env: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN (write).
 *
 * Usage: node scripts/seed-awesome-robots.mjs [--reset]
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(__dirname, "../src/lib/awesome-robots.ts");

function categoryToSlug(categoryEn) {
  return `aw-${categoryEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

const categoryEmojiMap = {
  Arms: "🦾",
  Bipeds: "🦿",
  "Dual Arms": "🤲",
  Drones: "🚁",
  Educational: "🎓",
  "End Effectors": "✊",
  Humanoids: "🤖",
  "Mobile Manipulators": "🛻",
  Quadrupeds: "🐕",
  Wheeled: "🛞",
};

function loadAwesomeRobots() {
  const src = readFileSync(sourcePath, "utf8");
  // Locate the array literal after `export const awesomeRobots: AwesomeRobot[] = [`
  const marker = "export const awesomeRobots";
  const start = src.indexOf(marker);
  if (start === -1) throw new Error("awesomeRobots export not found");
  const eq = src.indexOf("=", start);
  const arrStart = src.indexOf("[", eq);
  let depth = 0;
  let i = arrStart;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const literal = src.slice(arrStart, i);
  // Replace categoryUzMap[...] lookups with their resolved values, since the
  // literal references a const map that does not exist in our isolated eval.
  // Build the map from the source itself.
  const mapMatch = src.match(/const categoryUzMap[^=]*=\s*({[\s\S]*?});/);
  if (!mapMatch) throw new Error("categoryUzMap not found");
  // eslint-disable-next-line no-new-func
  const categoryUzMap = Function(`"use strict"; return (${mapMatch[1]});`)();
  const replaced = literal.replace(/categoryUzMap\["([^"]+)"\]/g, (_, k) =>
    JSON.stringify(categoryUzMap[k] ?? k),
  );
  // Replace galleryUrl(...) helper calls with the inlined URL.
  const baseMatch = src.match(/const GALLERY_BASE\s*=\s*"([^"]+)"/);
  if (!baseMatch) throw new Error("GALLERY_BASE not found");
  const base = baseMatch[1];
  const replaced2 = replaced.replace(/galleryUrl\("([^"]+)"\)/g, (_, f) =>
    JSON.stringify(`${base}/${f}`),
  );
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${replaced2});`)();
}

const reset = process.argv.includes("--reset");

async function main() {
  console.log(`Seeding awesome-robots into ${projectId}/${dataset} ...`);
  const robots = loadAwesomeRobots();
  console.log(`  loaded ${robots.length} robots from source`);

  if (reset) {
    console.log("Deleting existing awesome-robot docs ...");
    await client.delete({ query: '*[_id in path("seed.aw.**")]' });
    await client.delete({ query: '*[_id in path("seed.category.aw-**")]' });
  }

  // Build category docs from unique English categories.
  const seenCategories = new Map();
  for (const r of robots) {
    if (!seenCategories.has(r.category)) {
      seenCategories.set(r.category, r.categoryUz);
    }
  }

  const categoryIdByEn = new Map();
  for (const [en, uz] of seenCategories) {
    const slug = categoryToSlug(en);
    const _id = `seed.category.${slug}`;
    categoryIdByEn.set(en, _id);
    await client.createOrReplace({
      _id,
      _type: "category",
      name: uz,
      slug: { _type: "slug", current: slug },
      emoji: categoryEmojiMap[en] || "🤖",
      description: `${uz} (${en}) — awesome-robot-descriptions katalogidan.`,
    });
  }
  console.log(`  ${seenCategories.size} categories upserted`);

  // Robots
  let written = 0;
  for (const r of robots) {
    const slug = `aw-${r.id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
    const _id = `seed.aw.${slug}`;
    const categoryRef = categoryIdByEn.get(r.category);
    await client.createOrReplace({
      _id,
      _type: "robotProfile",
      name: r.name,
      slug: { _type: "slug", current: slug },
      manufacturer: r.manufacturer || "—",
      category: r.categoryUz,
      ...(categoryRef ? { categoryRef: { _type: "reference", _ref: categoryRef } } : {}),
      year: 0,
      description: `${r.name}${r.manufacturer ? ` — ${r.manufacturer}` : ""}. ${r.formats?.join("/")} model.`,
      emoji: categoryEmojiMap[r.category] || "🤖",
      featured: false,
      source: "awesome-robots",
      formats: r.formats || [],
      ...(r.license ? { license: r.license } : {}),
      ...(r.github_url ? { githubUrl: r.github_url } : {}),
      ...(r.galleryImage ? { galleryImageUrl: r.galleryImage } : {}),
    });
    written++;
    if (written % 25 === 0) console.log(`  ... ${written}/${robots.length}`);
  }

  console.log(`Done. categories=${seenCategories.size} robots=${written}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
