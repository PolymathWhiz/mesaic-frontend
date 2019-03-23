import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: () => import('./views/Dashboard.vue')
  }, {
    path: '*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }]
})