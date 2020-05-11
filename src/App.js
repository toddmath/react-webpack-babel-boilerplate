import React, { memo } from "react"
import _ from "lodash-es"
import { isObject } from "lodash-es/isObject"
import { memoize } from "lodash-es/memoize"

import Todd from "./Icons/Todd.svg"
import styles from "./app.scss"

const App = ({ title }) => (
  <div className='app__component'>
    <div className='todd__container'>
      <Todd className='todd' />
    </div>
    <h1>App Component</h1>
    <div className='title'>{title}</div>
  </div>
)

export default memo(App)
