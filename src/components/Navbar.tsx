"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/yangiliklar", label: "Yangiliklar" },
  { href: "/robotlar", label: "Robotlar" },
  { href: "/kategoriyalar", label: "Kategoriyalar" },
  { href: "/biz-haqimizda", label: "Biz Haqimizda" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(8, 8, 16, 0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🤖</span>
            <span className="gradient-text">Robotlar.uz</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-cyan-400"
                style={{ color: "var(--foreground)", opacity: 0.8 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://t.me/robotlaruz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }}
            >
              <span>✈️</span> Telegram
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md"
            style={{ color: "var(--foreground)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t py-4" style={{ borderColor: "var(--border)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm hover:text-cyan-400"
                style={{ color: "var(--foreground)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
