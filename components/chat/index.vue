<template lang="pug">
    v-container(v-if="user.auth && selected_room !== null").mb-16

        v-layout.mb-4
            v-flex.xs12
                ChatSelectRoom
        
        v-layout.align-stretch.wrap

            //- CONTAINER MESSAGES
            v-flex.xs12.sm8.elevation-15.rounded-lg.message-container.d-flex.flex-wrap.justify-end.flex-column
                div(id="your_div" ref="container-messages-scroll")
                    div(v-for="(item, idx) in messages" :key="idx" :max-width="400" dark :class="[item.type_user]").px-3.py-1.mt-2.message
                        h5.font-family-raleway-bold.mb-0 {{`${item.name} ( ${item.type_user} )`}}
                        p(v-html="item.message").font-family-raleway-medium.text-caption.mb-0
                        p.font-family-raleway-bold.text-caption.mb-0.text-right {{ item.date }}
                v-btn(id="resetChat" @click="dialogClearMessages = true" color="grey darken-1" small rounded dark fab)
                    v-icon delete
            //- CONTAINER USERS
            v-flex.xs12.sm4.pl-sm-4.mt-9.mb-9.mt-sm-0.mb-sm-0.users-container
                v-layout.flex-column.elevation-15.rounded-lg
                    v-flex
                        v-btn( block ).rounded-0.rounded-t-lg.font-family-raleway-bold.text--secondary.text-capitalize USERS
                    v-flex.xs12.background-users.rounded-0.rounded-lg
                        v-list.rounded-lg
                            v-list-item-group(color="primary")
                                v-list-item(v-for="(item, idx) in users" :key="idx")
                                    v-list-item-icon
                                        v-icon(color="grey darken-2") perm_identity
                                    v-list-item-content
                                        v-list-item-title.font-family-raleway-bold.text--secondary {{`${item.name}`}}
                                        v-list-item-subtitle.font-family-raleway-medium {{`${item.type_user}`}}

        //- MODAL CLOSE SESION
        v-dialog(v-model="dialogClearMessages" max-width="290")
            v-card.rounded-xl
                v-card-title.headline.primary.white--text.font-family-raleway-bold 
                    v-btn(icon dark @click="dialogClearMessages = false" ).mr-2
                        v-icon close
                    div Clear Messages
                

                v-card-text.font-family-raleway-bold.mt-5 Confirm remove all messages of this room ??

                v-card-actions.d-flex.flex-column
                    v-spacer
                    v-btn.dark.font-family-raleway-bold.text-capitalize(color="secondary" block rounded @click="dialogClearMessages = false; clearMessages()") Acept
        
        ChatSendMessage(v-on:message="sendMessage")
                
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Chat',
    data() {
        return {
            divScroll: null,
            users: [],
            dialogClearMessages: false
        }
    },
    watch: {
        'selected_room'(value) {
            this.users = [{name: this.user.name, type_user: this.user.type_user, id: this.$socket.id}]
            this.$socket.emit('swith channel', {room: this.selected_room, name: this.user.name, type_user: this.user.type_user})
            this.$socket.emit('get clients', this.selected_room)
            this.resetScroll()
        }
    },
    computed: {
        ...mapGetters({
            'selected_room': 'chat/selected_room',
            'messages': 'chat/messages',
            'user': 'user/user'
        }),
    },
    sockets: {
        'user connected'(data) {
            this.$socket.emit('get clients', this.selected_room)
            this.pushMessage({type_user: 'moderator', date: data.date, message: `user ${data.name} conected`, name: 'Connect'})
            this.$nextTick(() => {
                this.resetScroll()
            })
        },
        'user disconnected'(data) {
            this.$socket.emit('get clients', this.selected_room)
            this.pushMessage({type_user: 'moderator', date: data.date, message: `user ${data.name} logged out`, name: 'Logged out'})
            this.$nextTick(() => {
                this.resetScroll()
            })
        },
        async 'get clients'(data) {
            this.users = data
        },
        'get message'({id, type_user, message, date, name}) {
            this.pushMessage({type_user, message, date, name, id})
            this.$nextTick(() => {
                this.resetScroll()
            })
        }
    },
    methods: {
        ...mapActions({
            openSession: 'user/openSession',
            updateRoom: 'chat/updateRoom',
            pushMessage: 'chat/pushMessage',
            clearMessages: 'chat/clearMessages'
        }),
        resetScroll() {
            if(this.user.auth === true) {
                this.divScroll = this.$refs['container-messages-scroll']
                this.divScroll.scrollTop = this.divScroll.scrollHeight
            }
        },
        initRoom() {
            this.users = [{name: this.user.name, type_user: this.user.type_user, id: this.$socket.id}]
            this.$socket.emit('swith channel', {room: this.selected_room, name: this.user.name, type_user: this.user.type_user})
            this.resetScroll()
        },
        async sendMessage(message) {
            this.pushMessage({type_user: 'self', message: message, name: this.user.name, date: this.$moment().format('LLL'), id: this.$socket.id})
            await this.$socket.emit('send message', message)
            this.$nextTick(() => {
                this.resetScroll()
            })
        }
    },
    created() {
        if(!this.user.auth){
            let name = this.$route.query.name
            let type_user = this.$route.query.type_user
            if(name && type_user) this.openSession({name, type_user})
        }
        if(this.$route.query.room) this.updateRoom(this.$route.query.room)
    },
    mounted() {
        if(this.user.auth) this.initRoom()
    }
}
</script>

<style lang="scss" scoped>
    $backgroundContainers: rgb(251, 251, 251);
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
        max-height: 600px;
        position: relative;

        button#resetChat{
            position: absolute;
            top: 10px;
            right: 10px;
        }

        & > div {
            overflow-y: scroll;
            overflow-x: hidden;
            height: auto;
            @include styleScroll(20px, rgba(0,0,0,.3));
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            padding: 10px 0px 10px 10px;

            & div.message {
                background: transparent;
                border: 2px solid rgba(0,0,0,.6);
                color: rgba(0,0,0,.6);
                width: 100%;
                max-width: 400px;
                display: inline-block;
                border-radius: 15px 15px 0px 15px;

                &.client {
                    border-radius: 15px 15px 15px 0px;
                    background: transparent;
                    border: 2px solid rgba(0,0,0,.6);
                    color: rgba(0,0,0,.6);
                    align-self: flex-start;
                }

                &.self {
                    background: rgba(0,0,0,.6);
                    border: none;
                    color: white;
                    align-self: flex-end;
                }

                &.moderator {
                    border-radius: 15px 15px 15px 0px;
                    background: transparent;
                    border: 2px solid #da555e;
                    color: rgba(0,0,0,.6);
                    align-self: flex-start;
                }

                &.admin {
                    border-radius: 15px 15px 15px 0px;
                    background: #da555e;;
                    border: none;
                    color: white;
                    align-self: flex-start;
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
