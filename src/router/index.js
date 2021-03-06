import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../pages/index.vue'

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    name: 'home',
    path: '/',
    meta: {
      title: '加载中'
    },
    component: index
  }, {
    name: 'index',
    path: '/index',
    meta: {
      title: '加载中'
    },
    component: index
  }]
})
