<template lang="pug">
    v-container.fluid.pa-0
        v-container
            v-layout.align-center.justify-space-between.my-4
                v-flex.xs8
                    v-layout.align-center.justify-start
                        v-btn(dark small fab color="secondary").menu-button.mr-3.rounded-lg
                            v-icon menu
                        v-btn(dark small color="secondary" fab).menu-button.rounded-lg.mr-5
                            v-icon fas fa-home
                        v-img(:src="menu_icon" :width="100" :max-width="100" transition="scroll-x-reverse-transition").mr-3
                            template(v-slot:placeholder)
                                v-row.fill-height.ma-0(align="center" justify="center")
                                    v-progress-circular(indeterminate color="grey lighten-5")
                        v-flex
                            p.font-family-raleway-medium.text-caption.mb-0 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                v-flex.xs4.ml-5
                    v-select(:items="rooms" color="red" v-model="selectRoom" label="ROOMS" solo dense).elevation-15.select-room.font-family-raleway-bold.rounded-lg
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Navbar',
    data() {
        return {
            menu_icon: require('~/assets/images/navbar/TCL.svg'),
            rooms: [
                'ROOM 1',
                'ROOM 2',
                'ROOM 3',
                'ROOM 4'
            ]
        }
    },
    computed: {
        ...mapGetters({
            'selected_room': 'chat/selected_room'
        }),
        selectRoom:{
            get () {
                return this.selected_room
            },
            set (value) {
                this.updateRoom(value)
            }
        }
    },
    methods: {
        ...mapActions({
            'updateRoom': 'chat/updateRoom'
        })
    },
    created() {
        if(this.selected_room === null) this.updateRoom(this.rooms[0])
    }
}
</script>
<style lang="scss">
    //change components vuetify
    .v-list-item__title {
        font-family: "raleway bold" !important;
    }

    .menu-button {
        &.v-btn--fab.v-size--small{
            height: 50px !important;
            width: 50px !important;
        }
    }

    .select-room {
        .v-text-field__details {
            display: none;
        }
        .v-input__slot {
            margin-bottom: 0px !important;
            box-shadow: none !important;
        }
    }
</style>
<style lang="scss" scoped>

</style>
