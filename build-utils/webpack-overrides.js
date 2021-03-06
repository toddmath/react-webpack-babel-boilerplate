/**
 * @module
 * @see {@link https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/webpack-overrides.js}
 */
'use strict'

const crypto = require('crypto')

const macroCheck = new RegExp('[./]macro')

module.exports = () => ({
  // This function transforms the Babel configuration on a per-file basis
  config({ options }, { source }) {
    // Babel Macros are notoriously hard to cache, so they shouldn't be
    // https://github.com/babel/babel/issues/8497
    // We naively detect macros using their package suffix and add a random token
    // to the caller, a valid option accepted by Babel, to compose a one-time
    // cacheIdentifier for the file. We cannot tune the loader options on a per
    // file basis.

    const newOptions = macroCheck.test(source)
      ? {
          ...options,
          caller: {
            ...options.caller,
            craInvalidationToken: crypto.randomBytes(32).toString('hex'),
          },
        }
      : options

    return newOptions
  },
})
