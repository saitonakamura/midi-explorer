// @ts-check
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common')

/** @type {import('webpack').Configuration} */
const prod = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
})

module.exports = prod
