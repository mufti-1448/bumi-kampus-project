// ============================================
// KOMPONEN: Navbar
// ============================================
// Catatan: menu hanya 5 item (Tentang, Program, Dampak, Komunitas, Kontak)
// mengikuti desain Figma asli — "Dokumentasi" (section 06) memang tidak
// dicantumkan di nav pada desain sumber. Ini mereproduksi gap navigasi
// yang sama seperti temuan audit sebelumnya, bukan lupa ditambahkan.

import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";

const menuItems = [
  { label: "Tentang", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Dampak", href: "#dampak" },
  { label: "Komunitas", href: "#komunitas" },
  { label: "Dokumentasi", href: "#dokumentasi" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-base/60 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a href="#" className="flex items-center gap-2 font-bold text-text-primary">
          <span className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Leaf size={16} strokeWidth={1.5} className="text-accent-primary" />
          </span>
          BUMI KAMPUS
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm text-text-secondary">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-text-primary transition-colors">
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
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-bg-base border-t border-white/5 px-4 py-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block text-text-secondary hover:text-text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#kontak" className="btn-primary text-sm mt-4 w-full justify-center" onClick={() => setIsOpen(false)}>
            Gabung Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
