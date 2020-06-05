const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  plugins: [new Visualizer()],
  devServer: {
    openPage: ['/stats.html', '/'],
  },
}
