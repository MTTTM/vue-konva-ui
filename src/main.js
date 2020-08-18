import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import canvasHtml from './components/canvasHtml.js'
import VueKonva from 'vue-konva'
import LinearLayout from "./components/linearLayout/index"
Vue.use(canvasHtml)
Vue.use(require('vue-easeljs'));
import GLOBALColor from "./components/var.js"

Vue.use(VueKonva)
Vue.component('linear-layout', LinearLayout)
Vue.config.productionTip = false
Vue.prototype.$VAL=GLOBALColor;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
