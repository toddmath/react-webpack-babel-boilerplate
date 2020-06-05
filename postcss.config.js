/* eslint-disable prettier/prettier */
module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    cssnano: env === 'production' ? options.cssnano : false,
    autoprefixer: {},
  },
})
