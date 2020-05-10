const Dotenv = require("dotenv-webpack")
const BrowserSyncPlugin = require("browser-sync-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        // browsersync options
        host: "localhost",
        port: 7777,
        proxy: "http://localhost:8080/",
      },
      {
        // plugin options
        reload: false,
      }
    ),
    new Dotenv({
      path: "./.env.development",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
}
