const path = require('path')
const { ContextReplacementPlugin } = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const { supportedLocales } = require('./locales')

/** Parses and adds viewBox to all imported svg components. */
function handleSvgViewBox(
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) {
  return template.ast`
    ${imports}
    import useWithViewbox from '../hooks/useWithViewBox';

    export default function ${componentName}(${props}) {
      const ref = React.useRef();
      useWithViewbox(ref);
      props = { ...props, ref };

      return ${jsx};
    };
  `
}

module.exports = {
  mode: 'none',
  target: 'web',
  entry: './src/index.js',
  node: {
    /** Testing things for v5 upgrade @see {@link https://webpack.js.org/migrate/5/} */
    Buffer: false,
    process: false,
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../', 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'babel-plugin-macros',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-numeric-separator',
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: false,
                  helpers: false,
                  regenerator: true,
                  useESModules: true,
                },
              ],
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-syntax-dynamic-import',
              '@loadable/babel-plugin',
              'lodash',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'entry',
                  corejs: 3,
                  targets: { esmodules: true },
                  exclude: ['transform-typeof-symbol'],
                },
              ],
              [
                '@babel/preset-react',
                {
                  development: true,
                  useBuiltIns: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              template: handleSvgViewBox,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
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
          'url-loader',
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1e4,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1e4,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.png',
      '.jpeg',
      '.jpg',
      '.webp',
      '.gif',
      '.svg',
      '.scss',
      '.css',
    ],
    alias: {
      '~hooks': path.resolve(__dirname, '../', 'src/', 'hooks/'),
      '~components': path.resolve(__dirname, '../', 'src/', 'components/'),
    },
  },
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 175000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello React-Boilerplate with Webpack and Babel World!!',
      template: './build-utils/template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new LodashModuleReplacementPlugin(),
    new ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]`)
    ),
  ],
  devServer: {
    // * if having issues with routes @see http://localhost:8080/webpack-dev-server
    contentBase: './dist',
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
