/* eslint-disable prettier/prettier */
module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-import': {},
    'postcss-normalize': {},
    tailwindcss: {},
    'postcss-extend': {},
    'postcss-nested-ancestors': {},
    'postcss-nested-props': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: env === 'production' ? true : false,
    },
    cssnano: env === 'production' ? options.cssnano : false,
  },
})
