import * as types from './mutation-types'
import * as api from './api'

export default {
  getTicket({
    commit
  }, {
    wxId
  }) {
    return api.fetchQrcodeTicket(wxId)
      .then(body => Promise.resolve(body))
      .then(ticket => {
        commit(types.SET_QRCODE, {
          ticket
        })
      })
  },
  getUserinfo({
    commit
  }, {
    wxId
  }) {
    return api.fetchUserInfo(wxId)
      .then(body => Promise.resolve(body))
      .then(userInfo => {
        commit(types.SET_USER_INFO, {
          userInfo
        })
      })
  },
  getSign({
    commit
  }){
    return api.loadSign()
      .then(body => Promise.resolve(body))
      .then(data => {
        let sign = data.data
        commit(types.SET_SIGN, {
          sign
        })
      })
  },
  getInvitationConfig({
    commit
  }){
    return api.fetchInvitationConfig()
      .then(body => Promise.resolve(body))
      .then(invite => {
        commit(types.SET_INVITE, {
          invite
        })
      })
  }
}
