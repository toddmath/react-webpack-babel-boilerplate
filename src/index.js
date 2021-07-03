import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import './global.css'

const title = 'React with Webpack and Babel!!!'

ReactDOM.render(<App title={title} />, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => {
  //   navigator.servicewWorker
  //     .register('/service-worker.js')
  //     .then(registration => {
  //       console.log('SW registered: ', registration)
  //     })
  //     .catch(registrationError => {
  //       console.log('SW registration failed: ', registrationError)
  //     })
  // })
  serviceWorker.register()
}

// module.hot.accept()
