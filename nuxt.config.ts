import { resolve } from 'path'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  // =========================
  // i18n CONFIG (FIXED)
  // =========================
  i18n: {
    lazy: true,

    // 🔒 PATH ABSOLUTE — biar gak dobel / geser lagi
    langDir: resolve(process.cwd(), 'i18n/locales'),

    strategy: 'no_prefix',

    locales: [
  {
    code: 'en',
    file: 'en.json',
    name: 'English'
  },
  {
    code: 'id',
    file: 'id.json',
    name: 'Indonesia'
  },
  {
    code: 'zh',
    file: 'zh.json',
    name: '简体中文' // Mandarin
  },
  {
    code: 'es',
    file: 'es.json',
    name: 'Español' // Spanyol
  },
  {
    code: 'fr',
    file: 'fr.json',
    name: 'Français' // Prancis
  },
  {
    code: 'hi',
    file: 'hi.json',
    name: 'हिन्दी' // Hindi
  },
  {
    code: 'ar',
    file: 'ar.json',
    name: 'العربية', // Arab
    dir: 'rtl' // Tambahan property buat handle layout Arab
  }
],

    defaultLocale: 'id',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  compatibilityDate: '2024-04-03'
})
