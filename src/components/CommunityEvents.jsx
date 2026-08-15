// ============================================
// KOMPONEN: CommunityEvents
// ============================================
// Testimoni (1 card besar dengan foto) + grid event 4 kolom dengan filter

import { useState } from "react";
import { Users, ArrowRight, Image as ImageIcon } from "lucide-react";
import eventsData from "../data/eventsData";

const eventFilters = ["Semua", "Workshop", "Volunteer", "Campaign"];
const categoryColor = {
  Volunteer: "bg-accent-primary",
  Workshop: "bg-accent-cyan",
  Campaign: "bg-accent-primary",
};

export default function CommunityEvents() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [imgError, setImgError] = useState(false);

  const filteredEvents =
    activeFilter === "Semua"
      ? eventsData
      : eventsData.filter((e) => e.kategori === activeFilter);

  return (
    <section id="komunitas" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div data-aos="fade-up">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            Komunitas
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-10">
            <span className="text-text-primary">Komunitas & </span>
            <span className="text-accent-primary">Event</span>
          </h2>
        </div>

        {/* Testimoni besar dengan foto */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] glass-panel overflow-hidden mb-12 lg:max-h-[350px]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* KIRI: TEKS */}
          <div className="p-6 sm:p-8 md:p-10 relative bg-bg-base">
            {/* Tanda Kutip Besar di Background */}
            <div
              className="absolute top-2 left-6 md:left-10 text-[6rem] sm:text-[9rem] leading-none font-black select-none pointer-events-none"
              aria-hidden="true"
              style={{ color: "rgb(122, 155, 92)", opacity: "0.07" }}
            >
              &ldquo;
            </div>

            {/* Konten Teks */}
            <div className="relative z-10 pt-6 md:pt-8">
              <p className="text-base sm:text-lg md:text-2xl lg:text-[1.45rem] font-medium text-[#E8EDE4] leading-snug mb-6 md:mb-8">
                "Awalnya aku pikir gerakan kayak gini cuma formalitas kampus.
                Tapi setelah ikut Campus Clean pertama, aku sadar dampaknya
                beneran nyata — dan yang lebih penting, aku ngerasa bagian dari
                sesuatu yang berarti."
              </p>

              {/* Profil */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#7A9B5C]/25 flex items-center justify-center text-[#B8E986] font-bold text-lg flex-shrink-0">
                  R
                </div>
                <div>
                  <p className="text-[#E8EDE4] font-semibold text-sm">
                    Rizky Aditya
                  </p>
                  <p className="text-[#9BA894] text-xs mt-0.5">
                    Teknik Sipil 2023 · Koordinator Campus Clean
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: FOTO + GRADASI */}
          <div className="relative bg-[#111811] overflow-hidden">
            {!imgError ? (
              <>
                {/* Foto */}
                <img
                  src="/images/bagus.jpg"
                  alt="Mahasiswa berkumpul dalam kegiatan komunitas"
                  className="w-full h-full object-cover object-center opacity-75"
                  style={{ objectPosition: "center 30%" }}
                  onError={() => setImgError(true)}
                />

                {/* EFEK GRADASI INLINE */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(13, 26, 13, 0.8) 0%, rgba(13, 26, 13, 0.4) 40%, rgba(13, 26, 13, 0) 70%)",
                  }}
                ></div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon
                  size={32}
                  strokeWidth={1.2}
                  className="text-accent-primary/40"
                />
              </div>
            )}
          </div>
        </div>

        {/* Event mendatang */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-xl font-bold text-text-primary">
            Event Mendatang
          </h3>
          <div className="flex flex-wrap gap-2">
            {eventFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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

        <div
          key={activeFilter}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in"
        >
          {filteredEvents.map((event, index) => (
            <article
              key={event.id}
              className="glass-panel !rounded-2xl p-5 group cursor-pointer hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 400}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${categoryColor[event.kategori] || "bg-accent-primary"}`}
                />
                <span className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">
                  {event.kategori}
                </span>
              </div>
              <h4 className="font-bold text-text-primary mb-2 transition-colors duration-300 group-hover:text-accent-primary">
                {event.nama}
              </h4>
              <p className="text-xs text-text-secondary mb-1">
                {event.tanggal}
              </p>
              <p className="text-xs text-text-secondary mb-4">{event.lokasi}</p>

              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Users size={12} strokeWidth={1.5} /> {event.peserta} peserta
                </span>
                <a
                  href="#kontak"
                  className="inline-flex items-center justify-center hover:text-accent-glow"
                >
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="text-accent-primary transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-sm text-text-secondary text-center mt-10">
            Belum ada event di kategori ini.
          </p>
        )}

        <p className="text-xs text-text-secondary/60 mt-6 italic">
          *Testimoni dan tanggal bersifat ilustratif untuk kebutuhan kompetisi.
        </p>
      </div>
    </section>
  );
}
