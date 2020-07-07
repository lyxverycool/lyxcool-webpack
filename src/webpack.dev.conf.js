const webpack = require('webpack')
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      '@babel/polyfill',
      resolvePath('src/index.js')
    ],
  },
  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
