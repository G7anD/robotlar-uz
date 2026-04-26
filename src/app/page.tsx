import Link from "next/link";
import { categories, featuredRobots, latestNews } from "@/lib/data";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden grid-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,255,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.08)", color: "var(--accent)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Dunyo robototkasidagi so&apos;nggi yangiliklar
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Robotlar</span> dunyosini{" "}
              <br className="hidden md:block" />
              kashf eting
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ opacity: 0.7 }}>
              Dunyo bo&apos;ylab robototexnika va sun&apos;iy intellekt sohasidagi eng so&apos;nggi yangiliklar,
              robot profillari va texnologik tahlillar. O&apos;zbek tilida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yangiliklar"
                className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }}
              >
                Yangiliklar →
              </Link>
              <Link
                href="/robotlar"
                className="px-8 py-3 rounded-full font-semibold text-sm border transition-all hover:border-cyan-400"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                Robot Katalogi
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-20">
            {[
              { value: "500+", label: "Robot Profili" },
              { value: "50+", label: "Kategoriya" },
              { value: "Har Kuni", label: "Yangiliklar" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs mt-1" style={{ opacity: 0.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>KATEGORIYALAR</p>
            <h2 className="text-2xl md:text-3xl font-bold">Robot Turlari</h2>
          </div>
          <Link href="/robotlar" className="text-sm hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
            Hammasini ko&apos;rish →
          </Link>
        </div>
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
      </section>

      {/* Featured Robots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>MASHHUR ROBOTLAR</p>
            <h2 className="text-2xl md:text-3xl font-bold">Tanlangan Robotlar</h2>
          </div>
          <Link href="/robotlar" className="text-sm hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
            Katalogga →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRobots.slice(0, 6).map((robot) => (
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
              <p className="text-sm mb-3" style={{ opacity: 0.6 }}>{robot.manufacturer} · {robot.year}</p>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{robot.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>SO&apos;NGGI YANGILIKLAR</p>
            <h2 className="text-2xl md:text-3xl font-bold">Robototexnika Yangiliklari</h2>
          </div>
          <Link href="/yangiliklar" className="text-sm hover:text-cyan-400 transition-colors" style={{ opacity: 0.6 }}>
            Hammasini o&apos;qish →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <Link
              key={article.id}
              href={`/yangiliklar/${article.slug}`}
              className="card-glow rounded-2xl border overflow-hidden transition-all hover:-translate-y-1"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <div
                className="h-40 flex items-center justify-center text-6xl"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {article.imageEmoji}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent)" }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs" style={{ opacity: 0.4 }}>{article.readTime} daqiqa</span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-2">{article.title}</h3>
                <p className="text-xs leading-relaxed" style={{ opacity: 0.6 }}>{article.excerpt}</p>
                <p className="text-xs mt-3" style={{ opacity: 0.4 }}>
                  {new Date(article.date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 100%)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="text-5xl mb-4">✈️</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Telegram Kanalimizga Qo&apos;shiling</h2>
          <p className="mb-8 max-w-md mx-auto" style={{ opacity: 0.7 }}>
            Robotika sohasidagi eng so&apos;nggi yangiliklar va qiziqarli faktlar to&apos;g&apos;ridan-to&apos;g&apos;ri telefoningizga!
          </p>
          <a
            href="https://t.me/robotlaruz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }}
          >
            ✈️ @robotlaruz ga qo&apos;shilish
          </a>
        </div>
      </section>
    </div>
  );
}
