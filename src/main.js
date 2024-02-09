import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/global.css'
import '@/utils/element_ui'
import '@/utils/editor'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // for bubble theme
