// ============================================
// KOMPONEN: Hero
// ============================================
// Full-bleed background photo + headline layered (SMALL / ACTIONS. outline
// / COLLECTIVE / IMPACT. accent) + elemen foto dekoratif "Universitas Nusantara"

import { useState } from "react";
import { ArrowRight, TreePine, Building2 } from "lucide-react";

export default function Hero() {
  const [bgError, setBgError] = useState(false);
  const [badgeError, setBadgeError] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background full-bleed */}
      <div className="absolute inset-0 -z-10 bg-bg-base">
        {!bgError && (
          <img
            src="/images/hero-bg.jpg"
            alt="Mahasiswa berkumpul di lapangan kampus"
            className="img-duotone opacity-70"
            onError={() => setBgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-bg-base/30" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 lg:mt-0">
        <div className="flex-1 w-full">
          <div 
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-glow/30 bg-accent-primary/10 shadow-sm"
            data-aos="fade-down"
          >
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-accent-primary uppercase select-none">
              Gerakan Mahasiswa untuk Kampus
            </span>
          </div>
          
          <h1 
            className="font-extrabold uppercase leading-[0.9] tracking-tight text-6xl sm:text-7xl lg:text-8xl"
            data-aos="fade-up" data-aos-delay="100"
          >
            <span className="block text-text-primary">Small</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.5px #7A9B5C" }}
            >
              Actions.
            </span>
            <span className="block text-text-primary">Collective</span>
            <span className="block text-accent-primary">Impact.</span>
          </h1>

          <div className="mt-8 max-w-xl" data-aos="fade-up" data-aos-delay="300">
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Bergabunglah dengan ribuan mahasiswa yang mengubah kampus — satu
              langkah kecil pada satu waktu.
            </p>

            <div className="mt-6 flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="400">
              <a href="#kontak" className="btn-primary">
                Gabung Gerakan <ArrowRight size={18} strokeWidth={1.5} />
              </a>
              <a href="#dampak" className="btn-secondary">
                Lihat Dampak Kami
              </a>
            </div>
          </div>
        </div>

        {/* Elemen dekoratif: foto lengkung kanan */}
        <div className="hidden lg:flex flex-col items-center w-72 lg:w-80 shrink-0" data-aos="zoom-out-left" data-aos-delay="300" data-aos-duration="1000">
          <div
            className="w-full aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative group"
            style={{ borderRadius: "50% 50% 24px 24px / 35% 35% 24px 24px" }}
          >
            {!badgeError ? (
              <img
                src="/images/hero-badge.jpg"
                alt="Kampus Universitas Nusantara"
                className="img-duotone transition-transform duration-700 group-hover:scale-105"
                onError={() => setBadgeError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent-primary/10">
                <Building2 size={40} strokeWidth={1.2} className="text-accent-primary/50" />
              </div>
            )}
          </div>
          <span className="inline-block mt-6 text-xs font-medium text-text-secondary bg-bg-base/80 px-4 py-2 rounded-full border border-white/10 shadow-lg backdrop-blur-md" data-aos="fade-up" data-aos-delay="700">
            Universitas Nusantara
          </span>
        </div>
      </div>
    </section>
  );
}
