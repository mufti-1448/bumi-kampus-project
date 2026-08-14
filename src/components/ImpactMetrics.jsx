// ============================================
// KOMPONEN: ImpactMetrics
// ============================================
// Full-bleed background foto hutan, angka serif besar tanpa card,
// count-up animation saat masuk viewport

import { useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useCountUp from "../hooks/useCountUp";

const metrics = [
  { id: "sampah", label: "Sampah Terkelola", sub: "dalam 6 bulan terakhir", suffix: "KG", target: 12400 },
  { id: "mahasiswa", label: "Mahasiswa Terlibat", sub: "dari berbagai fakultas", suffix: "+", target: 3200 },
  { id: "program", label: "Program Berjalan", sub: "aktif di kampus", suffix: "", target: 18 },
  { id: "pohon", label: "Pohon Ditanam", sub: "dan terus bertumbuh", suffix: "", target: 340 },
];

function Metric({ metric, isVisible }) {
  const count = useCountUp(metric.target, isVisible, 1800);
  return (
    <div>
      <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-none">
        {count.toLocaleString("id-ID")}
        {metric.suffix && (
          <span className="text-lg sm:text-xl text-accent-primary font-sans ml-1">
            {metric.suffix}
          </span>
        )}
      </p>
      <p className="text-sm sm:text-base font-semibold text-text-primary mt-3">
        {metric.label}
      </p>
      <p className="text-xs sm:text-sm text-text-secondary">{metric.sub}</p>
      <div className="w-8 h-px bg-white/20 mt-3" />
    </div>
  );
}

export default function ImpactMetrics() {
  const [ref, isVisible] = useIntersectionObserver();
  const [bgError, setBgError] = useState(false);

  return (
    <section id="dampak" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg-surface">
        {!bgError && (
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop"
            alt="Hutan kampus dari atas"
            className="w-full h-full object-cover opacity-60"
            onError={() => setBgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-bg-base/40" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            Dampak Terukur
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary max-w-xl mb-14">
            Dampak yang Sudah Terukur
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={metric.id} data-aos="zoom-in-up" data-aos-delay={index * 100 + 200}>
              <Metric metric={metric} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
