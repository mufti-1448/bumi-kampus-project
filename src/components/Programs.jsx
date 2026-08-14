// ============================================
// KOMPONEN: Programs
// ============================================
// Program explorer — grid bento asimetris, foto full-bleed dengan overlay teks

import { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import programsData from "../data/programsData";

const filters = ["Semua", "Daur Ulang", "Komunitas", "Area Hijau"];

// Penempatan grid manual agar layout bento (card 1 tinggi, card 2-3 sejajar,
// card 4 di bawah card 2) tetap terjaga walau hasil filter berubah jumlahnya
const gridPosition = {
  1: "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  2: "lg:col-start-2 lg:row-start-1",
  3: "lg:col-start-3 lg:row-start-1",
  4: "lg:col-start-2 lg:row-start-2",
};

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [imgErrors, setImgErrors] = useState({});

  const filtered =
    activeFilter === "Semua"
      ? programsData
      : programsData.filter((p) => p.kategori === activeFilter);

  return (
    <section id="program" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-3">
              Program
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary">
              Program & Aksi
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-accent-primary text-bg-base"
                    : "bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {filtered.map((program, index) => (
            <article
              key={program.id}
              className={`relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group min-h-[280px] ${
                gridPosition[index + 1] || ""
              }`}
              data-aos="zoom-in" data-aos-delay={index * 100 + 200}
            >
              {!imgErrors[program.id] ? (
                <img
                  src={program.gambar}
                  alt={program.nama}
                  className="absolute inset-0 img-duotone group-hover:scale-105 transition-transform duration-500"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [program.id]: true }))
                  }
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-accent-primary/10">
                  <Package size={40} strokeWidth={1.2} className="text-accent-primary/40" />
                </div>
              )}

              {/* Overlay gradient untuk keterbacaan teks */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />

              <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-widest text-text-primary/80 bg-bg-base/50 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                {program.kategori}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-text-primary mb-1">
                  {program.nama}
                </h3>
                <p className="text-sm text-text-secondary/90 leading-relaxed mb-3 max-w-xs">
                  {program.deskripsi}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-primary">
                  Pelajari lebih <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-secondary mt-10">
            Belum ada program di kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}
