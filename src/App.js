/* eslint-disable no-unused-vars */
import React, { memo } from 'react'
import _ from 'lodash-es'
import { isObject } from 'lodash-es/isObject'
import { memoize } from 'lodash-es/memoize'

import { Section } from '~components'
import Todd from './Icons/Todd.svg'
import styles from './app.css'

function App({ title }) {
  return (
    <div className='app__component'>
      <div className='todd__container'>
        <Todd className='todd' />
      </div>
      <h1 className='text-green-500 text-xl'>App Component</h1>
      <Section>
        <h2 className='title'>{title}</h2>
      </Section>
    </div>
  )
}

export default memo(App)
