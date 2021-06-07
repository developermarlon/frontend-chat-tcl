<template lang="pug">
    v-container.pa-0
        v-select(:items="rooms" color="red" v-model="selectRoom" label="ROOMS" solo).elevation-3.select-room.font-family-raleway-bold.rounded-lg
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'SelectRoom',
    data() {
        return {
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
        }),
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
