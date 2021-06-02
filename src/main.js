import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import api from './apis'
import utils from '@/helper/utils.js'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$store = store;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if route requires auth and user isn't authenticated
    if (store.state.auth.isLogin === false) {
      let query = to.fullPath.match(/^\/$/) ? {} : {
        redirect: to.fullPath
      }
      next({
        path: '/login',
        query: query
      })
      return
    }
    next()
  }
  next()
})
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')