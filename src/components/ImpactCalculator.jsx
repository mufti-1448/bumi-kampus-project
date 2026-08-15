// ============================================
// KOMPONEN: ImpactCalculator
// ============================================
// Kalkulator dampak pribadi — list toggle vertikal + panel hasil dengan
// progress bar dan proyeksi dampak kolektif

import { useState, useEffect, useRef } from "react";
import { Droplet, Bus, Recycle, Zap, Sprout, Check, Leaf } from "lucide-react";
import calculatorData from "../data/calculatorData";

const icons = {
  botol: Droplet,
  transportasi: Bus,
  pilah: Recycle,
  energi: Zap,
  tanam: Sprout,
};

export default function ImpactCalculator() {
  const MAX_SKOR = calculatorData.reduce((sum, item) => sum + item.skor, 0);

  // State untuk menyimpan ID aktivitas yang dipilih
  const [selected, setSelected] = useState(
    calculatorData.filter((i) => i.defaultActive).map((i) => i.id),
  );

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Menghitung nilai target berdasarkan item yang dipilih
  const activeItems = calculatorData.filter((item) =>
    selected.includes(item.id),
  );
  const targetKg = activeItems.reduce((sum, item) => sum + item.dampakKg, 0);
  const targetSkor = activeItems.reduce((sum, item) => sum + item.skor, 0);
  const progressPct = Math.min((targetSkor / MAX_SKOR) * 100, 100);

  // --- LOGIKA ANIMASI ANGKA SMOOTH ---
  // displayKg dan displaySkor adalah angka yang akan ditampilkan di layar (bergerak smooth)
  const [displayKg, setDisplayKg] = useState(0);
  const [displaySkor, setDisplaySkor] = useState(0);

  // Gunakan ref untuk menyimpan angka saat ini agar bisa menjadi titik awal animasi berikutnya
  const animRef = useRef({ kg: 0, skor: 0 });
  const kgRafRef = useRef(null);
  const skorRafRef = useRef(null);

  const animateValue = (start, end, setter, key, rafRef) => {
    // Batalkan animasi sebelumnya jika sedang berjalan
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const duration = 600; // Durasi 600ms
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out agar pelan di akhir
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (end - start) * easeOut;

      animRef.current[key] = currentVal;
      setter(currentVal);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    rafRef.current = requestAnimationFrame(update);
  };

  // Jalankan animasi setiap kali targetKg atau targetSkor berubah
  useEffect(() => {
    // Pastikan animasi berjalan dari nilai ref terakhir, bukan dari 0
    animateValue(animRef.current.kg, targetKg, setDisplayKg, "kg", kgRafRef);
  }, [targetKg]);

  useEffect(() => {
    animateValue(
      animRef.current.skor,
      targetSkor,
      setDisplaySkor,
      "skor",
      skorRafRef,
    );
  }, [targetSkor]);

  // Cleanup animation frame saat komponen unmount
  useEffect(() => {
    return () => {
      if (kgRafRef.current) cancelAnimationFrame(kgRafRef.current);
      if (skorRafRef.current) cancelAnimationFrame(skorRafRef.current);
    };
  }, []);
  // -------------------------------------------

  const hasImpact = targetKg > 0 || targetSkor > 0;
  const kolektifKg = Math.round(targetKg * 1000);
  const kolektifPohon = Math.round(kolektifKg / 18.5);
  const displayKgValue = hasImpact ? displayKg.toFixed(1) : "0";
  const displaySkorValue = hasImpact ? Math.round(displaySkor) : 0;

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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Kiri: list aktivitas */}
          <div
            className="space-y-2.5 sm:space-y-3 min-w-0"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {calculatorData.map((item) => {
              const Icon = icons[item.id] || Sprout;
              const active = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  aria-pressed={active}
                  className={`w-full max-w-full flex items-center gap-2 sm:gap-4 p-2.5 sm:p-3 lg:p-4 rounded-2xl border transition-all duration-200 text-left ${
                    active
                      ? "bg-accent-primary/10 border-accent-primary/30"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={14}
                      strokeWidth={1.5}
                      className="text-accent-primary sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                  </span>
                  <span className="flex-1 min-w-0 text-[10px] sm:text-xs lg:text-sm font-semibold text-text-primary leading-snug break-words">
                    {item.label}
                  </span>
                  <span
                    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center border transition-colors flex-shrink-0 ${
                      active
                        ? "bg-accent-primary border-accent-glow"
                        : "border-white/20"
                    }`}
                  >
                    {active && (
                      <Check
                        size={10}
                        strokeWidth={3}
                        className="text-bg-base"
                        aria-label="Terpilih"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kanan: panel hasil */}
          <div
            className="glass-panel p-2.5 sm:p-3 lg:p-8 flex flex-col min-w-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <p className="text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-widest text-text-secondary uppercase mb-2 sm:mb-4">
              Dampak Bulananmu
            </p>

            <div className="flex items-end justify-center gap-10 sm:gap-12">
              <div className="max-w-[45%] min-w-0">
                <p className="font-serif text-xl sm:text-3xl lg:text-6xl font-bold text-accent-primary leading-none transition-colors duration-300 break-words">
                  {displayKgValue}
                </p>
                <p className="text-[7px] sm:text-[8px] lg:text-xs font-semibold tracking-widest text-text-secondary uppercase mt-1.5 sm:mt-2 leading-tight">
                  KG Sampah Berkurang
                </p>
              </div>

              <div className="max-w-[45%] min-w-0 text-right">
                <p className="font-serif text-xl sm:text-3xl lg:text-6xl font-bold text-text-primary leading-none transition-colors duration-300 break-words">
                  {displaySkorValue}
                </p>
                <p className="text-[7px] sm:text-[8px] lg:text-xs font-semibold tracking-widest text-text-secondary uppercase mt-1.5 sm:mt-2 leading-tight">
                  Skor Dampak
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm text-text-secondary mb-2 gap-2">
                <span>Progres Dampakmu</span>
                <span>
                  {displaySkorValue} / {MAX_SKOR}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-accent-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary mt-2 sm:mt-3 leading-relaxed">
                {targetSkor > 0
                  ? "Hebat! Kamu sudah membuat perbedaan nyata."
                  : "Pilih aktivitas untuk melihat dampakmu."}
              </p>
            </div>

            {/* Bagian Kolektif */}
            {targetSkor > 0 && (
              <div className="mt-4 sm:mt-6 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 p-2.5 sm:p-4 flex gap-2 sm:gap-3">
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sprout
                    size={14}
                    strokeWidth={1.5}
                    className="text-accent-primary sm:w-[16px] sm:h-[16px]"
                  />
                </span>
                <div className="text-[10px] sm:text-sm text-text-secondary flex flex-col gap-1 sm:gap-1.5">
                  <p className="font-semibold text-text-primary">
                    Bayangkan 1.000 mahasiswa sepertimu.
                  </p>

                  <div className="flex items-center gap-2">
                    <Recycle
                      size={12}
                      strokeWidth={1.5}
                      className="text-accent-primary flex-shrink-0 sm:w-[14px] sm:h-[14px]"
                    />
                    <span>
                      Kurangi{" "}
                      <b className="text-accent-primary">
                        {kolektifKg.toLocaleString("id-ID")} kg
                      </b>{" "}
                      sampah per bulan.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Leaf
                      size={12}
                      strokeWidth={1.5}
                      className="text-accent-primary flex-shrink-0 sm:w-[14px] sm:h-[14px]"
                    />
                    <span>
                      Setara menanam{" "}
                      <b className="text-accent-primary">
                        {kolektifPohon.toLocaleString("id-ID")}
                      </b>{" "}
                      pohon baru per tahun.
                    </span>
                  </div>
                </div>
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
