// ============================================
// KOMPONEN: ImpactMetrics
// ============================================
// Full-bleed background foto hutan, angka serif besar tanpa card,
// count-up animation saat masuk viewport

import { useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useCountUp from "../hooks/useCountUp";

const metrics = [
  {
    id: "sampah",
    label: "Sampah Terkelola",
    sub: "dalam 6 bulan terakhir",
    suffix: "KG",
    target: 12400,
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa Terlibat",
    sub: "dari berbagai fakultas",
    suffix: "+",
    target: 3200,
  },
  {
    id: "program",
    label: "Program Berjalan",
    sub: "aktif di kampus",
    suffix: "",
    target: 18,
  },
  {
    id: "pohon",
    label: "Pohon Ditanam",
    sub: "dan terus bertumbuh",
    suffix: "",
    target: 340,
  },
];

function Metric({ metric, isVisible }) {
  const count = useCountUp(metric.target, isVisible, 1800);
  const widthMap = {
    18: "90px",
    340: "130px",
    3200: "185px",
    12400: "235px",
  };
  const stableWidth = widthMap[metric.target] || "170px";

  return (
    <div
      className={`transition-opacity duration-700 ease-out will-change-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="min-h-[4rem] sm:min-h-[5rem] flex items-end">
        <p
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-none [font-variant-numeric:tabular-nums] whitespace-nowrap"
          style={{ display: "inline-block", minWidth: stableWidth }}
        >
          {count.toLocaleString("id-ID")}
          {metric.suffix && (
            <span className="text-lg sm:text-xl text-accent-primary font-sans ml-1 align-baseline">
              {metric.suffix}
            </span>
          )}
        </p>
      </div>
      <p className="text-sm sm:text-base font-semibold text-text-primary mt-3">
        {metric.label}
      </p>
      <p className="text-xs sm:text-sm text-text-secondary">{metric.sub}</p>
    </div>
  );
}

export default function ImpactMetrics() {
  const [ref, isVisible] = useIntersectionObserver();
  const [bgError, setBgError] = useState(false);

  return (
    <section
      id="dampak"
      className="relative isolate min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-bg-surface">
        {!bgError && (
          <img
            src="/images/impact-metrics-bg.jpg"
            alt="Hutan kampus dari atas"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={() => setBgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/90 via-bg-base/40 to-bg-base/90" />
      </div>

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-base to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-base to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div
          className={`transition-opacity duration-700 ease-out will-change-opacity ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            Dampak Terukur
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary max-w-xl mb-14">
            Dampak yang Sudah Terukur
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className="transition-opacity duration-700 ease-out will-change-opacity"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
              }}
            >
              <Metric metric={metric} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
