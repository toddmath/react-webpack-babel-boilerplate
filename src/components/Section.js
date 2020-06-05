import React from 'react'

import { useToggle } from '~hooks'

const Section = ({ children }) => {
  const [isToggled, setIsToggled] = useToggle(false)

  return (
    <section>
      {children}
      <p>is toggled: {isToggled.toString()}</p>
      <button onClick={setIsToggled}>Toggle</button>
    </section>
  )
}

export default Section
