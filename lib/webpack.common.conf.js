"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var webpack = require('webpack');

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

var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var AutoDllPlugin = require('autodll-webpack-plugin'); // const WorkboxPlugin = require('workbox-webpack-plugin');


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
}); //env为webpack的环境非node环境

var env = process.env.DEV_SERVER ? 'development' : 'production';
var webpackConfig = {
  entry: {},
  output: {
    publicPath: env === 'development' ? '/' : '/',
    path: resolvePath('dist'),
    filename: env === 'development' ? 'js/bundle.js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: env === 'development' ? 'js/[name]-[hash:5].chunk.js' : 'js/[name].[chunkhash:8].js',
    sourceMapFilename: env === 'development' ? '[file].map' : 'source_map/[file].map'
  },
  module: {
    rules: [// {
    //   test: /\.(js|jsx)$/,
    //   enforce: 'pre',
    //   loader: 'eslint-loader',
    //   exclude: /node_modules/,
    // },
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /(node_modules)/,
      use: ['babel-loader?cacheDirectory=true']
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
            'primary-color': 'rgba(104,198,156,1);',
            'link-color': 'rgba(104,198,156,1);',
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
    extensions: [".ts", ".tsx", '.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '~': resolvePath('src/'),
      '@': resolvePath('src/component/')
    }
  },
  performance: {
    maxAssetSize: 1024 * 100
  },
  mode: env === 'development' ? 'development' : 'production',
  optimization: {},
  plugins: [new ForkTsCheckerWebpackPlugin(), new HtmlWebpackPlugin({
    inject: true,
    filename: 'index.html',
    iconFontLink: process.env.ICON_FONT_LINK,
    template: resolvePath('src/index.html'),
    favicon: resolvePath('src/images/favicon.ico'),
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }), new AutoDllPlugin({
    inject: true,
    // will inject the DLL bundles to index.html
    filename: '[name].dll.js',
    entry: {
      vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'qs']
    }
  }), new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|zh-cn|en/), new ProgressBarPlugin(), // new WorkboxPlugin.GenerateSW({
  //   clientsClaim: true,
  //   skipWaiting: true
  // }),
  commonDot, nodeEnvDot]
};
var mergeConfig = env == 'development' ? developmentConfig : productionConfig;
Object.keys(mergeConfig).forEach(function (i) {
  if (i !== 'plugins') {
    webpackConfig[i] = mergeConfig[i];
  } else {
    webpackConfig[i] = [].concat((0, _toConsumableArray2["default"])(mergeConfig[i]), (0, _toConsumableArray2["default"])(webpackConfig[i]));
  }
});
module.exports = webpackConfig;
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
  reactHotLoader.register(env, "env", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(webpackConfig, "webpackConfig", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
  reactHotLoader.register(mergeConfig, "mergeConfig", "D:\\myWork\\lyxcool-webpack\\src\\webpack.common.conf.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();