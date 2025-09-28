// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  typescript: {
    strict: true
  },
  pages: true,
  ssr: true,
  srcDir: '.',
  dir: {
    pages: 'pages'
  },
  router: {
    options: {
      hashMode: false
    }
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      appName: 'Wells Info Management'
    }
  }
})
