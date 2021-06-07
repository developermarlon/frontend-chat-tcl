<template lang="pug">
    v-container

        v-layout.mb-4
            v-flex.xs12
                ChatSelectRoom
        
        v-layout.align-stretch.wrap

            //- CONTAINER MESSAGES
            v-flex.xs12.sm8.elevation-15.rounded-lg.message-container.d-flex.flex-wrap.justify-end.flex-column
                div(id="your_div" ref="container-messages-scroll").pa-3
                    div(v-for="(item, idx) in messages" :key="idx" :max-width="400" dark :class="[`${item.type_user}`, (item.type_user === 'self' || item.type_user === 'moderator') ? 'align-self-end' : '']").pa-3.rounded-lg.mt-3.message
                        h5.font-family-raleway-bold.mb-0 {{item.id}}
                        p(v-html="item.message").font-family-raleway-bold.text-caption.mb-0

            //- CONTAINER USERS
            v-flex.xs12.sm4.pl-sm-4.mt-4.mt-sm-0.users-container
                v-layout.flex-column.elevation-15.rounded-lg
                    v-flex
                        v-btn(color="secondary" block).rounded-0.rounded-t-lg.font-family-raleway-bold USERS
                    v-flex.xs12.background-users.rounded-0.rounded-lg
                        v-list.rounded-lg
                            v-list-item-group(color="primary")
                                v-list-item(v-for="(item, idx) in users" :key="idx")
                                    v-list-item-icon
                                        v-icon(color="red lighten-3") account_circle
                                    v-list-item-content
                                        v-list-item-title(v-text="item").font-family-raleway-bold.text--secondary

        ChatSendMessage(v-on:message="sendMessage")
                
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Chat',
    data() {
        return {
            divScroll: null,
            messages: [],
            users: [this.$socket.id],
        }
    },
    watch: {
        'selected_room'() {
            this.$socket.emit('swith channel', this.selected_room)
            this.users = [this.$socket.id]
            this.messages = []
            this.resetScroll()
        }
    },
    computed: {
        ...mapGetters({
            'selected_room': 'chat/selected_room'
        }),
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
        async sendMessage(message) {
            await this.messages.push({type_user: 'self', message: message, id: this.$socket.id})
            await this.$socket.emit('send message', {room: this.selected_room, message: message, type_user: 'client'})
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
    $heightChat: 60vh;

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
            @include styleScroll(20px, var(--v-secondary-base));
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            & div.message {
                background: transparent;
                border: 1px solid var(--v-secondary-base);
                color: var(--v-secondary-base);
                width: 100%;
                max-width: 400px;
                display: inline-block;

                &.moderator {
                    background: var(--v-primary-base);
                    border: none;
                    color: white;
                    align-self: flex-end;
                }

                &.self {
                    background: var(--v-secondary-base);
                    border: none;
                    color: white;
                    align-self: flex-end;
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
