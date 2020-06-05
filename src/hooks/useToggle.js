import { useState, useCallback } from 'react'

/**
 * Custom react hook that simplifies using toggle state.
 * @param {boolean} [initial=false] Initial state of the toggle.
 * @see https://github.com/stevenpersia/captain-hook/blob/master/useToggle.js
 * @returns {Array} First value is boolean, second toggle function.
 */
export default function useToggle(initial = false) {
  const [open, setOpen] = useState(initial)

  return [open, useCallback(() => setOpen(status => !status), [setOpen])]
}
