import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import api from './apis'

Vue.config.productionTip = false

Vue.prototype.$api = api; // api 變成 prototype, 方便使用

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
