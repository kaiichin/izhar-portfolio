# Izhar Susilo Portfolio

Website portfolio untuk melamar internship. Live: https://izharsusilo.vercel.app

## Mau ganti teks / link? Cukup edit 1 file

Buka: `frontend/data/portfolio.ts`

- `PROFILE` → nama, email, GitHub, LinkedIn, WhatsApp, lokasi
- `PROJECTS` → tambah project = copy 1 blok `{ ... }`, ganti isinya
- `JOURNEY` → riwayat pendidikan / organisasi
- `CERTIFICATES` → tambah sertifikat = copy 1 blok, isi `href` path PDF di `public/certificates/`
- `ui` → judul halaman, label tombol/menu, metadata, dan pesan status

Tidak perlu buka file lain untuk ganti teks. Icon diatur otomatis di tiap halaman.

Untuk screenshot project, simpan gambar asli di `frontend/public/projects/`, lalu isi
`image` pada project yang sesuai, misalnya `/projects/nama-project.png`. Biarkan
`image: ""` jika belum ada screenshot; kartu akan menampilkan inisial, bukan gambar
project lain.

## Struktur folder (frontend/)

```text
frontend/
  data/portfolio.ts     ← EDIT DI SINI (semua teks website)
  app/
    page.tsx            ← About (ambil teks dari data)
    projects/page.tsx   ← Projects
    journey/page.tsx    ← Journey
    certificates/       ← Certificates
    contact/            ← Contact
    layout.tsx          ← judul tab browser + bungkus layout
    globals.css         ← pintu masuk style (jangan edit langsung)
    styles/             ← 1 file CSS per halaman (about.css, projects.css, ...)
  components/
    PortfolioLayout.tsx ← logo + menu + sidebar + dark mode
    Navbar.tsx          ← menu icon (About/Projects/Journey/Certificates)
    InteractiveLanyard.tsx ← kartu lanyard 3D (fisika, jangan disentuh kalau ragu)
    Reveal.tsx          ← animasi fade-in saat scroll
    TextType.tsx        ← efek ketikan judul
    Folder.tsx          ← folder skill yang bisa dibuka
    StarBorder.tsx      ← border animasi sidebar
  public/
    profile/            ← foto + logo
    resume/             ← file CV (Download CV ambil dari sini)
    certificates/       ← PDF sertifikat
    lanyard/            ← model 3D kartu (card.glb)
```

## Cara jalanin

```bash
cd frontend
npm install   # sekali saja
npm run dev   # buka http://localhost:3000
```

## Cara cek sebelum push

```bash
cd frontend
npm run test    # cek isi wajib ada
npm run lint    # cek error
npm run build   # pastikan bisa build
```

`npm run test` juga mengecek aset lokal, import CSS, dan teks JSX agar tetap
terpusat di file data. Pemeriksaan ini bukan pengganti tes interaksi browser.
Sebelum push, pastikan file CSS baru di `frontend/app/styles/` ikut dalam commit.

Untuk tes browser, jalankan server dengan `npm run dev` di terminal pertama,
lalu `npm run test:browser` di terminal kedua. Tes memakai Chrome/Chromium yang
sudah terpasang dengan profil sementara, tanpa mengunduh browser atau menulis
clipboard sistem. Tes mencakup semua halaman pada lebar desktop/mobile,
navigasi, tema, dan clipboard berhasil/ditolak/tidak tersedia. Jika browser tidak
terdeteksi, set `BROWSER_PATH` ke executable browser. Server selain port 3000
bisa dipilih lewat `PORTFOLIO_URL`.

Ubah `main` di GitHub → Vercel otomatis deploy (±1 menit).

## Aturan buat AI / kontributor

- Teks baru taruh di `data/portfolio.ts`, jangan hardcode di page.
- Style baru taruh di `app/styles/<halaman>.css`, jangan di `globals.css`.
- Satu library animasi saja: `motion` (jangan tambah framer-motion / gsap lagi).
- Komponen baru kasih komentar 2-3 baris cara pakainya (lihat contoh di Reveal.tsx).
- Sebelum bilang selesai: `npm run test` + `npm run lint` + `npm run build` harus hijau.
