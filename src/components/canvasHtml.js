import { Vue, spritejs } from 'sprite-vue'
import DialogComponent from './CanvasHtml.vue'
 
 
const CanvasHtml = (options = {me:null}) => {
  const DialogComponentConstructor = Vue.extend(DialogComponent)
  const instance = new DialogComponentConstructor({propsData:options}).$mount()
  DialogComponentConstructor.prototype.close = function () {
    const el = instance.$el
    el.parentNode && el.parentNode.removeChild(el)
  }
  document.body.appendChild(instance.$el)
}
 
const install = Vue => {
  Vue.prototype.$CanvasHtml = CanvasHtml
}
 
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
 
export default install