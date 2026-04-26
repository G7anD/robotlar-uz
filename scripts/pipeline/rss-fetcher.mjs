import Parser from "rss-parser";

const RSS_SOURCES = [
  {
    name: "IEEE Spectrum Robotics",
    url: "https://spectrum.ieee.org/feeds/robotics.rss",
    category: "tadqiqot",
  },
  {
    name: "MIT News Robotics",
    url: "https://news.mit.edu/rss/research/robots",
    category: "tadqiqot",
  },
  {
    name: "The Robot Report",
    url: "https://www.therobotreport.com/feed/",
    category: "yangiliklar",
  },
  {
    name: "TechCrunch Robotics",
    url: "https://techcrunch.com/tag/robotics/feed/",
    category: "yangiliklar",
  },
  {
    name: "Boston Dynamics Blog",
    url: "https://bostondynamics.com/blog/feed/",
    category: "video",
  },
];

const MAX_ITEMS_PER_SOURCE = 5;
const MAX_AGE_HOURS = 24;

export async function fetchRssArticles() {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      "User-Agent": "RobotlarUz/1.0 RSS Reader",
    },
  });

  const cutoffDate = new Date(Date.now() - MAX_AGE_HOURS * 60 * 60 * 1000);
  const articles = [];

  for (const source of RSS_SOURCES) {
    try {
      console.log(`Fetching: ${source.name}`);
      const feed = await parser.parseURL(source.url);

      const items = feed.items
        .filter((item) => {
          const pubDate = item.pubDate ? new Date(item.pubDate) : null;
          return pubDate && pubDate > cutoffDate;
        })
        .slice(0, MAX_ITEMS_PER_SOURCE);

      for (const item of items) {
        articles.push({
          sourceId: `${source.name}::${item.guid || item.link}`,
          sourceName: source.name,
          sourceUrl: item.link || "",
          defaultCategory: source.category,
          originalTitle: item.title || "",
          originalExcerpt: item.contentSnippet || item.summary || item.content?.slice(0, 500) || "",
          originalContent: item.content || item.summary || "",
          publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          imageUrl: extractImageUrl(item),
        });
      }

      console.log(`  → ${items.length} yangi maqola topildi`);
    } catch (err) {
      console.error(`  ✗ Xatolik ${source.name}: ${err.message}`);
    }
  }

  console.log(`\nJami ${articles.length} maqola yig'ildi`);
  return articles;
}

function extractImageUrl(item) {
  if (item.enclosure?.url) return item.enclosure.url;
  const imgMatch = item.content?.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}
