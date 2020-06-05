const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const inArray = a => (Array.isArray(a) ? a : [a])
const filterBooleans = a => a.filter(Boolean)
const mapAddons = a => a.map(n => require(`./addons/webpack.${n}.js`))
// const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
// const handleAddons = compose(mapAddons, filterBooleans, inArray)
const handleAddons = pipe(inArray, filterBooleans, mapAddons)

const getAddons = addonsArgs => handleAddons(addonsArgs)

module.exports = ({ env = 'dev', addon }) => {
  return new Promise((resolve, reject) => {
    try {
      const envConfig = require(`./webpack.${env}.js`)
      const config = webpackMerge(commonConfig, envConfig, ...getAddons(addon))
      resolve(config)
    } catch ({ message }) {
      reject(message)
    }
  })
}

// module.exports = ({ env, addon }) => {
//   const envConfig = require(`./webpack.${env}.js`)

//   return webpackMerge(commonConfig, envConfig, ...getAddons(addon))
// }
