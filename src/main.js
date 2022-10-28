import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store'
import '@/assets/css/common/element-variables.scss'
// import './config/rem'
Vue.config.productionTip = false
import * as API from './api'

import VueRouter from "vue-router"
Vue.use(VueRouter)
Vue.use(ElementUI)


import NProgress from "nprogress";

import router from '@/router'
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default new Vue({
  el:'#app',
  router,
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API;
    Vue.prototype.NProgress=NProgress
  }
})