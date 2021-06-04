<template lang="pug">
    v-container
        
        v-layout.align-stretch

            //- CONTAINER MESSAGES
            v-flex.xs8.elevation-15.rounded-lg.message-container.d-flex.flex-wrap.justify-end.flex-column
                div(id="your_div" ref="container-messages-scroll").pa-3
                    div(v-for="(item, idx) in messages" :key="idx")
                        v-card( :max-width="320" dark :class="[`${item.type_user}`, (item.type_user === 'self' || item.type_user === 'moderator') ? 'align-self-end' : '']").pa-3.rounded-lg.mt-3.message
                            h5.font-family-raleway-bold.mb-0 {{item.id}}
                            p(v-html="item.message").font-family-raleway-bold.text-caption.mb-0

            //- CONTAINER USERS
            v-flex.xs4.ml-5.users-container
                v-layout.flex-column.elevation-15.rounded-lg
                    v-flex
                        v-btn(color="secondary" block).rounded-0.rounded-t-lg.font-family-raleway-bold USERS
                    v-flex.xs12.background-users.rounded-0.rounded-b-lg
                        v-list
                            v-list-item-group(color="primary")
                                v-list-item(v-for="(item, idx) in users" :key="idx")
                                    v-list-item-icon
                                        v-icon(color="red lighten-3") account_circle
                                    v-list-item-content
                                        v-list-item-title(v-text="item").font-family-raleway-bold.text--secondary
        
        v-layout.mt-4.align-start

            //- SEND MESSAGE
            v-flex.xs8.elevation-15.rounded-lg.pa-3.message-send-container
                v-layout
                    v-flex.xs12
                        vue-editor(placeholder="Write Something..." v-model="message")
                    v-flex.ml-3
                        v-btn(color="secondary" @click="sendMessage").font-family-raleway-bold.rounded-lg SEND

            //- LOGOUT
            v-flex.xs4.ml-5.users-container
                v-btn(color="primary" block).rounded-lg.font-family-raleway-bold
                    div LOGOUT
                    v-icon power_settings_new
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Chat',
    data() {
        return {
            message: null,
            divScroll: null,
            messages: [],
            users: [this.$socket.id]
        }
    },
    computed: {
        ...mapGetters({
            'selected_room': 'chat/selected_room'
        })
    },
    watch: {
        'selected_room'() {
            this.$socket.emit('swith channel', this.selected_room)
            this.users = [this.$socket.id]
            this.resetScroll()
        }
    },
    sockets: {
        'user connected'(data) {
            this.$socket.emit('get clients', this.selected_room)
            this.messages.push({type_user: 'moderator', message: `user ${data.id} conected`, id: 'Connect'})
        },
        'user disconnected'(data) {
            this.$socket.emit('get clients', this.selected_room)
            this.messages.push({type_user: 'moderator', message: `user ${data.id} logged out`, id: 'Logged out'})
        },
        'get clients'(data) {
            console.log('obtiene usuarios')
            this.users = data
        },
        'get message'({id, type_user, message}) {
            this.messages.push({type_user, message, id})
            this.$nextTick(() => {
                this.resetScroll()
            })
        }
    },
    methods: {
        resetScroll() {
            this.divScroll = this.$refs['container-messages-scroll']
            this.divScroll.scrollTop = this.divScroll.scrollHeight;
        },
        initRoom() {
            this.$socket.emit('swith channel', this.selected_room)
            this.resetScroll()
        },
        async sendMessage() {
            await this.messages.push({type_user: 'self', message: this.message, id: this.$socket.id})
            await this.$socket.emit('send message', {room: this.selected_room, message: this.message, type_user: 'client'})
            this.message = null
            this.$nextTick(() => {
                this.resetScroll()
            })
        }
    },
    mounted() {
        this.initRoom()
    }
}
</script>

<style lang="scss" scoped>
    $backgroundContainers: rgb(251,251,251);
    $heightChat: 500px;

    @mixin styleScroll ($width, $color) {
        &::-webkit-scrollbar {
            background: white;
            width: $width;
            margin-right: 2px !important;
            border-radius: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 50px;
            background: $color;
            border: 4px solid white;  
        }
    }

    .message-container {
        background: $backgroundContainers;
        height: $heightChat;

        & > div {
            overflow-y: scroll;
            overflow-x: hidden;
            height: auto;
            margin-bottom: 10px;
            @include styleScroll(20px, rgba(0,0,0,.6));

            & div.message {
                background: rgba(0,0,0,.5);
                width: 100%;
                display: inline-block;

                &.moderator {
                    background: rgba(250, 0, 29, .6);
                    float: right;
                }

                &.self {
                    background: rgba(0, 0, 0, .8);
                    float: right;
                }
            }

        }
        
    }

    .users-container {
        & > div {
            height: 100%;
        }
        .background-users {
            background: $backgroundContainers;
            @include styleScroll(20px, rgba(0,0,0,.3));
        }
    }

    .message-send-container {
        background: $backgroundContainers;
    }


</style>
