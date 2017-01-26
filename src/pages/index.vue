<template lang="pug">
div
  .bg
    img(src="~assets/bg.png")
  #header(v-if="pageLoading")
    div
      img(:src="userInfo.wxPhoto")
    div
      span(v-text="userInfo.name")
  #body(v-if="pageLoading")
    img(:src="qrcode")
  #footer
    //-div
      i.iconfont.icon-zhiwen1
    div
      span 长按二维码识别，关注七弦琴服务号
      br
      span 领取现金红包
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
      pageLoading:false,
    }
  },
  computed: {
    ...mapGetters([
      'getQrcode',
      'getUserinfo',
      // 'getSign',
      'getInvite',
    ])
  },
  async mounted(){
    let self = this,
      search = queryString.parse(location.search),
      wxId = self.$route.query.id || search.id

    await Promise.all([
      fetchInvitationConfig(self.$store),
      fetchQrcodeTicket(self.$store, wxId),
      fetchUserinfo(self.$store, wxId)
    ])
    // await fetchInvitationConfig(self.$store)
    // await fetchQrcodeTicket(self.$store, wxId)
    // await fetchUserinfo(self.$store, wxId)

    self.invite = self.$store.getters.getInvite
    self.qrcode = self.$store.getters.getQrcode
    self.userInfo = self.$store.getters.getUserinfo

    let title = `${self.userInfo.name}邀请您一起抢红包`,
			desc = '七弦琴祝您身体健康，阖家幸福！大年三十到元宵节，17场红包雨，记得呼朋唤友一起来抢哦...',
			link = `weixin.7ipr.com/app/weixin/qrcode/index.html#/?id=${self.userInfo.id}`,
			imgUrl = 'http://weixin.7ipr.com/app/weixin/static/shareRedpack.jpg'
		wxShareConfig({
				title,
				desc,
				link,
				imgUrl
			})

    // document.title = `${self.userInfo.name}的红包邀请`
    // let title = self.invite.title,
    //   desc = self.invite.content,
    //   link = `${this.location.href.split('#')[0]}#/?id=${self.userInfo.id}`,
    //   imgUrl = self.userInfo.wxPhoto
    // wxShareConfig({title, desc, link, imgUrl})
    this.pageLoading = true
  },
  async beforeMount() {

  }
}
</script>


<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
