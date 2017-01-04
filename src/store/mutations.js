import * as types from './mutation-types'

export default {
  [types.SET_QRCODE](state, {ticket}) {
    state.qrcode = ticket
  },
  [types.SET_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [types.SET_SIGN](state, {sign}) {
    state.sign = sign
  },
  [types.SET_INVITE](state, {invite}) {
    state.invite = invite
  },
}
