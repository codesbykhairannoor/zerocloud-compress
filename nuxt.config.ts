export default defineNuxtConfig({
  // Konfigurasi Head untuk Title & Favicon
  app: {
    head: {
      title: 'ZeroCloud',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ZeroCloud - Cloud Compression Solution' }
      ],
      link: [
        // Panggil favicon dari folder public/
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=1' }
      ]
    }
  },

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
  // i18n CONFIG (FIXED FOR NUXT 4)
  // =========================
  i18n: {
    lazy: true,
    
    // Menggunakan path relatif sesuai standar Nuxt 4
    langDir: '../i18n/locales',

    strategy: 'no_prefix',
    defaultLocale: 'id',

    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'id', file: 'id.json', name: 'Indonesia' },
      { code: 'zh', file: 'zh.json', name: '简体中文' },
      { code: 'es', file: 'es.json', name: 'Español' },
      { code: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'hi', file: 'hi.json', name: 'हिन्दी' },
      { 
        code: 'ar', 
        file: 'ar.json', 
        name: 'العربية', 
        dir: 'rtl' 
      }
    ],

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  compatibilityDate: '2024-04-03'
})