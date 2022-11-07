import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: /* HomeView */ () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: /* adminPanel */ () => import(/* webpackChunkName: "adminPanel" */ '@/views/adminPanel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
