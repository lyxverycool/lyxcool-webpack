const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)
const Dotenv = require('dotenv')
const envPath = path.resolve(process.cwd(), 'env')
const NODE_ENV = process.env.NODE_ENV || 'development'
Dotenv.config({
  path: `${envPath}/common.env`,
})

Dotenv.config({
  path: `${envPath}/${NODE_ENV}.env`,
})

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack')
const productionConfig = require('./webpack.prod.conf.js')
const developmentConfig = require('./webpack.dev.conf.js')

const commonDot = new DotenvWebpack({
  path: `${envPath}/common.env`,
  systemvars: true,
})

const nodeEnvDot = new DotenvWebpack({
  path: `${envPath}/${NODE_ENV}.env`,
  systemvars: true,
})

//env为webpack的环境非node环境
const env = process.env.DEV_SERVER ? 'development' : 'production'

let webpackConfig = {
  entry: {},
  output: {
    publicPath: env === 'development' ? '/' : '/',
    path: resolvePath('dist'),
    filename: env === 'development' ? 'js/bundle.js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: env === 'development' ? 'js/[name]-[hash:5].chunk.js' : 'js/[name].[chunkhash:8].js',
    sourceMapFilename: env === 'development' ? '[file].map' : 'source_map/[file].map',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      { test: /\.(js|jsx|ts|tsx)$/, exclude: /(node_modules)/, use: ['babel-loader?cacheDirectory=true'] },
      {
        test: /\.css$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': 'rgba(104,198,156,1);',
                'link-color': 'rgba(104,198,156,1);',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(jp[e]?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '~': resolvePath('src/'),
      '@': resolvePath('src/component/'),
    },
  },
  performance: {
    maxAssetSize: 1024 * 100,
  },
  mode: env === 'development' ? 'development' : 'production',
  optimization: {},
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      iconFontLink: process.env.ICON_FONT_LINK,
      template: resolvePath('src/index.html'),
      favicon: resolvePath('src/images/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|zh-cn|en/),
    new ProgressBarPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // }),
    commonDot,
    nodeEnvDot,
  ],
}

const mergeConfig = env == 'development' ? developmentConfig : productionConfig

Object.keys(mergeConfig).forEach(i => {
  if (i !== 'plugins') {
    webpackConfig[i] = mergeConfig[i]
  } else {
    webpackConfig[i] = [...mergeConfig[i], ...webpackConfig[i]]
  }
})

module.exports = webpackConfig

