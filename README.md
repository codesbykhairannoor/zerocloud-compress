
# 🛡️ ZeroCloud Compress
> **Privacy-First, Client-Side Image Optimization Powerhouse.**

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview
**ZeroCloud Compress** is a modern, high-performance web application designed for one thing: compressing images without compromising your privacy. Unlike traditional tools, **your files never touch a server.** Everything happens right in your browser.

### Why ZeroCloud?
* **🔒 Absolute Privacy**: 100% client-side processing via JavaScript. Your data stays on your machine.
* **🌍 Global Ready**: Fully localized in 7 languages (EN, ID, CN, ES, FR, HI, AR) with native **RTL (Right-to-Left)** support.
* **⚡ Blazing Fast**: Powered by Nuxt 3's efficient engine and TailwindCSS for a buttery-smooth UI.
* **📦 Efficiency at Scale**: Compress multiple images simultaneously and grab them all in a single, organized ZIP file.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Variable Compression** | Fine-tune the quality vs. size ratio to get the perfect result. |
| **Smart Batching** | Process dozens of images at once without browser lag. |
| **Usage Tracking** | Localized daily limits to help manage your device resources. |
| **Zero Backend** | No database, no uploads, no tracking. Just pure performance. |
| **Modern UI** | Clean, minimalist interface with Lucide-powered iconography. |

---

## 🛠️ Built With

* **Core Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3)
* **State Management:** [Pinia](https://pinia.vuejs.org/)
* **Localization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
* **Icons:** [Lucide Vue Next](https://lucide.dev/)
* **Styling:** [TailwindCSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Project Architecture

```text
zerocloud-compress/
├── app/
│   ├── components/    # Reusable UI (Navbar, Dropzone, Manager)
│   ├── stores/        # Global state management via Pinia
│   ├── composables/   # Business logic (Image processing, Validation)
├── i18n/
│   └── locales/       # JSON translation files for global reach
├── public/            # Static assets and SEO configurations
└── nuxt.config.ts     # Optimized Nuxt settings & Compatibility V4

```

---

## ⚙️ Deployment & Configuration

This project is pre-configured for seamless deployment on **Vercel**.

* **Edge Optimized**: Utilizing Nuxt 3's latest rendering capabilities.
* **Clean URLs**: i18n `no_prefix` strategy for professional, SEO-friendly routing.
* **Scalability**: Ready to handle high traffic as processing power scales with the user's hardware.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Crafted with ❤️ for data sovereignty and speed.**

```

