import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

const API_URL = 'http://localhost:3000/api/v1/student'

const base = axios.create({
  baseURL: API_URL
});

Vue.prototype.$http = base

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')