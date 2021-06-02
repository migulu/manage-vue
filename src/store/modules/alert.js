const alert = {
  namespaced: true,
  state: {
    msg: '',
    visible: false,
    showClose: true,
    timeout: 6000,
    type: 'success'
  },
  mutations: {
    OPEN_ALERT (state, options) {
      state.visible = true
      state.msg = options.msg
      state.type = options.type?options.type:"success"
      console.log("options=",options);
      console.log("state=",state)
    },
    CLOSE_ALERT (state) {
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
    openAlert (context, options) {
      context.commit('OPEN_ALERT', {
        msg: options.msg,
        type: options.type
      })

    }
  }
}

export default alert
