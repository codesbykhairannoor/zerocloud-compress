// nuxt.config.ts
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

  // Konfigurasi Bahasa
  i18n: {
    lazy: true,
    langDir: 'locales', // folder di dalam app/locales
    strategy: 'no_prefix', // Biar URL gak berubah jadi /id atau /en (opsional)
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'id', file: 'id.json', name: 'Indonesia' }
    ],
    defaultLocale: 'id', // Default Bahasa Indonesia
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', 
    }
  },

  compatibilityDate: '2024-04-03'
})