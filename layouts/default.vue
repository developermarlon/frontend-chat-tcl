<template lang="pug">
  v-app(id="inspire" :dark="setTheme")
    v-app-bar(app color="white")
      v-app-bar-nav-icon(@click.stop="sidebarMenu = !sidebarMenu").mr-3
      v-img(:src="menu_icon" :width="70" :max-width="70" transition="scroll-x-reverse-transition").mr-3
        template(v-slot:placeholder)
            v-row.fill-height.ma-0(align="center" justify="center")
                v-progress-circular(indeterminate color="grey lighten-5")
      v-spacer
      v-btn(color="primary" fab small outlined)
        v-icon power_settings_new

    Navigation(:sidebarMenu="sidebarMenu" v-on:closeNavbar="closeNavbar")

    v-main.mb-15
      v-container(fluid :class="['fill-height align-start', (sidebarMenu && $vuetify.breakpoint.xs) ? 'hide-router' : '']")
        v-slide-y-transition(mode="out-in")
          Nuxt

    v-footer(color="secondary" :class="['', (sidebarMenu && $vuetify.breakpoint.xs) ? 'hide-router' : '']").pb-15
      v-layout(wrap).ma-5
        v-flex.xs12 
          h5.font-family-raleway-bold.white--text.text-center.text-body-2 Lorem ipsum dolor ™
        v-flex.xs12.mt-2
          h6.font-family-raleway-medium.white--text.text-center.text-caption Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      //- v-switch(:label="`Dark Theme`" v-model="goDark")
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
      menu_icon: require('~/assets/images/navbar/TCL.svg'),
      goDark: false,
      sidebarMenu: false,
    };
  },
  methods: {
    closeNavbar() {
      this.sidebarMenu = false
    }
  },
  computed: {
    setTheme() {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  },
  watch: {
    $route() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style style="scss" scoped>
  .hide-router {
    display: none !important;
  }
</style>