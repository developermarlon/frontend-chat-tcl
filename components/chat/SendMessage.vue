<template lang="pug">
  v-container(fluid pa-2).container-chat.elevation-5
    v-container.pa-0
        v-layout(align-center)
            v-flex(xs12).d-flex.container-input.pl-0.pr-2
                textarea(xs12 type="text" ref="textarea" v-model="message" @keyup="textAreaAdjust()" placeholder="Write Something...").font-family-raleway-bold.text-body-2
            v-flex.container-button
                v-btn(fab id="buttonSend" color="#da555e" @click="sendMessage()" dark).elevation-2 
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
          this.$emit('message', this.message.replace(/\n/g, "<br />"))
          this.$nextTick(() => {
              this.message = null
              this.$refs.textarea.focus()
          })
      },
      textAreaAdjust() {
          this.$refs.textarea.style.height = "1px";
          this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight)+"px";
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
      height: 56px;

      &::placeholder {
        color: rgba(0,0,0,.3);
      }
    }
  }
</style>
