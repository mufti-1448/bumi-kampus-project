// ============================================
// KOMPONEN: AboutProblem
// ============================================
// Problem framing: 2 card bertumpuk dengan progress bar perbandingan
// aksi sendirian vs dampak kolektif

import { Users } from "lucide-react";

export default function AboutProblem() {
  return (
    <section id="tentang" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Kiri: heading + deskripsi */}
        <div data-aos="fade-right">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            Tentang
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-text-primary max-w-lg">
            <span className="text-text-primary">Rasanya Kayak</span>
            <br />
            <span className="text-accent-primary">Usaha Sendirian?</span>
          </h2>
          <p className="mt-6 text-text-secondary leading-relaxed">
            Banyak dari kita sadar akan krisis lingkungan, tapi merasa
            terlalu kecil untuk membuat perbedaan nyata. Satu botol
            dihemat, satu sampah dipilah terasa sia-sia tanpa aksi
            bersama.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Bumi Kampus hadir untuk mengubah cara pikir itu. Ketika setiap
            individu bergerak dalam satu arah, dampaknya tidak lagi terasa
            kecil melainkan mengubah kampus secara nyata.
          </p>
        </div>

        {/* Kanan: 2 card bertumpuk */}
        <div className="space-y-4">
          {/* Card 1: Aksi Sendirian */}
          <div
            className="glass-panel p-6"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-text-secondary">
                1
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">
                  Aksi Sendirian
                </p>
                <p className="text-sm font-bold text-text-primary">Dampak Terbatas</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
              <div className="h-full w-[8%] bg-text-secondary/50 rounded-full" />
            </div>
            <p className="text-sm text-text-secondary">
              1 orang. 0.5 kg sampah berkurang. Terasa terlalu kecil untuk
              berarti.
            </p>
          </div>

          {/* Card 2: Dampak Kolektif */}
          <div className="rounded-3xl bg-accent-primary/10 border border-accent-primary/30 p-6" data-aos="fade-left" data-aos-delay="400">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <Users size={16} strokeWidth={1.5} className="text-accent-primary" />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-accent-primary uppercase">
                  Dampak Kolektif
                </p>
                <p className="text-sm font-bold text-text-primary">Kekuatan Bersama</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
              <div className="h-full w-full bg-accent-primary rounded-full" />
            </div>
            <p className="text-sm text-text-secondary">
              5.000 mahasiswa. 2.500 kg sampah berkurang.{" "}
              <span className="font-semibold text-accent-primary">Terasa nyata.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
