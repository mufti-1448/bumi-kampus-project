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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-16" data-aos="fade-up">
          Dari Satu, Jadi Ribuan
        </h2>

        <div className="flex items-center justify-center">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1 last:flex-none">
              <div
                className="flex flex-col items-center gap-3 transition-all duration-700"
                data-aos="zoom-in" data-aos-delay={i * 150 + 200}
              >
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bg-surface border flex items-center justify-center font-bold text-lg sm:text-xl text-text-primary ${
                    stage.highlight
                      ? "border-2 border-accent-glow shadow-[0_0_24px_rgba(184,233,134,0.4)]"
                      : "border-white/10"
                  }`}
                >
                  {stage.number}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary whitespace-nowrap">
                  {stage.label}
                </p>
              </div>

              {i < stages.length - 1 && (
                <div className="flex-1 h-px bg-white/10 mx-2 sm:mx-4 mb-8" data-aos="fade-in" data-aos-delay={i * 150 + 350} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
