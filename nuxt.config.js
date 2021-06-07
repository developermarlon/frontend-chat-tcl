import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - TCL',
    title: 'frontend',
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Example. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quis dignissimos necessitatibus architecto porro similique explicabo consectetur qui' },
      { hid: 'theme-color', name: 'theme-color', content: '#000000' },
      { hid: 'og:url', property: 'og:url', content: "https://developer-test-front.netlify.app" },
      { hid: 'og:description', name: 'og:description', content: 'Example. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quis dignissimos necessitatibus architecto porro similique explicabo consectetur qui' },
      {hid: 'og:image', property: 'og:image', content: '/icon.png'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/fonts.css',
    '@/assets/css/general-config.css',
    '@fortawesome/fontawesome-free/css/all.css',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/persistedstate.js'},
    {src: '~/plugins/socket.client.js'},
    { src: "~/plugins/vue2-editor", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://backend-chat-tcl.herokuapp.com' : 'http://192.168.0.105:3000',
  },
  loading: { color: colors.blueGrey.darken1, height: '5px', throttle: 0 },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  env: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://backend-chat-tcl.herokuapp.com' : 'http://192.168.0.105:3000'
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es',
      name: 'Chat TCL'
    },
    icon: {
      fileName: 'icon.png'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: false,
    customVariables: [
      '@import ~/assets/scss/vuetify.scss',
      '@import ~/assets/scss/texts.scss',
      '@import ~/assets/scss/general-config.scss',
      '@import ~/assets/scss/components.scss'
    ],
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#FF0013',
          secondary: '#000000',
          background: '#f4f4f4',
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          'custom-blue': '#2177B6',
          'custom-green': '#1A9079',
          'custom-red': '#A63D40',
          'dark-1': '#606060',
          'dark-2': '#727272',
          'dark-3': '#939393',
          'light-1': '#ffffff',
          'light-2': '#ececec',
          'light-3': '#dedede'
        },
      }
    },
    treeShake: true,
    customProperties: true,
    icons: {
      iconfont: 'fa',
    }
  },
  server: {
    host: '0', // default: localhost
    port: 8080
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
