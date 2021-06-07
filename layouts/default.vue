<template lang="pug">
  v-app(id="inspire" :dark="setTheme")
    v-app-bar(app color="white")
      v-app-bar-nav-icon(@click.stop="sidebarMenu = !sidebarMenu").mr-3
      v-img(:src="menu_icon" :width="80" :max-width="80" transition="scroll-x-reverse-transition").mr-5
        template(v-slot:placeholder)
            v-row.fill-height.ma-0(align="center" justify="center")
                v-progress-circular(indeterminate color="grey lighten-5")
      p(:max-width="150").mb-0.font-family-raleway-medium.text-caption.text--secondary.text-copy Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit purus, euismod eu eros et, volutpat ullamcorper diam.
      v-spacer
      v-btn(color="primary" fab small outlined)
        v-icon power_settings_new

    Navigation(:sidebarMenu="sidebarMenu" v-on:closeNavbar="closeNavbar")

    v-main.mb-15
      v-container(fluid :class="['fill-height align-start', (sidebarMenu && $vuetify.breakpoint.xs) ? 'hide-router' : '']")
        v-slide-y-transition(mode="out-in")
          Nuxt

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
      menu_icon: require('~/assets/images/navbar/TCL.png'),
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
  .text-copy {
    max-width: 600px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hide-router {
    display: none !important;
  }
</style>