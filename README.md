# Bumi Kampus

Bumi Kampus adalah platform digital yang mengajak mahasiswa membangun kebiasaan kecil untuk menghasilkan dampak lingkungan secara kolektif di kampus.

> **Small Actions. Collective Impact.**

## Tentang Proyek

Website ini dirancang sebagai landing page interaktif untuk memperkenalkan gerakan Bumi Kampus, program keberlanjutan, dampak yang terukur, dokumentasi aktivitas, komunitas, serta ajakan bergabung.

## Rencana Fitur

- Navigasi responsif dengan anchor section
- Hero section dan call to action
- Informasi tentang aksi individu dan dampak kolektif
- Kalkulator dampak pribadi
- Filter program dan event
- Statistik dampak kampus
- Dokumentasi aktivitas dan peta hotspot kampus
- Form pendaftaran komunitas

## Teknologi

- React
- Vite
- Tailwind CSS

## Menjalankan Project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Website akan berjalan secara lokal pada alamat yang ditampilkan oleh Vite, biasanya:

```text
http://localhost:5173
```

## Panduan Kolaborasi Git

Gunakan GitHub untuk menyimpan progress dan bekerja bersama tanpa saling menimpa perubahan teman.

### Clone Project

Untuk mengambil project ke laptop:

```bash
git clone https://github.com/mufti-1448/bumi-kampus-project.git
cd bumi-kampus-project
npm install
npm run dev
```

### Sebelum Mulai Mengubah Kode

Selalu ambil perubahan terbaru dari branch utama:

```bash
git pull origin main
```

### Buat Branch Sendiri

Jangan langsung mengubah branch `main`. Buat branch sesuai tugas yang sedang dikerjakan:

```bash
git checkout -b feature/navbar
```

Contoh nama branch:

```text
feature/navbar
feature/hero
feature/calculator
feature/documentation-map
fix/mobile-layout
```

### Menyimpan Perubahan

Setelah menyelesaikan satu bagian kecil dan sudah mengeceknya di localhost:

```bash
git add .
git commit -m "feat: add responsive navbar"
git push -u origin feature/navbar
```

Gunakan pesan commit yang singkat dan jelas, misalnya:

```text
feat: add impact calculator
fix: improve mobile navbar layout
docs: update project README
style: refine hero spacing
```

### Menggabungkan Perubahan

Setelah branch sudah rapi dan website berjalan tanpa error, buat Pull Request di GitHub dari branch fitur ke `main`. Jangan menggabungkan perubahan yang belum diuji.

### File yang Tidak Boleh Di-push

Jangan memasukkan file berikut ke GitHub:

```text
node_modules/
dist/
.history/
.env
```

File-file tersebut sudah diatur melalui `.gitignore`.

### Alur Kerja Tim

```text
git pull origin main
        ↓
buat branch sesuai tugas
        ↓
kerjakan satu section
        ↓
tes di localhost
        ↓
git add + commit
        ↓
git push
        ↓
buat Pull Request ke main
```

## Status

Proyek masih dalam tahap pengembangan dan akan terus disempurnakan.
