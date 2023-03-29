module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'https://uvp.test.osinfra.cn/uvp-api',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  assetsDir: '',
  parallel: false,
  publicPath: './',
};
