module.exports = {
  devServer: {
    port: 4000
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-ts-app/' : '/',
  pwa: {
    name: 'vue-ts-app'
  },
  configureWebpack: {
  }
}
