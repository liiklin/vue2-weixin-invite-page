<template lang="pug">
div
  #header
    br
    div
      img(:src="userInfo.wxPhoto")
    br
    div
      span(v-text="userInfo.name")
  #body
    img(:src="qrcode")
  #footer
    span 分享此页面给好友
    div
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import { wxShareConfig } from '../util/util'
import wx from 'wx'

// import * as api from '../store/api'

import queryString from 'query-string'

async function fetchQrcodeTicket(store, wxId) {
  return store.dispatch('getTicket', {
    wxId
  })
}

async function fetchUserinfo(store, wxId) {
  return store.dispatch('getUserinfo', {
    wxId
  })
}

async function fetchSign(store) {
  return store.dispatch('getSign')
}

async function fetchInvitationConfig(store) {
  return store.dispatch('getInvitationConfig')
}

export default {
  data() {
    return {
      qrcode: "",
      userInfo:{},
      // sign:{},
      invite:{},
    }
  },
  computed: {
    ...mapGetters([
      'getQrcode',
      'getUserinfo',
      // 'getSign',
      // 'getInvite',
    ])
  },
  async mounted(){
    let search = queryString.parse(location.search),
      wxId = this.$route.query.id || search.id

    // await fetchSign(this.$store)
    await fetchInvitationConfig(this.$store)
    await fetchQrcodeTicket(this.$store, wxId)
    await fetchUserinfo(this.$store, wxId)
    // this.sign = this.$store.getters.getSign
    this.invite = this.$store.getters.getInvite
    this.qrcode = this.$store.getters.getQrcode
    this.userInfo = this.$store.getters.getUserinfo

    // console.log(`this.qrcode${JSON.stringify(this.qrcode)}`)
    // console.log(`this.invite${JSON.stringify(this.invite)}`)

    // wx.config({
    //   debug: true,
    //   appId: this.sign.appId,
    //   timestamp: this.sign.timestamp,
    //   nonceStr: this.sign.noncestr,
    //   signature: this.sign.signature,
    //   jsApiList: [
    //     'onMenuShareTimeline',
    //     'onMenuShareAppMessage',
    //     'onMenuShareQQ',
    //     'onMenuShareWeibo',
    //     'onMenuShareQZone'
    //   ]
    // })
    let title = this.invite.title,
      desc = this.invite.content,
      link = `${self.location.href.split('#')[0]}#/?id=${this.userInfo.id}`,
      imgUrl = this.userInfo.wxPhoto
    wxShareConfig({title, desc, link, imgUrl})
  },
  async beforeMount() {

  }
}
</script>


<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
