"use strict";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var webpack = require('webpack');

var merge = require('webpack-merge');

var path = require('path');

var _require = require('path'),
    resolve = _require.resolve;

var resolvePath = function resolvePath(relativePath) {
  return resolve(process.cwd(), relativePath);
};

var Dotenv = require('dotenv');

var envPath = path.resolve(process.cwd(), 'env');
var NODE_ENV = process.env.NODE_ENV || 'development';
Dotenv.config({
  path: "".concat(envPath, "/common.env")
});
Dotenv.config({
  path: "".concat(envPath, "/").concat(NODE_ENV, ".env")
});

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var WorkboxPlugin = require('workbox-webpack-plugin');

var DotenvWebpack = require('dotenv-webpack');

var productionConfig = require('./webpack.prod.conf.js');

var developmentConfig = require('./webpack.dev.conf.js');

var commonDot = new DotenvWebpack({
  path: "".concat(envPath, "/common.env"),
  systemvars: true
});
var nodeEnvDot = new DotenvWebpack({
  path: "".concat(envPath, "/").concat(NODE_ENV, ".env"),
  systemvars: true
});

var webpackConfig = function webpackConfig(env) {
  return {
    entry: {},
    output: {
      publicPath: env === 'development' ? '/' : '/',
      path: resolvePath('dist'),
      filename: env === 'development' ? 'js/[name]-[hash:5].bundle.js' : 'js/[name].[chunkhash:8].js',
      chunkFilename: env === 'development' ? 'js/[name]-[hash:5].chunk.js' : 'js/[name].[chunkhash:8].js'
    },
    module: {
      rules: [// {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: [env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      }, {
        test: /\.less$/,
        use: [env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins() {
              return [require('autoprefixer')({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
              })];
            }
          }
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'primary-color': '#1DA57A;',
              'link-color': '#1DA57A;',
              'border-radius-base': '2px'
            },
            javascriptEnabled: true
          }
        }]
      }, {
        test: /\.(jp[e]?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.less', '.css'],
      alias: {
        '~': resolvePath('src/'),
        '@': resolvePath('src/component/')
      }
    },
    mode: env === 'development' ? 'development' : 'production',
    optimization: {},
    plugins: [new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolvePath('src/index.html'),
      favicon: resolvePath('src/images/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }), new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|zh-cn|en/), new ProgressBarPlugin(), new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }), commonDot, nodeEnvDot]
  };
};

module.exports = function (env) {
  var config = env === 'production' ? productionConfig : developmentConfig;
  return merge(webpackConfig(env), config);
};

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(resolvePath, "resolvePath", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(envPath, "envPath", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(NODE_ENV, "NODE_ENV", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(commonDot, "commonDot", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(nodeEnvDot, "nodeEnvDot", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(webpackConfig, "webpackConfig", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();