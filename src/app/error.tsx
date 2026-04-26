"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[robotlar.uz] route error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-3">Nimadir xato ketdi</h2>
      <p className="mb-6" style={{ opacity: 0.7 }}>
        Sahifani yuklashda kutilmagan xatolik yuz berdi. Qayta urinib ko&apos;ring.
      </p>
      {error.digest ? (
        <p className="text-xs mb-6" style={{ opacity: 0.4 }}>
          Xato kodi: {error.digest}
        </p>
      ) : null}
      <button
        onClick={() => unstable_retry()}
        className="px-6 py-2.5 rounded-full font-semibold text-sm border transition-colors hover:border-cyan-400"
        style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
      >
        Qayta urinish
      </button>
    </div>
  );
}
