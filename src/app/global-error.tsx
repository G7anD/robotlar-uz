"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[robotlar.uz] global error:", error);
  }, [error]);

  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          padding: "4rem 1rem",
          background: "#0a0a0a",
          color: "#f0f0f0",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            Sayt vaqtinchalik ishlamayapti
          </h2>
          <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>
            Asosiy xatolik yuz berdi. Bir necha daqiqadan keyin qayta tashrif buyuring.
          </p>
          {error.digest ? (
            <p style={{ fontSize: "0.75rem", opacity: 0.4, marginBottom: "1.5rem" }}>
              Xato kodi: {error.digest}
            </p>
          ) : null}
          <button
            onClick={() => unstable_retry()}
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: 9999,
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "transparent",
              color: "#f0f0f0",
              border: "1px solid #2a2a2a",
              cursor: "pointer",
            }}
          >
            Qayta urinish
          </button>
        </div>
      </body>
    </html>
  );
}
