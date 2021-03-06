import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import snackbar from '@/store/modules/snackbar'
import alert from '@/store/modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    snackbar: snackbar,
    alert: alert

  },
  plugins: [createPersistedState({
    storage: window.localStorage,
      reducer(val) {
        return {
          auth: val.auth
        }
        
      }
  })]
})
