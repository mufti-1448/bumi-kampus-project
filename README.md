# Bumi Kampus

Bumi Kampus adalah platform digital untuk mengajak mahasiswa membangun kebiasaan kecil yang menghasilkan dampak lingkungan secara kolektif di kampus.

> Small Actions. Collective Impact.

## Tentang Proyek

Website ini dirancang sebagai landing page interaktif untuk memperkenalkan gerakan Bumi Kampus, program keberlanjutan, dampak terukur, dokumentasi aktivitas, komunitas, dan ajakan bergabung.

## Fitur

- Navigasi responsif dengan anchor section
- Hero section dan call to action
- Informasi tentang aksi individu dan dampak kolektif
- Kalkulator dampak pribadi
- Filter program dan event
- Statistik dampak kampus
- Dokumentasi aktivitas serta peta hotspot kampus
- Form pendaftaran komunitas

## Teknologi

- React
- Vite
- Tailwind CSS
- Lucide React

## Menjalankan Project

```bash
npm install
npm run dev


## Panduan Kolaborasi Git

Gunakan GitHub untuk menyimpan progress dan bekerja bersama tanpa saling menimpa file.

### Clone Project

Untuk mengambil project ke laptop:

```bash
git clone https://github.com/mufti-1448/bumi-kampus-project.git
cd bumi-kampus-project
npm install
npm run dev
```

### Sebelum Mulai Mengubah Kode

Selalu ambil perubahan terbaru terlebih dahulu:

```bash
git pull origin main
```

### Buat Branch Sendiri

Jangan langsung mengubah branch `main`. Buat branch sesuai tugas, misalnya:

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

Setelah menyelesaikan satu bagian kecil:

```bash
git add .
git commit -m "feat: add responsive navbar"
git push -u origin feature/navbar
```

Gunakan pesan commit yang singkat dan menjelaskan perubahan, misalnya:

```text
feat: add impact calculator
fix: improve mobile navbar layout
docs: update project README
style: refine hero spacing
```

### Menggabungkan Perubahan

Setelah branch sudah rapi dan website berjalan baik, buat Pull Request di GitHub dari branch fitur ke `main`. Jangan menggabungkan perubahan jika masih ada error.

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
buat branch tugas
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