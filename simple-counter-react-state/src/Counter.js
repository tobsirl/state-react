import React, { useState, useEffect } from 'react'

function Counter({ max, step }) {
  const [count, setCount] = useState(0)

  function increment() {
    setCount((c) => {
      if (c >= max) {
        return c
      }
      return c + step
    })
  }

  function decrement() {
    setCount(count - 1)
  }

  function reset() {
    setCount(0)
  }

  useEffect(() => {
    document.title = `Counter: ${count}`
  }, [count])

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  )
}

export default Counter
