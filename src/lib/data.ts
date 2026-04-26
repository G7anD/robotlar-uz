export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageEmoji: string;
  readTime: number;
}

export interface RobotProfile {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: string;
  categorySlug: string;
  year: number;
  description: string;
  emoji: string;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  count: number;
}

export const categories: Category[] = [
  { slug: "sanoat", name: "Sanoat Robotlari", emoji: "🏭", description: "Zavodlar va ishlab chiqarishda ishlatiladigan robotlar", count: 24 },
  { slug: "uy", name: "Uy Robotlari", emoji: "🏠", description: "Uy yumushlarini bajaradigan robotlar", count: 18 },
  { slug: "tibbiy", name: "Tibbiy Robotlar", emoji: "🏥", description: "Jarrohlik va tibbiy yordamda ishlatiladigan robotlar", count: 12 },
  { slug: "harbiy", name: "Harbiy Robotlar", emoji: "🛡️", description: "Mudofaa va xavfsizlik robotlari", count: 9 },
  { slug: "tadqiqot", name: "Tadqiqot Robotlari", emoji: "🔬", description: "Ilmiy tadqiqot va kosmosda ishlatiladigan robotlar", count: 15 },
  { slug: "humanoid", name: "Humanoid Robotlar", emoji: "🤖", description: "Insonsimon ko'rinishdagi robotlar", count: 8 },
];

export const featuredRobots: RobotProfile[] = [
  {
    id: "1", slug: "boston-dynamics-atlas", name: "Atlas", manufacturer: "Boston Dynamics",
    category: "Humanoid", categorySlug: "humanoid", year: 2013, featured: true,
    emoji: "🤖",
    description: "Dunyodagi eng rivojlangan ikki oyoqli humanoid robot. Parkour va murakkab harakatlarni bajara oladi.",
  },
  {
    id: "2", slug: "tesla-optimus", name: "Optimus (Gen 2)", manufacturer: "Tesla",
    category: "Humanoid", categorySlug: "humanoid", year: 2023, featured: true,
    emoji: "🤖",
    description: "Tesla kompaniyasining umumiy maqsadli ish robotlari. Zavodlarda mustaqil ishlay oladi.",
  },
  {
    id: "3", slug: "irobot-roomba", name: "Roomba j9+", manufacturer: "iRobot",
    category: "Uy", categorySlug: "uy", year: 2023, featured: true,
    emoji: "🏠",
    description: "Avtomatik changlarni tozalovchi va bazasiga qaytib zaryadlanadigan uy roboti.",
  },
  {
    id: "4", slug: "boston-dynamics-spot", name: "Spot", manufacturer: "Boston Dynamics",
    category: "Sanoat", categorySlug: "sanoat", year: 2019, featured: true,
    emoji: "🐕",
    description: "To'rt oyoqli mobil robot. Sanoat inspeksiyasi, qidiruv-qutqaruv va tadqiqotda ishlatiladi.",
  },
  {
    id: "5", slug: "da-vinci-surgical", name: "Da Vinci Xi", manufacturer: "Intuitive Surgical",
    category: "Tibbiy", categorySlug: "tibbiy", year: 2014, featured: true,
    emoji: "🏥",
    description: "Minimalinvaziv jarrohlik uchun robototexnik tizim. 10 milliondan ortiq operatsiya o'tkazilgan.",
  },
  {
    id: "6", slug: "nasa-perseverance", name: "Perseverance", manufacturer: "NASA/JPL",
    category: "Tadqiqot", categorySlug: "tadqiqot", year: 2020, featured: false,
    emoji: "🚀",
    description: "Mars yuzasida tadqiqot olib boradigan rover robot. Kislorod ishlab chiqarish imkoniyatiga ega.",
  },
];

export const latestNews: NewsArticle[] = [
  {
    id: "1", slug: "tesla-optimus-zavod", readTime: 4,
    title: "Tesla Optimus robotlari zavod ishlab chiqarishida 1 million soat ishladi",
    excerpt: "Tesla kompaniyasi Optimus humanoid robotlarining Fremont zavodida bir yil ichida 1 million soat ishlaganligi haqida ma'lumot berdi.",
    category: "Humanoid", date: "2026-04-25", imageEmoji: "🤖",
  },
  {
    id: "2", slug: "boston-dynamics-yangi-atlas", readTime: 3,
    title: "Boston Dynamics yangi elektr Atlas robotini taqdim etdi",
    excerpt: "Gidravlik tizimdan voz kechgan Boston Dynamics yangi Atlas robotini to'liq elektr dvigatellarga o'tkazdi.",
    category: "Humanoid", date: "2026-04-23", imageEmoji: "⚡",
  },
  {
    id: "3", slug: "uy-roboti-yangiliklar", readTime: 5,
    title: "2026 yilda uy robototkasi bozori 35 milliard dollarga yetdi",
    excerpt: "Yillik 18% o'sish sur'ati bilan uy robototkasi sektori jadal rivojlanmoqda. Roomba va Roborock yetakchi o'rinlarda.",
    category: "Bozor", date: "2026-04-20", imageEmoji: "📈",
  },
  {
    id: "4", slug: "ai-robot-integratsiya", readTime: 6,
    title: "GPT-5 modeli robototexnikaga integratsiya qilindi: yangi imkoniyatlar",
    excerpt: "Sun'iy intellektning yangi avlodi robotlarga real vaqtda muloqot qilish va murakkab vazifalarni bajarish imkonini bermoqda.",
    category: "AI", date: "2026-04-18", imageEmoji: "🧠",
  },
  {
    id: "5", slug: "mars-helicopter", readTime: 4,
    title: "Ingenuity vertolyoti Marsdagi 80-chi uchishni amalga oshirdi",
    excerpt: "NASA ning Ingenuity Mars helikopteri kutilgan 5 ta uchishdan ortib 80 marta uchib, texnologik mo'jizani yaratmoqda.",
    category: "Kosmik", date: "2026-04-15", imageEmoji: "🚁",
  },
  {
    id: "6", slug: "jarrohlik-roboti-uzbekiston", readTime: 3,
    title: "O'zbekistonda birinchi jarrohlik roboti ishga tushirildi",
    excerpt: "Toshkent shahrining yetakchi shifoxonalaridan birida Da Vinci jarrohlik roboti o'rnatildi va birinchi operatsiya muvaffaqiyatli o'tdi.",
    category: "Tibbiy", date: "2026-04-12", imageEmoji: "🇺🇿",
  },
];
