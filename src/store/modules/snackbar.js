const snackbar = {
  namespaced: true,
  state: {
    msg: '',
    visible: false,
    showClose: false,
    timeout: 2000,
    color: 'pink'
  },
  mutations: {
    OPEN_SNACKBAR (state, options) {
      state.visible = true
      state.msg = options.msg
    },
    CLOSE_SNACKBAR (state) {
      state.visible = false
    },
    // set snackbar
    setShowClose (state, isShow) {
      state.showClose = isShow
    },
    setTimeout (state, timeout) {
      state.timeout = timeout
    },
    setColor (state, color) {
      state.color = color
    }
  },
  actions: {
    openSnackbar (context, options) {
      const timeout = context.state.timeout

      context.commit('OPEN_SNACKBAR', {
        msg: options.msg
      })

      setTimeout(() => {
        context.commit('CLOSE_SNACKBAR')
      }, timeout)
    }
  }
}

export default snackbar
