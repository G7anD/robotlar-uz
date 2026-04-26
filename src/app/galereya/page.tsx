import type { Metadata } from "next";
import RobotGallery from "./RobotGallery";
import { awesomeRobots } from "@/lib/awesome-robots";

export const metadata: Metadata = {
  title: "Robot Galereyasi",
  description: `Dunyo bo'ylab ${awesomeRobots.length}+ ochiq manbali robot tavsifi — URDF, MJCF formatlar, galereya rasmlari va GitHub havolalar bilan.`,
  keywords: ["robot galereya", "urdf", "mjcf", "robot descriptions", "open source robots"],
};

export default function GalereyaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>GALEREYA</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Ochiq Manbali Robot Tavsiflar
        </h1>
        <p className="max-w-2xl leading-relaxed" style={{ opacity: 0.7 }}>
          {awesomeRobots.length}+ robot uchun URDF, MJCF va boshqa formatlardagi ochiq manbali tavsiflar.
          Har bir robot uchun galereya rasmi, ishlab chiqaruvchi, litsenziya va GitHub havolasi mavjud.
          Manbas:{" "}
          <a
            href="https://github.com/robot-descriptions/awesome-robot-descriptions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            awesome-robot-descriptions
          </a>
          .
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: awesomeRobots.length + "+", label: "Robot" },
          { value: "10", label: "Kategoriya" },
          { value: "100%", label: "Ochiq manba" },
          { value: "URDF/MJCF", label: "Formatlar" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center border"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div className="text-xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs mt-1" style={{ opacity: 0.5 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <RobotGallery />
    </div>
  );
}
