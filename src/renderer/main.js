import Vue from 'vue'

import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import {ClientTable, Event} from 'vue-tables-2';
import "../library/file-compare"
import store from "./store/index"

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ClientTable, {}, false)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
