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
  },
  {
    path: '/buttons',
    name: 'buttons',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/buttons.vue')
  },
  {
    path: '/scrollView',
    name: 'scrollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/scrollView.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/icons.vue')
  },
  {
    path: '/linearLayout',
    name: 'linearLayout',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayout.vue')
  },
  {
    path: '/linearLayout2',
    name: 'linearLayout2',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayout2.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/text.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
