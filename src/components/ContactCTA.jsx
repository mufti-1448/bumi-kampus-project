import { useState } from "react";
import { CheckCircle2, Mail, MapPin, AtSign } from "lucide-react";

const contactInfo = [
  {
    label: "Email",
    value: "bumi-kampus@example.com",
    href: "mailto:bumi-kampus@example.com",
    icon: Mail,
  },
  {
    label: "Lokasi",
    value: "Universitas Nusantara",
    href: "#",
    icon: MapPin,
  },
  {
    label: "Instagram",
    value: "@bumikampus",
    href: "#",
    icon: AtSign,
  },
];

export default function ContactCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bgError, setBgError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <section
      id="kontak"
      className="relative py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {!bgError && (
          <img
            src="/images/bg-kontak.jpg"
            alt="Pemandangan hutan"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            onError={() => setBgError(true)}
            loading="lazy"
            decoding="async"
          />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/90 via-transparent to-bg-base/90" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <p
          className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-6"
          data-aos="fade-down"
        >
          Bergabung
        </p>

        <h2
          className="font-extrabold uppercase leading-[0.95] text-5xl sm:text-6xl lg:text-7xl"
          data-aos="fade-up"
        >
          <span className="block text-text-primary">Gabung</span>
          <span className="block text-accent-primary">Gerakannya</span>
          <span className="block text-text-primary">Sekarang</span>
        </h2>

        <p
          className="mt-8 text-text-secondary max-w-lg mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Satu email. Ribuan langkah ke depan. Jadilah bagian dari gerakan
          mahasiswa yang mengubah kampus.
        </p>

        {submitted ? (
          <div
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-4 text-accent-primary"
            data-aos="zoom-in"
          >
            <CheckCircle2 size={22} strokeWidth={1.5} />

            <span className="text-sm font-medium text-text-primary">
              Terima kasih! Kamu akan segera dihubungi lewat email.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="email@kampus.ac.id"
                aria-invalid={!!error}
                aria-describedby={error ? "email-error" : undefined}
                className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-glow/50"
              />

              {error && (
                <p
                  id="email-error"
                  className="text-xs text-red-400 mt-2 text-left px-2"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary justify-center whitespace-nowrap"
            >
              Gabung Sekarang
            </button>
          </form>
        )}

        <div className="mt-10" data-aos="fade-up" data-aos-delay="500">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-6">
            Informasi Kontak
          </p>

          <div className="flex justify-center items-center gap-6 sm:gap-8">
            {contactInfo.map((contact) => {
              const Icon = contact.icon;

              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="group relative"
                  aria-label={contact.label}
                >
                  {/* Icon Container - hanya icon, tanpa label & value */}
                  <div
                    className={`
                      w-14 h-14 sm:w-16 sm:h-16 
                      rounded-2xl 
                      bg-white/[0.03] 
                      border border-white/10 
                      flex items-center justify-center
                      hover:bg-white/[0.06] 
                      hover:border-accent-glow/30
                      hover:-translate-y-1
                      hover:shadow-lg
                      transition-all duration-300
                      group-hover:shadow-accent-glow/10
                    `}
                  >
                    {Icon ? (
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className="text-text-secondary group-hover:text-accent-glow transition-colors duration-300"
                      />
                    ) : (
                      <span className="text-xl font-bold text-text-secondary group-hover:text-accent-glow transition-colors duration-300">
                        @
                      </span>
                    )}
                  </div>

                  {/* Tooltip label (muncul saat hover) */}
                  <span
                    className={`
                      absolute -bottom-8 left-1/2 -translate-x-1/2 
                      text-[10px] font-medium tracking-wider 
                      text-text-secondary/60 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300
                      whitespace-nowrap
                    `}
                  >
                    {contact.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
