<template lang="pug">
    v-btn(@click="initializeGoogle()" large rounded).elevation-15.font-family-raleway-bold.text-capitalize
        v-icon(color="#da555e").mr-3 fab fa-google
        div.text--secondary Login With Google
</template>

<script>

import { mapActions } from 'vuex'
export default {
    name: 'Google',
    methods: {
        ...mapActions({
            openSession: 'user/openSession',
            updateRoom: 'chat/updateRoom'
        }),
        initializeGoogle() {
            google.accounts.id.initialize({
                client_id: "75360503579-8lm1akm9iunja68og4b8mfbo8fuubtnd.apps.googleusercontent.com",
                callback: this.handleOnetapResponse,
            });
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    console.log(notification.getNotDisplayedReason());//cacelado el prompt por el usuario
                } else if (notification.isSkippedMoment()) {
                    console.log(notification.getSkippedReason());//cerro el prompt
                } else if (notification.isDismissedMoment()) {
                    console.log(notification.getDismissedReason());//Credencial retornada
                }
            })
        },
        parseJwt(token) {
            let base64Url = token.split(".")[1]
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join("")
            );

            return JSON.parse(jsonPayload)
        },
        handleOnetapResponse(result) {
            const info = this.parseJwt(result.credential)
            const name = `${info.given_name} ${info.family_name}`
            this.openSession({name, type_user: 'client'})
            this.updateRoom('example')
            window.location.reload(true)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
