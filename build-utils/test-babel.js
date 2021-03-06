/**
 * @module
 * @see {@link https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/test.js}
 */
'use strict'

const create = require('./create-babel')

module.exports = (api, opts) => {
  return create(api, { helpers: false, ...opts }, 'test')
}
