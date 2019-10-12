import Vue from 'vue'
import App from './App.vue'
import '@leanix/reporting'
import './assets/css/main.css'
import franc from 'franc'
import hyphen from 'hyphen'
import dePattern from 'hyphen/patterns/de'
import enUSPattern from 'hyphen/patterns/en-us'

/* global lx */
Vue.prototype.$lx = lx
Vue.prototype.$franc = franc

Vue.prototype.$hyphenate = {
  de: hyphen(dePattern, { hyphenChar: '-' }),
  'en-us': hyphen(enUSPattern, { hyphenChar: '-' })
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
