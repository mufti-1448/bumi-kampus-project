// ============================================
// KOMPONEN: CommunityEvents
// ============================================
// Testimoni (1 card besar dengan foto) + grid event 4 kolom dengan filter

import { useState } from "react";
import { Users, ArrowRight, Image as ImageIcon } from "lucide-react";
import eventsData from "../data/eventsData";

const eventFilters = ["Semua", "Workshop", "Volunteer", "Campaign"];
const categoryColor = {
  Volunteer: "bg-accent-glow",
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
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">
            <span className="text-text-primary">Komunitas & </span>
            <span className="text-accent-glow">Event</span>
          </h2>
        </div>

        {/* Testimoni besar dengan foto */}
        <div className="glass-panel overflow-hidden grid sm:grid-cols-2 mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <span className="text-4xl text-accent-glow/40 font-serif leading-none mb-2">
              &ldquo;
            </span>
            <p className="text-base sm:text-lg text-text-primary leading-relaxed mb-6">
              Awalnya aku pikir gerakan kayak gini cuma formalitas kampus. Tapi
              setelah ikut Campus Clean pertama, aku sadar dampaknya beneran
              nyata — dan yang lebih penting, aku ngerasa bagian dari sesuatu
              yang berarti.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center font-semibold text-accent-glow">
                R
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Rizky Aditya
                </p>
                <p className="text-xs text-text-secondary">
                  Teknik Sipil 2023 · Koordinator Campus Clean
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[220px] bg-white/5 relative">
            {!imgError ? (
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop"
                alt="Mahasiswa berkumpul dalam kegiatan komunitas"
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
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
                    ? "bg-accent-glow text-bg-base"
                    : "bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event, index) => (
            <article
              key={event.id}
              className="glass-panel !rounded-2xl p-5"
              data-aos="fade-up" data-aos-delay={index * 100 + 400}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${categoryColor[event.kategori] || "bg-accent-primary"}`}
                />
                <span className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">
                  {event.kategori}
                </span>
              </div>
              <h4 className="font-bold text-text-primary mb-2">{event.nama}</h4>
              <p className="text-xs text-text-secondary mb-1">
                {event.tanggal}
              </p>
              <p className="text-xs text-text-secondary mb-4">{event.lokasi}</p>

              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Users size={12} strokeWidth={1.5} /> {event.peserta} peserta
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-accent-glow"
                />
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
