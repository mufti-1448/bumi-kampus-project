import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-8 mb-6">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-full bg-[#7A9B5C] flex items-center justify-center">
                <Leaf size={14} strokeWidth={2} className="text-[#0A0F0A]" />
              </div>
              <span className="font-black tracking-[0.12em] uppercase text-sm text-text-primary">
                Bumi Kampus
              </span>
            </div>
            <p className="text-[#9BA894] text-xs">
              Small Actions. Collective Impact.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-start sm:justify-end w-full">
              <a
                href="#tentang"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Tentang
              </a>
              <a
                href="#program"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Program
              </a>
              <a
                href="#dampak"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Dampak
              </a>
              <a
                href="#komunitas"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Komunitas
              </a>
              <a
                href="#kontak"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Kontak
              </a>
            </nav>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-start sm:justify-end w-full">
              <a
                href="#"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-[#9BA894] text-xs hover:text-[#E8EDE4] transition-colors duration-200 whitespace-nowrap"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-[#9BA894] text-xs text-left">
            © 2026 Bumi Kampus. Gerakan mahasiswa untuk kampus berkelanjutan.
          </p>
        </div>
      </div>
    </footer>
  );
}
