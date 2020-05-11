const path = require("path")
const { ContextReplacementPlugin } = require("webpack")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")

const { supportedLocales } = require("./locales")

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  /** Testing things for v5 upgrade @see {@link https://webpack.js.org/migrate/5/} */
  node: {
    Buffer: false,
    process: false,
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "/",
    filename: "bundle.js",
    chunkFilename: "[chunkhash].js",
  },
  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["lodash"],
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              template: (
                { template },
                opts,
                { imports, componentName, props, jsx, exports }
              ) => template.ast`
                ${imports}
                import useWithViewbox from '../hooks/useWithViewBox';

                const ${componentName} = (${props}) => {
                  const ref = React.useRef();
                  useWithViewbox(ref);
                  props = { ...props, ref };

                  return ${jsx};
                };
                export default ${componentName};
              `,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              webp: {
                quality: 75,
              },
            },
          },
          "url-loader",
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".png",
      ".jpeg",
      ".jpg",
      ".webp",
      ".gif",
      ".svg",
      ".scss",
      ".css",
    ],
  },
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 175000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello React-Boilerplate with Webpack and Babel World!!",
      template: "./src/index.html",
    }),
    new LodashModuleReplacementPlugin(),
    new ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join("|")})[/\\\\\]`)
    ),
    new DuplicatePackageCheckerPlugin({
      // Also show module that is requiring each duplicate package (default: false)
      verbose: true,
    }),
  ],
  devServer: {
    // * if having issues with routes @see http://localhost:8080/webpack-dev-server
    contentBase: "./dist",
    compress: true,
    port: 8080,
    bonjour: true,
    hot: true,
  },
  stats: {
    colors: true,
  },
}

/*
{
  test: /\.css$/i,
  exclude: /node_modules/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true,
      },
    },
  ],
},
{
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
},
*/
