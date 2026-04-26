import { createClient } from "@sanity/client";
import crypto from "crypto";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function checkDuplicates(articles) {
  const sourceIds = articles.map((a) => a.sourceId);

  // Check for existing articles by sourceId stored in a custom field
  const existing = await sanityClient.fetch(
    `*[_type == "newsArticle" && sourceId in $sourceIds]{ sourceId }`,
    { sourceIds }
  );

  const existingIds = new Set(existing.map((e) => e.sourceId));
  const newArticles = articles.filter((a) => !existingIds.has(a.sourceId));

  console.log(`Duplicate tekshiruv: ${articles.length} dan ${newArticles.length} yangi`);
  return newArticles;
}

export async function writeArticlesToSanity(articles) {
  const written = [];
  const failed = [];

  // Find or create the "AI Pipeline" author
  let aiAuthorId = await getOrCreateAiAuthor();

  for (const article of articles) {
    try {
      const docId = `rss-${crypto.createHash("md5").update(article.sourceId).digest("hex")}`;

      const doc = {
        _id: docId,
        _type: "newsArticle",
        sourceId: article.sourceId,
        sourceName: article.sourceName,
        sourceUrl: article.sourceUrl,
        title: article.title,
        slug: {
          _type: "slug",
          current: slugify(article.title),
        },
        excerpt: article.excerpt,
        category: article.category,
        imageEmoji: article.imageEmoji || "🤖",
        publishedAt: article.publishedAt,
        readTime: article.readTime || 3,
        featured: false,
        // Draft status: requires human review before publishing
        // Sanity drafts have _id prefixed with "drafts."
        ...(aiAuthorId ? { author: { _type: "reference", _ref: aiAuthorId } } : {}),
      };

      // Create as draft (prefix "drafts." means it won't be published)
      const draftDoc = { ...doc, _id: `drafts.${docId}` };
      await sanityClient.createOrReplace(draftDoc);

      written.push({ id: docId, title: article.title });
      console.log(`  → Sanity draft yaratildi: "${article.title}"`);
    } catch (err) {
      console.error(`  ✗ Sanity xatolik "${article.title}": ${err.message}`);
      failed.push({ title: article.title, error: err.message });
    }
  }

  console.log(`\nSanity: ${written.length} draft yaratildi, ${failed.length} xatolik`);
  return { written, failed };
}

async function getOrCreateAiAuthor() {
  const existing = await sanityClient.fetch(
    `*[_type == "author" && slug.current == "ai-pipeline"][0]{ _id }`
  );

  if (existing?._id) return existing._id;

  try {
    const author = await sanityClient.create({
      _type: "author",
      name: "AI Pipeline",
      slug: { _type: "slug", current: "ai-pipeline" },
      bio: "Avtomatik AI kontent pipeline tomonidan tayyorlangan maqolalar.",
    });
    console.log("AI Pipeline muallif yaratildi");
    return author._id;
  } catch {
    return null;
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}
