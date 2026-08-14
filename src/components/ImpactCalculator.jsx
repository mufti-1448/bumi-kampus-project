// ============================================
// KOMPONEN: ImpactCalculator
// ============================================
// Kalkulator dampak pribadi — list toggle vertikal + panel hasil dengan
// progress bar dan proyeksi dampak kolektif (placeholder logic)

import { useState } from "react";
import { Droplet, Bus, Recycle, Zap, Sprout, Check } from "lucide-react";
import calculatorData from "../data/calculatorData";
import useCountUp from "../hooks/useCountUp";

const icons = {
  botol: Droplet,
  transportasi: Bus,
  pilah: Recycle,
  energi: Zap,
  tanam: Sprout,
};

const MAX_SKOR = calculatorData.reduce((sum, item) => sum + item.skor, 0) * 3;

export default function ImpactCalculator() {
  const [selected, setSelected] = useState(
    calculatorData.filter((i) => i.defaultActive).map((i) => i.id)
  );

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const activeItems = calculatorData.filter((item) => selected.includes(item.id));
  const totalKg = activeItems.reduce((sum, item) => sum + item.dampakKg, 0);
  const totalSkor = activeItems.reduce((sum, item) => sum + item.skor, 0);

  const animatedKg = useCountUp(Math.round(totalKg * 10), true, 600);
  const animatedSkor = useCountUp(totalSkor, true, 600);
  const progressPct = Math.min((totalSkor / MAX_SKOR) * 100, 100);

  const kolektifKg = Math.round(totalKg * 1000);
  const kolektifPohon = Math.round(kolektifKg / 18.5); // rasio ilustratif

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            Kalkulator
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary max-w-lg">
            Kalkulator Dampak Pribadi
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg">
            Pilih aksi yang sudah kamu lakukan secara rutin. Kami hitung
            dampakmu per bulan.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {/* Kiri: list aktivitas */}
          <div className="space-y-3" data-aos="fade-right" data-aos-delay="200">
            {calculatorData.map((item) => {
              const Icon = icons[item.id] || Sprout;
              const active = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  aria-pressed={active}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                    active
                      ? "bg-accent-primary/10 border-accent-primary/30"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="w-10 h-10 rounded-full bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} strokeWidth={1.5} className="text-accent-primary" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-text-primary">
                    {item.label}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      active
                        ? "bg-accent-glow border-accent-glow"
                        : "border-white/20"
                    }`}
                  >
                    {active && <Check size={14} strokeWidth={3} className="text-bg-base" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kanan: panel hasil */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col" data-aos="fade-left" data-aos-delay="400">
            <p className="text-xs font-semibold tracking-widest text-text-secondary uppercase mb-4">
              Dampak Bulananmu
            </p>

            <p className="font-serif text-5xl sm:text-6xl font-bold text-accent-glow leading-none">
              {(animatedKg / 10).toFixed(1)}
            </p>
            <p className="text-xs font-semibold tracking-widest text-text-secondary uppercase mt-2 mb-6">
              KG Sampah Berkurang
            </p>

            <p className="font-serif text-5xl sm:text-6xl font-bold text-text-primary leading-none">
              {animatedSkor}
            </p>
            <p className="text-xs font-semibold tracking-widest text-text-secondary uppercase mt-2 mb-6">
              Skor Dampak
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                <span>Progres Dampakmu</span>
                <span>
                  {totalSkor} / {MAX_SKOR}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-accent-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-sm text-text-secondary mt-3">
                {totalSkor > 0
                  ? "Hebat! Kamu sudah membuat perbedaan nyata."
                  : "Pilih aktivitas untuk melihat dampakmu."}
              </p>
            </div>

            {totalSkor > 0 && (
              <div className="mt-6 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 p-4 flex gap-3">
                <span className="w-9 h-9 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sprout size={16} strokeWidth={1.5} className="text-accent-glow" />
                </span>
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">
                    Bayangkan kalau 1.000 mahasiswa sepertimu
                  </span>
                  <br />
                  Dampak kolektifnya:{" "}
                  <span className="font-semibold text-accent-glow">
                    {kolektifKg.toLocaleString("id-ID")} kg
                  </span>{" "}
                  sampah berkurang tiap bulan — setara menanam{" "}
                  <span className="font-semibold text-accent-glow">
                    {kolektifPohon.toLocaleString("id-ID")} pohon
                  </span>{" "}
                  baru setiap tahun.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-text-secondary/60 mt-6 italic">
          *Data ilustratif untuk kebutuhan kompetisi, bukan pengukuran ilmiah.
        </p>
      </div>
    </section>
  );
}
