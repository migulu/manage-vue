export default {
  namespaced: true,
  state: {
    token: "",
    isLogin: false,
    isAdmin: false,
  },
  mutations: {  //改狀態
    SET_AUTH(state, options) {
      state.token = options.token;
      state.isLogin = options.isLogin;
      state.isAdmin = options.isAdmin;
    }
  },
  actions: {  //
    setAuth(context, options){
      context.commit('SET_AUTH', {
        token: options.token,
        isLogin: options.isLogin,
        isAdmin: options.isAdmin
      })
    }
  },
  getters: {
    getToken: state => {
        return state.token
    },
    isLogin: state => {
      return state.isLogin
    },
    isAdmin: state => {
      return state.isAdmin
    }
  }
}