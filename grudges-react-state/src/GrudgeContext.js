import React, { useReducer, createContext, useCallback } from 'react'

import id from 'uuid/v4'
import initialState from './initialState'

export const GrudgeContext = createContext()

const GRUDGE_ADD = 'GRUDGE_ADD'
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE'

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    const newPresent = [
      {
        id: id(),
        ...action.payload,
      },
      ...state.present,
    ]

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === GRUDGE_FORGIVE) {
    const newPresent = state.present.map((grudge) => {
      if (grudge.id !== action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven }
      }
      return grudge
    })

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  return state
}

const defaultState = {
  past: [],
  present: initialState,
  future: [],
}

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useUndoReducer(reducer, initialState)
  const grudges = state.present

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
        },
      })
    },
    [dispatch],
  )

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id,
        },
      })
    },
    [dispatch],
  )

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' })
  },[dispatch])

  return (
    <GrudgeContext.Provider value={{ grudges, addGrudge, toggleForgiveness }}>
      {children}
    </GrudgeContext.Provider>
  )
}
