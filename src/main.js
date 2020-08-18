import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import canvasHtml from './components/canvasHtml.js'
import VueKonva from 'vue-konva'
Vue.use(canvasHtml)
Vue.use(require('vue-easeljs'));


Vue.use(VueKonva)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
