import React from 'react'

import { useToggle } from '~hooks'
import './section.css'

const Section = ({ children }) => {
  const [isToggled, setIsToggled] = useToggle(false)

  return (
    <section class='section'>
      {children}
      <p>is toggled: {isToggled.toString()}</p>
      <button onClick={setIsToggled}>Toggle</button>
    </section>
  )
}

export default Section
