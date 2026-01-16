# 🛡️ ZeroCloud Compress

**ZeroCloud Compress** adalah aplikasi kompresi gambar berbasis web yang mengutamakan privasi. Seluruh proses kompresi dilakukan sepenuhnya di sisi klien (*client-side*), sehingga file tidak pernah meninggalkan perangkat pengguna dan tidak pernah diunggah ke server mana pun.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Nuxt](https://img.shields.io/badge/framework-Nuxt%203-green.svg)
![TailwindCSS](https://img.shields.io/badge/styling-TailwindCSS-38bdf8.svg)
![Deployment](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)

---

## ✨ Fitur Utama

* **🔒 Privasi Mutlak**: Kompresi dilakukan 100% di browser menggunakan JavaScript. Tidak ada pengiriman data ke server.
* **🌍 Dukungan Multibahasa**: Mendukung 7 bahasa (Indonesia, Inggris, Mandarin, Spanyol, Prancis, Hindi, dan Arab) dengan dukungan layout RTL.
* **⚡ Performa Tinggi**: Dibuat dengan Nuxt 3 dan TailwindCSS untuk antarmuka yang ringan dan responsif.
* **📊 Kontrol Kualitas**: Pengaturan tingkat kompresi variabel untuk menyeimbangkan ukuran file dan kualitas visual.
* **📦 Batch Download**: Mendukung kompresi massal dan unduhan sekaligus dalam format file ZIP.
* **🛡️ Limit Harian**: Sistem pelacakan penggunaan harian berbasis lokal untuk manajemen sumber daya perangkat.

---

## 🚀 Teknologi Utama

* **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3)
* **State Management**: [Pinia](https://pinia.vuejs.org/)
* **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
* **Icons**: [Lucide Vue Next](https://lucide.dev/)
* **Styling**: [TailwindCSS](https://tailwindcss.com/)

---

## 📁 Struktur Proyek

* `app/components/`: Komponen UI (Navbar, Dropzone, Manager).
* `app/stores/`: Manajemen state aplikasi menggunakan Pinia.
* `app/composables/`: Logika bisnis (validasi file, optimasi gambar).
* `i18n/locales/`: Berkas JSON untuk lokalisasi bahasa global.
* `public/`: Aset statis dan konfigurasi SEO.

---

## 📝 Konfigurasi Utama

Aplikasi ini dikonfigurasi untuk performa optimal di platform modern:
* **Target Deployment**: Vercel Edge/Serverless.
* **SEO & Metadata**: Teroptimasi dengan Title Bar statis "ZeroCloud".
* **i18n Strategy**: Menggunakan strategi `no_prefix` untuk URL yang bersih dan SEO-friendly.

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi [MIT License](https://opensource.org/licenses/MIT).

---
Dibuat dengan ❤️ untuk keamanan privasi pengguna.
