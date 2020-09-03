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
  }, {
    path: '/scrollViewVercal',
    name: 'scrollViewVercal',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/scrollViewVercal.vue')
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
    path: '/linearLayout3',
    name: 'linearLayout3',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayout3.vue')
  },
  {
    path: '/linearLayout4',
    name: 'linearLayout4',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayout4.vue')
  },
  {
    path: '/linearLayout5',
    name: 'linearLayout5',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayout5.vue')
  },
  {
    path: '/linearLayoutBetween',
    name: 'linearLayoutBetween',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutBetween.vue')
  },
  {
    path: '/linearLayoutRowBetween',
    name: 'linearLayoutRowBetween',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutRowBetween.vue')
  },
  {
    path: '/linearLayoutSpaceAround',
    name: 'linearLayoutSpaceAround',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutSpaceAround.vue')
  },
  {
    path: '/linearLayoutColSpaceAround',
    name: 'linearLayoutColSpaceAround',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutColSpaceAround.vue')
  },
  {
    path: '/linearLayoutRowFlexItem',
    name: 'linearLayoutRowFlexItem',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutFlexItem.vue')
  },
  {
    path: '/linearLayoutColFlexItem',
    name: 'linearLayoutColFlexItem',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutColFlexItem.vue')
  },
  {
    path: '/linearLayoutWrap',
    name: 'linearLayoutWrap',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutWrap.vue')
  },
  {
    path: '/linearLayoutWrap2',
    name: 'linearLayoutWrap2',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/linearLayoutWrap2.vue')
  },
  {
    path: '/multRowInCol',
    name: 'multRowInCol',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/multRowInCol.vue')
  },
  {
    path: '/mulColInRow',
    name: 'mulColInRow',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/mulColInRow.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/page.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/text.vue')
  },
  {
    path: '*',
    name: 'page404',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
