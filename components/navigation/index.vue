<template lang="pug">
  div
    v-navigation-drawer(v-model="sidebarMenu" app fixed :permanent="sidebarMenu")
      
      //- INFO PROFILE
      template(v-slot:prepend)
        v-list(dense color="secondary" dark)
          v-list-item(link)
            v-list-item-content
              v-list-item-title.light-1--text.text-body-1.font-family-raleway-bold {{ user.auth ? user.name : 'Cesion Cerrada' }}
              //- v-list-item-subtitle.text-caption.font-family-raleway-medium.light-2--text {{ user.auth ? user.email : 'example app' }}

      //- LINKS MENU
      v-list.pt-0
        div(v-for="(link, i) in links" :key="i" link)
          div(v-if="link.auth === user.auth")
            v-tooltip(v-if="!link.subLinks" bottom)
              template(v-slot:activator="{ on, attrs }")
                v-list-item(@click="$emit('closeNavbar')" v-bind="attrs" v-on="on" :key="i" :to="link.to" active-class="'border'")
                  v-list-item-action
                    v-icon(small :color="link.icon.color") {{ link.icon.name }}
                  v-list-item-title.dark-2--text.text-body-1.font-family-raleway-bold(v-text="link.text")
              span.font-family-raleway-bold {{ link.span }}

            v-list-group(v-else :key="link.text" no-action multiple :append-icon="'expand_more'")
              template(v-slot:activator)
                v-tooltip(bottom)
                  template(v-slot:activator="{ on, attrs }")
                    v-list-item(v-bind="attrs" v-on="on")
                      v-list-item-action
                        v-icon(small :color="link.icon.color") {{ link.icon.name }}
                      v-list-item-title.dark-2--text.text-body-1.font-family-raleway-bold {{ link.text }}
                  span.font-family-raleway-bold {{ link.span }}

              div(v-for="sublink in link.subLinks" :key="sublink.text")
                v-tooltip(bottom)
                  template(v-slot:activator="{ on, attrs }")
                    v-list-item(:to="sublink.to" v-bind="attrs" v-on="on"  @click="$emit('closeNavbar')")
                      v-list-item-title.dark-2--text.text-body-2.font-family-raleway-medium.text-truncate(v-text="sublink.text")
                  span.font-family-raleway-bold {{ sublink.span }}
      
      //- ACTIONS NAVIGATION DRAWER
      template(v-slot:append)
        div(class="pa-2")
          template
            v-btn.mt-2.text-capitalize.font-family-raleway-bold( v-if="user.auth" @click="$emit('closeNavbar'), dialogCloseSesion = true" large block dark rounded color="primary")
              div LOGOUT
              v-icon power_settings_new

    //- MODAL CLOSE SESION
    v-dialog(v-model="dialogCloseSesion" max-width="290")
      v-card.rounded-xl
        v-card-title.headline.primary.white--text.font-family-raleway-bold 
          v-btn(icon dark @click="dialogCloseSesion = false" ).mr-2
            v-icon close
          div Close Sesion
        

        v-card-text.font-family-raleway-bold.mt-5 Confirm close the sesion ??

        v-card-actions.d-flex.flex-column
          v-spacer
          v-btn.dark.font-family-raleway-bold.text-capitalize(color="secondary" block rounded @click="dialogCloseSesion = false, closeSession(), $emit('closeNavbar')") Acept
          

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Navigation',
  props: {
    sidebarMenu: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  data() {
    return {
      dialogCloseSesion: false,
      links: [
        {
          text: "Home",
          span: "Go to home",
          icon: {
            name: "home",
            color: "darken-1",
          },
          to: "/",
          auth: false,
        },
        {
          icon: {
            name: "admin_panel_settings",
            color: "darken-2",
          },
          text: "Admin",
          span: "Click me",
          to: "/",
          auth: true,
          subLinks: [
            {
              text: "Users",
              span: "Go to admin users",
              icon: {
                name: "far fa-admin",
                color: "darken-2",
              },
              to: "/",
            },
          ],
        },
        {
          text: "Dashboard",
          span: "Go to dashboard",
          icon: {
            name: "dashboard",
            color: "darken-1",
          },
          to: "/",
          auth: true,
        }
      ],
    }
  },
  methods: {
    ...mapActions({
        closeSession: 'user/closeSession'
    }),
  },
}
</script>

<style lang="scss" scoped>

.v-navigation-drawer {

  div.v-navigation-drawer__prepend>div {
    // box-shadow: 0px 5px 0px 0px var(--v-secondary-base);
  }

  div.v-list-group__header {
    padding-left: 0px !important;

    div.v-list-item {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }

    div.v-list-item__icon {
      margin-left: 0px !important;
    }
  }

  div.v-list-group__items {
    a.v-list-item {
      padding-left: 50px !important;
    }
  }

  div.v-list-item__action {
    margin-right: 15px !important;
  }

  div.v-list-group__header__append-icon {
    min-width: 0px !important;
  }
}

.v-navigation-drawer {
    will-change: initial;
}
</style>
