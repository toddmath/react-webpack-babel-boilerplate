import { useLayoutEffect } from "react"

const useWithViewbox = ref => {
  const handleViewBoxString = arr => [...arr].join(" ")

  useLayoutEffect(() => {
    if (
      ref.current !== null &&
      // only if there is no viewBox attribute
      !ref.current.getAttribute("viewBox") &&
      // only if not test (JSDOM)
      // https://github.com/jsdom/jsdom/issues/1423
      ref.current.getBBox &&
      // only if rendered
      // https://stackoverflow.com/questions/45184101/error-ns-error-failure-in-firefox-while-use-getbbox
      ref.current.getBBox().width &&
      ref.current.getBBox().height
    ) {
      // console.count(`useLayoutEffect with ref: ${ref}`)
      const box = ref.current.getBBox()
      const { x, y, width, height } = box

      ref.current.setAttribute("viewBox", handleViewBoxString([x, y, width, height]))
    }
  }, [ref.current])
}

export default useWithViewbox
