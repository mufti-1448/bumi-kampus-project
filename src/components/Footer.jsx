// ============================================
// KOMPONEN: Footer
// ============================================

import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <Leaf size={16} strokeWidth={1.5} className="text-accent-primary" />
              </span>
              <span className="font-bold text-text-primary">BUMI KAMPUS</span>
            </div>
            <p className="text-sm text-text-secondary pl-10">Small Actions. Collective Impact.</p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <a href="#tentang" className="hover:text-text-primary">Tentang</a>
            <a href="#program" className="hover:text-text-primary">Program</a>
            <a href="#dampak" className="hover:text-text-primary">Dampak</a>
            <a href="#komunitas" className="hover:text-text-primary">Komunitas</a>
            <a href="#kontak" className="hover:text-text-primary">Kontak</a>
          </nav>

          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-text-primary">Kebijakan Privasi</a>
            <a href="#" className="hover:text-text-primary">Syarat & Ketentuan</a>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8" />

        <p className="text-sm text-text-secondary/70">
          © 2026 Bumi Kampus. Gerakan mahasiswa untuk kampus berkelanjutan.
        </p>
      </div>
    </footer>
  );
}
