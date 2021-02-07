// @ts-check
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {
  createValidatorTransformer,
} = require('superstruct-ts-transformer/dist/transformer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

/** @type {import('webpack').ConfigurationFactory} */
const config = (env) => {
  const isProduction =
    typeof env === 'string'
      ? env === 'production'
      : env.production ?? process.env.NODE_ENV === 'production'

  return {
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.ejs'),
      }),
      !isProduction && new webpack.HotModuleReplacementPlugin(),
      !isProduction && new ReactRefreshWebpackPlugin(),
      // require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    ].filter(Boolean),
    mode: isProduction ? 'production' : 'development',
    devtool: !isProduction ? 'inline-source-map' : 'source-map',
    devServer: !isProduction
      ? {
          contentBase: path.resolve(__dirname, 'dist'),
          compress: true,
          historyApiFallback: true,
          hot: true,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: [
            !isProduction
              ? {
                  loader: 'babel-loader',
                  options: {
                    plugins: [
                      !isProduction && require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                  },
                }
              : null,
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: (program) => ({
                  before: [createValidatorTransformer(program)], // <-- custom transfomer configuration
                }),
              },
            },
            // { loader: 'react-hot-loader/webpack' },
          ].filter(Boolean),
        },
        {
          test: /\.svg$/i,
          exclude: /node_modules/,
          use: [{ loader: 'file-loader' }],
          // use: [{ loader: '@svgr/webpack', options: { babel: false } }],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            // { loader: 'style-loader' },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
  }
}

module.exports = config
