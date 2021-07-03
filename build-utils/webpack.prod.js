const { DefinePlugin } = require('webpack')
const Dotenv = require('dotenv-webpack')
// const ImageminPlugin = require("imagemin-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
}

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    removeAvailableModules: true,
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        test: /\.m?(js|jsx)(\?.*)?$/i,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  performance: {
    hints: 'error',
  },
  plugins: [
    new DefinePlugin(GLOBALS),
    new Dotenv({
      path: './.env.production',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: { auto: true },
              sourceMap: true,
              esModule: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: '../',
              },
              plugins: [
                require('postcss-import')(),
                require('postcss-normalize')(),
                require('tailwindcss')(),
                require('postcss-extend')(),
                require('postcss-nested-ancestors')(),
                require('postcss-nested-props')(),
                require('postcss-nested')(),
                require('postcss-preset-env')(),
                require('cssnano')(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
  },
}

/*
{
  test: /\.((c|sa|sc)ss)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: false,
      },
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: { auto: true },
        sourceMap: true,
        esModule: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        config: {
          path: '../',
        },
        plugins: [
          require('postcss-import')(),
          require('postcss-normalize')(),
          require('tailwindcss')(),
          require('postcss-extend')(),
          require('postcss-nested-ancestors')(),
          require('postcss-nested-props')(),
          require('postcss-nested')(),
          require('postcss-preset-env')(),
          require('cssnano')(),
        ],
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
},
*/
