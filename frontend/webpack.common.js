// @ts-check
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  createValidatorTransformer,
} = require('superstruct-ts-transformer/dist/transformer')

/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: (program) => ({
                before: [createValidatorTransformer(program)], // <-- custom transfomer configuration
              }),
            },
          },
          // { loader: 'react-hot-loader/webpack' },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader' }],
        // use: [{ loader: '@svgr/webpack', options: { babel: false } }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
    }),
  ],
}

module.exports = config
