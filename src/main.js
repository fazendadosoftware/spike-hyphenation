import Vue from 'vue'
import App from './App.vue'
import FlagIcon from 'vue-flag-icon'
import '@leanix/reporting'
import './assets/css/main.css'
import franc from 'franc'
import hyphen from 'hyphen'
import dePattern from 'hyphen/patterns/de'
import enUSPattern from 'hyphen/patterns/en-us'
import ptPattern from 'hyphen/patterns/pt'
import esPattern from 'hyphen/patterns/es'
import frPattern from 'hyphen/patterns/fr'
import itPattern from 'hyphen/patterns/it'

/* global lx */
Vue.prototype.$lx = lx

// language detector
Vue.prototype.$franc = franc

// hyphen module
Vue.prototype.$hyphenate = {
  deu: hyphen(dePattern),
  eng: hyphen(enUSPattern),
  por: hyphen(ptPattern),
  spa: hyphen(esPattern),
  fra: hyphen(frPattern),
  ita: hyphen(itPattern)
}

Vue.use(FlagIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
