import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Siz robotika sohasidagi mutaxassis tarjimon va muharrirsiz.
Vazifangiz: inglizcha robotika yangiliklar maqolalarini o'zbek tiliga tarjima qilish va robotlar.uz saytiga moslash.

Qoidalar:
- O'zbek tilida yozing (lotin alifbosi)
- Texnik atamalarni iloji boricha o'zbekcha qiling, lekin keng tarqalgan inglizcha atamalar (robot, AI, sensor, drone, exoskeleton) ni qoldirishingiz mumkin
- Sarlavha: qisqa, jozibali, 60 belgidan oshmasin
- Qisqa matn (excerpt): 1-2 jumla, asosiy fikrni ifodalab bersin
- Kategoriyani quyidagilardan birini tanlang: yangiliklar, tadqiqot, sanoat, tibbiyot, video
- O'qish vaqtini daqiqada hisoblang (taxminan 200 so'z/daqiqa)`;

export async function processArticleWithClaude(article) {
  const prompt = `Quyidagi maqolani o'zbek tiliga moslashtiring va JSON formatida qaytaring:

Sarlavha (inglizcha): ${article.originalTitle}
Qisqa matn (inglizcha): ${article.originalExcerpt}
Tavsiya etilgan kategoriya: ${article.defaultCategory}

JSON formatida qaytaring (faqat JSON, boshqa hech narsa):
{
  "title": "o'zbekcha sarlavha",
  "excerpt": "o'zbekcha qisqa matn (1-2 jumla)",
  "category": "tanlangan kategoriya (yangiliklar/tadqiqot/sanoat/tibbiyot/video)",
  "imageEmoji": "mos emoji (bitta)",
  "readTime": <taxminiy daqiqa soni>,
  "qualityScore": <0-10, maqolaning sifat bahosi>
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON topilmadi");
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error(`Claude JSON parse xatoligi: ${err.message}`);
    console.error(`Javob: ${text}`);
    return null;
  }
}

export async function processArticlesBatch(articles) {
  const results = [];
  const MIN_QUALITY = 6;

  for (const article of articles) {
    try {
      console.log(`  Claude jarayoni: "${article.originalTitle.slice(0, 60)}..."`);
      const processed = await processArticleWithClaude(article);

      if (!processed) {
        console.log("  → Skip: Claude javob bermadi");
        continue;
      }

      if (processed.qualityScore < MIN_QUALITY) {
        console.log(`  → Skip: Past sifat (${processed.qualityScore}/10)`);
        continue;
      }

      results.push({ ...article, ...processed });
      console.log(`  → OK: "${processed.title}" (sifat: ${processed.qualityScore}/10)`);

      // Rate limiting: 1s delay between requests
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  ✗ Xatolik: ${err.message}`);
    }
  }

  return results;
}
