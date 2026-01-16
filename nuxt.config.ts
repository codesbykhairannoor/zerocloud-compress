export default defineNuxtConfig({
  modules: [
  '@pinia/nuxt',
  '@nuxtjs/tailwindcss',
  '@nuxtjs/i18n' // Tambahkan ini
],
i18n: {
  locales: [
    { code: 'en', file: 'en.json' },
    { code: 'id', file: 'id.json' }
  ],
  lazy: true,
  langDir: 'i18n/locales/',
  defaultLocale: 'id'
},
  // Tambahin ini:
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'ZeroCloud Compress',
      meta: [{ name: 'description', content: 'Private Client-side Image Compressor' }]
    }
  }
})