<template lang="pug">
  v-app(id="inspire")
    Navbar
    v-slide-y-transition(mode="out-in")
      Nuxt
</template>

<script>
export default {
  name: 'Default',
  opts: {
    theme: {
      dark: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    $route() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  sockets: {
  }
}
</script>

<style style="scss" scoped>
  .hide-router {
    display: none !important;
  }
</style>