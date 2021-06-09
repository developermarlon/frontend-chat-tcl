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
        }
    },
    computed: {
        ...mapGetters({
            'selected_room': 'chat/selected_room',
            'allmessages': 'chat/allmessages'
        }),
        selectRoom:{
            get () {
                return this.selected_room
            },
            set (value) {
                this.updateRoom(value)
            }
        },
        rooms(){
            let roomsDetected = []
            roomsDetected = this.allmessages.reduce((acc, item) => {
                let count = acc.filter((room) => room == item.room).length
                if(!count) acc.push(item.room)
                return acc
            }, [])
            if(roomsDetected.filter(item => item === this.$route.query.room).length === 0) roomsDetected.push(this.$route.query.room)
            if(roomsDetected.filter(item => item === this.selected_room).length === 0) roomsDetected.push(this.selected_room)
            return roomsDetected
        }
    },
    methods: {
        ...mapActions({
            'updateRoom': 'chat/updateRoom'
        }),
    },
    created() {
        
    },
    mounted() {
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
