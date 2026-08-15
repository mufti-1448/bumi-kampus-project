// ============================================
// KOMPONEN: Navbar
// ============================================
// Menu 6 item: Tentang, Program, Dampak, Dokumentasi, Komunitas, Kontak.
// Navbar transparan saat di atas Hero, berubah solid + blur setelah
// user scroll melewati threshold (80px).
// Menu aktif di-highlight pakai teknik "scrollspy": deteksi posisi tepi
// atas tiap section relatif ke garis navbar, bukan sekadar visibility.

import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

const menuItems = [
  { label: "Tentang", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Dampak", href: "#dampak" },
  { label: "Dokumentasi", href: "#dokumentasi" },
  { label: "Komunitas", href: "#komunitas" },
  { label: "Kontak", href: "#kontak" },
];

// Sedikit lebih besar dari tinggi navbar (h-16 = 64px), memberi toleransi
// supaya perpindahan highlight terasa pas, bukan telat/kepagian.
const NAVBAR_OFFSET = 100;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set posisi awal saat pertama mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-base/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a
          href="#"
          className="flex items-center gap-2 font-bold text-text-primary"
        >
          <span className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Leaf size={16} strokeWidth={1.5} className="text-accent-primary" />
          </span>
          BUMI KAMPUS
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#kontak" className="hidden lg:inline-flex btn-primary text-sm">
          Gabung Sekarang
        </a>

        <button
          className="lg:hidden text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-bg-base border-t border-white/5 px-4 py-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block text-text-secondary transition-colors hover:text-text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontak"
            className="btn-primary text-sm mt-4 w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            Gabung Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
