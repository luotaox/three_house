const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        // ...
        {
          test: /\.hdr$/,
          use: 'file-loader'
        }
      ]
    },
  }

})
