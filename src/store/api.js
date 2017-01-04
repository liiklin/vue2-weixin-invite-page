import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

function fetch(child) {
  return new Promise((resolve, reject) => {
    Vue.http.get(API_ROOT + child).then((response) => {
      if (typeof response.body == 'string') {
        resolve(JSON.parse(response.body))
      } else {
        resolve(response.body)
      }
    }, reject)
  })
}

function post(child, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(API_ROOT + child, data, {
        emulateJSON: true
      })
      .then((response) => {
        if (typeof response.body == 'string') {
          resolve(JSON.parse(response.body))
        } else {
          resolve(response.body)
        }
      }, reject)
  })
}

export function fetchUserInfo(wxId) {
  return fetch(`WxBus/getUserinfo?wxId=${wxId}`).then(response => {
    return response.data.user
  })
}

export function fetchQrcodeTicket(wxId) {
  return fetch(`WxBus/getQrcodeTicket?wxId=${wxId}`).then(response => {
    return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${response.data.ticket}`
  })
}

export function fetchInvitationConfig() {
  return fetch(`WxBus/getInvitationConfig`).then(response => {
    return response.data
  })
}


export function loadSign() {
  let data = {
    url: 'http://weixin.7ipr.com/app/weixin/qrcode/index.html'
    // url: encodeURIComponent(self.location.href.split('#')[0])
    // url: self.location.href.split('#')[0]
  }
  return new Promise((resolve, reject) => {
    Vue.http.post('http://weixin.7ipr.com/app/WxPlatform/getSignature', data)
      .then((response) => {
        if (typeof response.body == 'string') {
          resolve(JSON.parse(response.body))
        } else {
          resolve(response.body)
        }
      }, reject)
  })
}
