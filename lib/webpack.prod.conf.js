"use strict";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩


var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩


var _require = require('webpack-bundle-analyzer'),
    BundleAnalyzerPlugin = _require.BundleAnalyzerPlugin;

var ANALYZE = process.env.ANALYZE || false;

var _require2 = require('path'),
    resolve = _require2.resolve;

var resolvePath = function resolvePath(relativePath) {
  return resolve(process.cwd(), relativePath);
};

var ExtractCSS = new MiniCssExtractPlugin({
  filename: 'css/[name].[hash].css',
  chunkFilename: 'css/[name].[hash].css'
});
var plugins = [new CleanWebpackPlugin(['dist'], {
  root: resolvePath('./'),
  verbose: true
}), ExtractCSS];

if (ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: {
    app: [resolvePath('src/index')],
    vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'qs']
  },
  optimization: {
    minimizer: [// 压缩js
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      minChunks: 3,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: plugins
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ANALYZE, "ANALYZE", "D:\\myWork\\lyxcool-webpack\\src\\webpack.prod.conf.js");
  reactHotLoader.register(resolvePath, "resolvePath", "D:\\myWork\\lyxcool-webpack\\src\\webpack.prod.conf.js");
  reactHotLoader.register(ExtractCSS, "ExtractCSS", "D:\\myWork\\lyxcool-webpack\\src\\webpack.prod.conf.js");
  reactHotLoader.register(plugins, "plugins", "D:\\myWork\\lyxcool-webpack\\src\\webpack.prod.conf.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();