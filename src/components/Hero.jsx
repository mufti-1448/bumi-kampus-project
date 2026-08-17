import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [bgError, setBgError] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {!bgError && (
        <img
          src="/images/hero.jpg"
          alt="Mahasiswa berkumpul di lapangan kampus"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
          style={{
            filter:
              "contrast(1.2) brightness(0.85) sepia(0.3) hue-rotate(-10deg) saturate(1.1)",
          }}
          onError={() => setBgError(true)}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-20 mt-0 lg:mt-0">
        <div className="max-w-[66rem] w-full">
          <h1
            className="font-black leading-none tracking-tighter uppercase mb-10 md:mb-14"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="block text-[clamp(3.5rem,9.5vw,12rem)] text-[#E8EDE4]">
              SMALL
            </span>

            <span
              className="block text-[clamp(3.2rem,9.5vw,12rem)]"
              style={{
                WebkitTextStroke: "2px #9ecb71",
                color: "transparent",
              }}
            >
              ACTIONS.
            </span>

            <span className="block text-[clamp(2.4rem,6.8vw,8.5rem)] text-[#E8EDE4] mt-2 md:mt-3">
              COLLECTIVE
            </span>

            <span className="block text-[clamp(2.4rem,6.8vw,8.5rem)] text-[#B8E986]">
              IMPACT.
            </span>
          </h1>

          <div
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-end lg:gap-8"
            data-aos="fade-up"
            data-aos-delay="180"
            data-aos-duration="700"
          >
            <p className="max-w-xl text-text-secondary text-base sm:text-lg leading-relaxed lg:mr-auto">
              Bergabunglah dengan ribuan mahasiswa yang mengubah kampus — satu
              langkah kecil pada satu waktu.
            </p>

            <div className="flex flex-wrap gap-4 lg:justify-end lg:ml-auto">
              <a href="#kontak" className="btn-primary">
                Gabung Gerakan <ArrowRight size={18} strokeWidth={1.5} />
              </a>
              <a href="#dampak" className="btn-secondary">
                Lihat Dampak Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
