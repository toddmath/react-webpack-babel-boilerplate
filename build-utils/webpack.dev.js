const Dotenv = require('dotenv-webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    usedExports: true,
    // namedModules: true,
    // namedChunks: true,
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        // browsersync options
        host: 'localhost',
        port: 7777,
        proxy: 'http://localhost:8080/',
      },
      {
        // plugin options
        reload: false,
      }
    ),
    new Dotenv({
      path: './.env.development',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
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
              hmr: true,
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
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
}

/*
{
  test: /\.((c|sa|sc)ss)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
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
