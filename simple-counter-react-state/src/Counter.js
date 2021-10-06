import React, { useState, useEffect } from 'react'

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState')
  console.log(storage)
  if (storage) return JSON.parse(storage).count
  return { count: 0 }
}

const storeStateInLocalStorage = (count) => {
  localStorage.setItem('counterState', JSON.stringify({ count }))
  console.log(localStorage)
}

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key)
    if (storage) return JSON.parse(storage)[value]
    return initialState
  }

  const [value, setValue] = useState(get())

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }))
  })

  return [value, setValue]
}

function Counter({ max, step }) {
  const [count, setCount] = useState(getStateFromLocalStorage())

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

  useEffect(() => {
    storeStateInLocalStorage(count)
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
