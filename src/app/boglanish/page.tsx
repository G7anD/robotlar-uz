import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bog'lanish",
  description: "Robotlar.uz jamoasi bilan bog'lanish.",
};

export default function BoglanishPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>BOG&apos;LANISH</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Biz bilan bog&apos;laning</h1>
      <p className="mb-10 leading-relaxed" style={{ opacity: 0.7 }}>
        Savol, takliflar yoki hamkorlik bo&apos;yicha murojaat qilmoqchimisiz?
        Quyidagi kanallar orqali biz bilan bog&apos;laning.
      </p>

      <div className="space-y-4">
        {[
          { emoji: "✈️", label: "Telegram", value: "@robotlaruz", href: "https://t.me/robotlaruz" },
          { emoji: "📸", label: "Instagram", value: "@robotlaruz", href: "https://instagram.com/robotlaruz" },
          { emoji: "📧", label: "Email", value: "info@robotlar.uz", href: "mailto:info@robotlar.uz" },
        ].map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glow flex items-center gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-0.5"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(0,212,255,0.08)" }}
            >
              {contact.emoji}
            </div>
            <div>
              <div className="font-semibold">{contact.label}</div>
              <div className="text-sm" style={{ color: "var(--accent)" }}>{contact.value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
