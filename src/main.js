import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import canvasHtml from './components/canvasHtml.js'
import VueKonva from 'vue-konva'
import LinearLayout from "./components/linearLayout/index"
import ScrollView from "./components/scrollView/index"
import kButton from "./components/button/index"
import GLOBALColor from "./components/var.js"
import {sizeW,sizeH} from "./utils/size"
console.log("sizeW,sizeH",sizeW,sizeH)
Vue.use(canvasHtml)
Vue.use(require('vue-easeljs'));
Vue.use(VueKonva)
Vue.component('linear-layout', LinearLayout)
Vue.component('scroll-view', ScrollView)
Vue.component('k-button', kButton)
Vue.config.productionTip = false
Vue.prototype.$VAL=GLOBALColor;
//计算尺寸
Vue.prototype.$sizeW=sizeW;
Vue.prototype.$sizeH=sizeH;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
