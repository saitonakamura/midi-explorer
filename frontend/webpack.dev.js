// @ts-check
const { merge } = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common')

/** @type {import('webpack').Configuration} & { devServer: FIXME } */
const dev = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    // hot: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
})

module.exports = dev
