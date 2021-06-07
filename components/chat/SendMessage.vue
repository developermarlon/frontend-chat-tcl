<template lang="pug">
  v-container(fluid pa-2).container-chat.elevation-15
    v-container.pa-0
        v-layout(align-center)
            v-flex(xs12).d-flex.container-input.pl-0.pr-2
                textarea(xs12 type="text" v-model="message" @keyup.enter="sendMessage()" placeholder="Write Something...").font-family-raleway-bold.text-body-2
            v-flex.container-button
                v-btn(fab color="primary" @click="sendMessage()" dark).elevation-2 
                    v-icon(dark) fas fa-paper-plane
</template>

<script>
export default {
  name: 'Chat',
  data(){
      return {
          message: null
      }
  },
  methods: {
      sendMessage(){
          this.$emit('message', this.message)
          this.$nextTick(() => {
              this.message = null
          })
      }
  }
}
</script>
<style lang="scss" scoped>
  div.container-chat {
    background: #ffff;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 9;
  }

  div.container-input {
    & > input, & > textarea {
      padding: 17px 20px;
      border-radius: 30px 30px 0px 30px;
      background: rgba(0,0,0,.1);
      width: 100%;
      outline: none;
      color: rgba(0,0,0,.4);
      height: 55px;

      &::placeholder {
        color: rgba(0,0,0,.3);
      }
    }
  }
</style>
