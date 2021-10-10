import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'

import endpoint from './endpoint'

import './styles.scss'

const initialState = {
  result: null,
  loading: true,
  error: null,
}

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      result: null,
      loading: true,
      error: null,
    }
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    }
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    }
  }

  return state
}

const Application = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch(`${endpoint}/characters`)
      .then((response) => response.json())
      .then((data) => setCharacters(data.characters))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharacterList characters={characters} />
        </section>
      </main>
    </div>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
)
