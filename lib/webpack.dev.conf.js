"use strict";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var webpack = require('webpack');

var _require = require('path'),
    resolve = _require.resolve;

var resolvePath = function resolvePath(relativePath) {
  return resolve(process.cwd(), relativePath);
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [resolvePath('src/index.js')]
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
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(resolvePath, "resolvePath", "D:\\myWork\\lyxcool-webpack\\src\\webpack.dev.conf.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();