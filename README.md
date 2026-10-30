# Portfolio Pribadi - Alviensyah Mohammad 🚀

Website portfolio pribadi sederhana yang dibangun dari awal (*from scratch*) murni menggunakan **HTML5 semantik**, **CSS3 modern**, dan **Vanilla JavaScript (ES6+)** tanpa bantuan framework (seperti Bootstrap, Tailwind, React, Vue) maupun library/CDN eksternal.

Proyek ini dibuat untuk memenuhi penugasan pembuatan website portfolio yang rapi, interaktif, responsif, dan mudah diperiksa.

---

## 📋 Ringkasan Penugasan & Pemenuhan Kriteria

| Kriteria Penugasan | Status | Keterangan |
| :--- | :---: | :--- |
| **Minimal 3 Halaman Saling Terhubung** | ✅ **Terpenuhi** | Memiliki 3 halaman utama: `index.html` (Beranda), `projects.html` (Proyek), dan `contact.html` (Kontak) yang saling tertaut melalui navbar navigasi responsif dan tombol aksi. |
| **Minimal 2 Fitur Interaktif JavaScript Event** | ✅ **Sangat Terpenuhi (9 Fitur)** | Menerapkan beragam JavaScript Events: `click`, `input`, `submit`, `scroll`, `keydown`, dan `DOMContentLoaded`. |
| **Tampilan Rapi, Responsif & Estetik** | ✅ **Terpenuhi** | Menggunakan CSS Grid, Flexbox, Media Queries (Desktop, Tablet, Mobile), dan palet warna modern bertema gelap/terang. |
| **Tanpa Framework / Library Tambahan** | ✅ **100% Native** | Seluruh kode HTML, CSS, dan JS ditulis murni tanpa dependensi luar. |

---

## 📂 Struktur File & Folder

```text
my-portfolio/
├── index.html          # Halaman Beranda (Hero, Bio, Skills, Sorotan Proyek)
├── projects.html       # Halaman Proyek (Koleksi Proyek, Filter Kategori, Pencarian, Modal)
├── contact.html        # Halaman Kontak (Formulir Validasi, Salin Email, Media Sosial, FAQ)
├── css/
│   └── style.css       # Seluruh styling, CSS Variables (Dark/Light Theme), Grid, & Responsivitas
├── js/
│   └── main.js         # Logika interaktivitas murni (Theme, Filter, Modal, Validasi, dsb.)
├── assets/
│   ├── icons/          # Folder asset icon (jika dibutuhkan)
│   └── images/         # Folder asset gambar (jika dibutuhkan)
└── README.md           # Dokumentasi lengkap proyek
```

---

## 🌟 Fitur-Fitur Interaktif JavaScript

Website ini dilengkapi dengan 9 fitur interaktif berbasis JavaScript native:

1. **Dark & Light Mode Switcher (`click`, `localStorage`)**
   - Mengubah tema tampilan dari Gelap (*default*, warna aksen keemasan `#e2b714`) ke Terang.
   - Pilihan pengguna disimpan ke `localStorage` sehingga preferensi tema tidak hilang saat berganti halaman.

2. **Menu Navigasi Mobile Hamburger (`click`)**
   - Menampilkan dropdown navigasi yang mulus pada layar smartphone/tablet.
   - Otomatis tertutup ketika link menu diklik atau ketika area di luar menu ditekan.

3. **Salam Waktu Dinamis (*Dynamic Greeting*) (`DOMContentLoaded`)**
   - Menyapa pengunjung secara otomatis berdasarkan waktu lokal mereka:
     - 04.00 - 10.59: *Selamat Pagi ☀️*
     - 11.00 - 14.59: *Selamat Siang 🌤️*
     - 15.00 - 17.59: *Selamat Sore 🌇*
     - 18.00 - 03.59: *Selamat Malam 🌙*

4. **Filter Kategori Proyek (`click`)**
   - Memfilter proyek berdasarkan kategori `Semua`, `Web App`, dan `UI/Design` secara instan menggunakan manipulasi class DOM.

5. **Pencarian Proyek Real-time (`input`)**
   - Pengunjung dapat mengetikkan kata kunci pada kolom pencarian untuk memfilter judul, deskripsi, atau tag teknologi proyek secara instan.

6. **Modal Detail Proyek Interaktif (`click`, `keydown Escape`)**
   - Menampilkan pop-up dialog rincian fitur utama dan teknologi proyek ketika tombol *"Detail Proyek"* ditekan.
   - Dapat ditutup melalui tombol silang (`×`), klik latar belakang (*backdrop*), atau dengan menekan tombol keyboard **Escape**.

7. **Validasi Formulir & Real-time Character Counter (`submit`, `input`)**
   - Menghitung jumlah karakter textarea pesan secara langsung (`0 / 300`).
   - Melakukan validasi kelengkapan data, format regex email, dan panjang pesan minimum dengan pesan notifikasi dinamis (sukses / error).

8. **Salin Alamat Email ke Clipboard (`click`)**
   - Menyalin alamat email ke clipboard pengunjung dalam satu kali klik dengan animasi indikator *"✓ Tersalin!"*.

9. **FAQ Accordion Interaktif (`click`)**
   - Membuka dan menutup jawaban pertanyaan yang sering diajukan secara akordeon dengan indikator panah berputar.

10. **Tombol Scroll to Top (`scroll`, `click`)**
    - Tombol melayang (*floating button*) yang otomatis muncul ketika halaman digulir lebih dari 300px dan mengembalikan posisi layar ke paling atas secara halus (*smooth scroll*).

---

## 🎨 Konsep Desain & Gaya Visual

- **Palet Warna:**
  - **Aksen Utama:** `#e2b714` (Kuning Emas / Elegan dan Modern terinspirasi Monkeytype).
  - **Dark Mode Surface:** `#1e1e24` dan `#26262e` dengan teks `#d1d0c5`.
  - **Light Mode Surface:** `#f8fafc` dan `#ffffff` dengan teks `#0f172a`.
- **Tipografi:** System UI Font modern yang cepat dimuat dan tajam di layar Retina/High-DPI.
- **Ikon:** Menggunakan SVG inline murni yang tajam, ringan, dan tidak membutuhkan koneksi internet.

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Tidak memerlukan instalasi package manager (`npm` / `yarn`) maupun build step.

### Cara 1: Buka Langsung di Browser
1. Unduh atau *clone* repository ini:
   ```bash
   git clone https://github.com/Haku47/my-portfolio.git
   ```
2. Buka folder `my-portfolio`.
3. Klik ganda pada file `index.html` untuk langsung membuka di peramban favorit Anda (Chrome, Edge, Firefox, Safari).

### Cara 2: Menggunakan Live Server (VS Code)
1. Buka folder proyek di Visual Studio Code.
2. Klik kanan pada `index.html` dan pilih **Open with Live Server**.

### Cara 3: Menggunakan Python Server
```bash
python -m http.server 3000
```
Buka browser di `http://localhost:3000`.

---

## 👤 Identitas Pengembang

- **Nama:** Alviensyah Mohammad
- **Fokus:** Rekayasa Perangkat Lunak & Frontend Web Development
- **GitHub:** [@Haku47](https://github.com/Haku47)
- **LinkedIn:** [alvien97](https://www.linkedin.com/in/alvien97/)
- **Instagram:** [@alvien1939](https://www.instagram.com/alvien1939)

---
*Dibuat dengan dedikasi dan kode murni untuk penugasan Web Portfolio.*

