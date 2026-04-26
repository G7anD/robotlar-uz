import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-2xl">🤖</span>
              <span className="gradient-text">Robotlar.uz</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.6 }}>
              Dunyo bo'ylab robototexnika va sun'iy intellekt sohasidagi so'nggi yangiliklar,
              robot katalogi va texnologiya tahlillari. O'zbek tilida.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://t.me/robotlaruz" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-cyan-400 transition-colors" style={{ opacity: 0.7 }}>
                ✈️ Telegram
              </a>
              <a href="https://instagram.com/robotlaruz" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-cyan-400 transition-colors" style={{ opacity: 0.7 }}>
                📸 Instagram
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: "var(--accent)" }}>Kategoriyalar</h4>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.7 }}>
              {["Sanoat Robotlari", "Uy Robotlari", "Tibbiy Robotlar", "Humanoid"].map((cat) => (
                <li key={cat}>
                  <Link href="/robotlar" className="hover:text-cyan-400 transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: "var(--accent)" }}>Sayt</h4>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.7 }}>
              {[
                { href: "/yangiliklar", label: "Yangiliklar" },
                { href: "/robotlar", label: "Robot Katalogi" },
                { href: "/biz-haqimizda", label: "Biz Haqimizda" },
                { href: "/boglanish", label: "Bog'lanish" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ opacity: 0.5 }}>
            © 2026 Robotlar.uz — Barcha huquqlar himoyalangan
          </p>
          <p className="text-xs" style={{ opacity: 0.4 }}>
            AI yordamida yaratilgan kontent
          </p>
        </div>
      </div>
    </footer>
  );
}
