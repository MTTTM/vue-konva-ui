import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Canvas.vue')
  },
  {
    path: '/createjs',
    name: 'createjs',
    component: () => import(/* webpackChunkName: "about" */ '../views/createJS.vue')
  },
  {
    path: '/konva',
    name: 'konva',
    component: () => import(/* webpackChunkName: "about" */ '../views/konva.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
