module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    devServer: {
       disableHostCheck: true
     }
  },

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
}
