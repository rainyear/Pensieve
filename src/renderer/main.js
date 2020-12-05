import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from '../db/database'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.use(ElementUI)

// init store from local db
const _ftree = db.read().get('FTREE').value()
const _images = db.read().get('IMAGES').value()
store.commit('UPDATE_FTREE', _ftree)
store.commit('UPDATE_IMAGES', _images)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
