import { useLayoutEffect } from "react"

const handleViewBoxString = dimensions => {
  const data = []
  for (const dimension of dimensions) {
    data.push(dimension.toFixed(4))
  }
  return data.join(" ")
}

// const handleViewBoxString = arr => [...arr].join(" ")

const useWithViewbox = ref => {
  useLayoutEffect(() => {
    if (
      ref.current !== null &&
      !ref.current.getAttribute("viewBox") &&
      // only if not test (JSDOM) https://github.com/jsdom/jsdom/issues/1423
      ref.current.getBBox &&
      // only if rendered https://stackoverflow.com/questions/45184101/error-ns-error-failure-in-firefox-while-use-getbbox
      ref.current.getBBox().width &&
      ref.current.getBBox().height
    ) {
      const { x, y, width, height } = ref.current.getBBox()
      // console.log(JSON.stringify({ x, y, width, height }), null, 2)

      ref.current.setAttribute(
        "viewBox",
        handleViewBoxString([x - 5, y - 5, width + 10, height + 10])
      )
    }
  }, [ref.current])
}

export default useWithViewbox
