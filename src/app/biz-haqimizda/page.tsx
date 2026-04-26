import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz Haqimizda",
  description: "Robotlar.uz loyihasi haqida — maqsadimiz, jamoamiz va veb-sayt haqida.",
};

export default function BizHaqimizda() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>BIZ HAQIMIZDA</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Robotlar.uz nima?</h1>

      <div className="prose prose-invert max-w-none space-y-6" style={{ opacity: 0.85 }}>
        <p className="text-lg leading-relaxed">
          <strong style={{ color: "var(--foreground)" }}>Robotlar.uz</strong> — dunyo bo&apos;ylab robototexnika va
          sun&apos;iy intellekt sohasidagi eng so&apos;nggi yangiliklarni o&apos;zbek tilida yetkazib beruvchi
          ixtisoslashtirilgan platforma.
        </p>

        <div
          className="rounded-2xl p-6 border"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-bold mb-4">🎯 Maqsadimiz</h2>
          <p className="leading-relaxed">
            O&apos;zbek tilidagi foydalanuvchilarga dunyo robototexnikasi haqida sifatli, ishonchli va qiziqarli
            kontent taqdim etish. Robotika va AI texnologiyalarini ommalashtirishga hissa qo&apos;shish.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 border"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-bold mb-4">📡 Nima taklif etamiz</h2>
          <ul className="space-y-3">
            {[
              "🤖 Dunyo robototexnikasidagi eng so'nggi yangiliklar",
              "📚 500+ robot profillari va texnik ma'lumotlar",
              "🧠 AI va robototexnika tendensiyalari tahlili",
              "✈️ Telegram kanali — kunlik yangiliklar",
              "📸 Instagram — vizual kontent va infografikalar",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-2xl p-6 border"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-bold mb-4">⚡ Texnologiya</h2>
          <p className="leading-relaxed mb-3">
            Robotlar.uz zamonaviy texnologiyalar asosida qurilgan:
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Frontend", "Next.js 16 + TypeScript"],
              ["Stil", "Tailwind CSS"],
              ["Hosting", "Vercel"],
              ["AI Kontent", "Claude API"],
            ].map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span style={{ opacity: 0.5 }}>{key}:</span>
                <span style={{ color: "var(--accent)" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-8">
          <p className="mb-4" style={{ opacity: 0.7 }}>Bizning ijtimoiy tarmoqlarga qo&apos;shiling:</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://t.me/robotlaruz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-medium text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }}
            >
              ✈️ Telegram
            </a>
            <a
              href="https://instagram.com/robotlaruz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-medium text-sm border transition-all hover:border-cyan-400"
              style={{ borderColor: "var(--border)" }}
            >
              📸 Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
