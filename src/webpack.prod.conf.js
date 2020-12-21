const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');// js压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const ANALYZE = process.env.ANALYZE || false
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

const ExtractCSS = new MiniCssExtractPlugin({
  filename: 'css/[name].[hash].css',
  chunkFilename: 'css/[name].[hash].css',
})

const plugins = [
  new CleanWebpackPlugin(['dist'], {
    root: resolvePath('./'),
    verbose: true,
  }),
  ExtractCSS,
]

if (ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  entry: {
    app: [resolvePath('src/index')],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  optimization: {
    minimizer: [// 压缩js
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      minChunks: 3,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },
  plugins,
};
