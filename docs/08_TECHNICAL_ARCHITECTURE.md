# 08_TECHNICAL_ARCHITECTURE

## Ikhtisar
Dokumen ini menguraikan arsitektur teknis dan *stack* teknologi yang digunakan dalam proyek Bumi Kampus.

## Technology Stack

- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS (menggunakan arsitektur utilitas dengan modul kustom)
- **Animasi & Interaksi**:
  - CSS kustom untuk efek mikorinteraksi (*hover*, *glow*, *duotone*).
  - **AOS (Animate On Scroll)**: Digunakan secara luas untuk menganimasikan elemen (seperti efek `fade-up`, `zoom-in`) saat mereka masuk ke dalam area pandang (viewport) ketika pengguna menggulir halaman.
- **Peta (Custom Map Architecture)**:
  Peta dokumentasi tidak menggunakan *library* pihak ketiga melainkan menggunakan arsitektur *custom image layer* HTML5 interaktif.
  - *Panning & Zooming* dikelola via referensi statis dengan batas limit (*clampPosition*).
  - Skala *hotspot* dirender relatif (persentase `%`) tanpa membebani performa browser seperti *canvas* atau *leaflet*.

## Direktori & Struktur

- `src/components/`: Berisi semua komponen React yang modular (Hero, Navbar, ImpactCalculator, DocumentationMap, dll).
- `src/hooks/`: Berisi *custom hooks* (seperti `useIntersectionObserver`).
- `src/data/`: Berisi *mock data* (seperti `programsData.js`).
- `public/images/`: Menyimpan semua *asset* luring yang sudah dioptimalkan dan diberikan perlakuan (*treatment*) visual konsisten.
