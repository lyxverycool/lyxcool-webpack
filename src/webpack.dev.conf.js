const webpack = require('webpack')
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      resolvePath('src/index')
    ],
  },
  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    stats: {
      colors: true
    },
    hot: true,
    quiet: true,
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
