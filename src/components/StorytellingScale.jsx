// ============================================
// KOMPONEN: StorytellingScale
// ============================================
// "Dari Satu, Jadi Ribuan" — 4 lingkaran seragam terhubung garis,
// lingkaran ke-3 (Satu Angkatan) di-highlight dengan glow ring

const stages = [
  { number: "1", label: "Kamu", highlight: false },
  { number: "10", label: "Teman Sekamar", highlight: false },
  { number: "100", label: "Satu Angkatan", highlight: true },
  { number: "1.000+", label: "Seluruh Kampus", highlight: false },
];

export default function StorytellingScale() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-16"
          data-aos="fade-up"
        >
          Dari Satu, Jadi Ribuan
        </h2>

        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
          {stages.map((stage, i) => {
            // ✅ FIX: Semua ukuran pakai angka valid di Tailwind
            const sizeClass =
              stage.number === "1"
                ? "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base md:text-lg"
                : stage.number === "10"
                  ? "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-base sm:text-lg md:text-xl"
                  : stage.number === "100"
                    ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-base sm:text-xl md:text-2xl"
                    : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-base sm:text-xl md:text-2xl";

            return (
              <div
                key={stage.label}
                className="flex items-center flex-1 min-w-0 last:flex-none"
              >
                <div
                  className="flex flex-col items-center gap-2 sm:gap-3 transition-all duration-700 min-w-0"
                  data-aos="zoom-in"
                  data-aos-delay={i * 150 + 200}
                >
                  <div
                    className={`rounded-full bg-bg-surface border flex items-center justify-center font-bold text-text-primary ${sizeClass} ${
                      stage.highlight
                        ? "border-2 border-accent-glow shadow-[0_0_24px_rgba(184,233,134,0.4)]"
                        : "border-white/10"
                    }`}
                  >
                    {stage.number}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-text-secondary whitespace-nowrap">
                    {stage.label}
                  </p>
                </div>

                {i < stages.length - 1 && (
                  <div
                    className="flex-1 h-px bg-white/10 mx-1 sm:mx-2 md:mx-3 mb-6 sm:mb-8 min-w-[10px]"
                    data-aos="fade-in"
                    data-aos-delay={i * 150 + 350}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
