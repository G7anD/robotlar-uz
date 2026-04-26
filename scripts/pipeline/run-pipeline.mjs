/**
 * robotlar.uz AI Content Pipeline
 *
 * Flow: RSS Sources → Claude API (translate/summarize) → Sanity CMS (draft) → Telegram notification
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (optional, defaults to "production")
 *   SANITY_API_WRITE_TOKEN
 *   TELEGRAM_BOT_TOKEN              (optional)
 *   TELEGRAM_CHAT_ID                (optional, admin chat for pipeline reports)
 *   TELEGRAM_CHANNEL_ID             (optional, public channel for published articles)
 */

import { fetchRssArticles } from "./rss-fetcher.mjs";
import { processArticlesBatch } from "./claude-processor.mjs";
import { checkDuplicates, writeArticlesToSanity } from "./sanity-writer.mjs";
import { sendTelegramSummary } from "./telegram-notifier.mjs";

async function main() {
  const startTime = Date.now();
  console.log("=".repeat(60));
  console.log("robotlar.uz AI Pipeline boshlandi");
  console.log(`Sana: ${new Date().toISOString()}`);
  console.log("=".repeat(60));

  // 1. Fetch RSS articles
  console.log("\n[1/4] RSS manbalaridan maqolalar yuklanmoqda...");
  const rawArticles = await fetchRssArticles();

  if (rawArticles.length === 0) {
    console.log("Yangi maqola topilmadi. Pipeline tugadi.");
    await sendTelegramSummary([], [], 0);
    return;
  }

  // 2. Deduplicate against Sanity
  console.log("\n[2/4] Dublikat tekshiruvi...");
  const newArticles = await checkDuplicates(rawArticles);

  if (newArticles.length === 0) {
    console.log("Barcha maqolalar allaqachon mavjud. Pipeline tugadi.");
    await sendTelegramSummary([], [], rawArticles.length);
    return;
  }

  // 3. Translate and process with Claude
  console.log(`\n[3/4] Claude API bilan ${newArticles.length} maqola qayta ishlanmoqda...`);
  const processedArticles = await processArticlesBatch(newArticles);

  if (processedArticles.length === 0) {
    console.log("Hech qanday maqola qayta ishlanmadi.");
    await sendTelegramSummary([], [], rawArticles.length);
    return;
  }

  // 4. Write drafts to Sanity CMS
  console.log(`\n[4/4] ${processedArticles.length} maqola Sanity ga yozilmoqda (draft)...`);
  const { written, failed } = await writeArticlesToSanity(processedArticles);

  // 5. Send Telegram notification
  await sendTelegramSummary(written, failed, rawArticles.length);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n" + "=".repeat(60));
  console.log(`Pipeline tugadi: ${elapsed}s`);
  console.log(`Natija: ${written.length} draft yaratildi, ${failed.length} xatolik`);
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("Pipeline halokatli xatolik:", err);
  process.exit(1);
});
