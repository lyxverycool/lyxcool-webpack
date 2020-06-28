const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      resolvePath('src/index.js')
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    host: 'localhost',
    port: process.env.PORT,
    hot: true,
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
