const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramSummary(written, failed, totalFetched) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("Telegram sozlanmagan, xabarnoma o'tkazib yuborildi");
    return;
  }

  const successCount = written.length;
  const failCount = failed.length;

  if (successCount === 0) {
    const text = `🤖 *robotlar.uz AI Pipeline*\n\n` +
      `📰 ${totalFetched} maqola tekshirildi\n` +
      `⚠️ Yangi maqola topilmadi`;

    await sendMessage(botToken, chatId, text);
    return;
  }

  const articleList = written
    .slice(0, 10)
    .map((a, i) => `${i + 1}. ${a.title}`)
    .join("\n");

  const text =
    `🤖 *robotlar.uz AI Pipeline*\n\n` +
    `✅ ${successCount} yangi draft yaratildi\n` +
    (failCount > 0 ? `❌ ${failCount} xatolik\n` : "") +
    `📰 Jami ${totalFetched} maqola tekshirildi\n\n` +
    `*Yangi maqolalar:*\n${articleList}` +
    (written.length > 10 ? `\n... va yana ${written.length - 10} ta` : "") +
    `\n\n📝 [Sanity Studio da ko'rish](https://robotlar-uz.sanity.studio)`;

  await sendMessage(botToken, chatId, text);
}

export async function sendTelegramArticle(article, sanityStudioUrl) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!botToken || !channelId) return;

  const text =
    `🤖 *${escapeMarkdown(article.title)}*\n\n` +
    `${escapeMarkdown(article.excerpt)}\n\n` +
    `📂 Kategoriya: ${article.category}\n` +
    `⏱ O'qish: ${article.readTime} daqiqa\n` +
    `🔗 [Manba](${article.sourceUrl})`;

  await sendMessage(botToken, channelId, text);
}

async function sendMessage(botToken, chatId, text) {
  const url = `${TELEGRAM_API}/bot${botToken}/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: false,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Telegram xatolik: ${err}`);
  } else {
    console.log("Telegram xabarnoma yuborildi");
  }
}

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}
