import React, { useReducer, createContext, useCallback } from 'react'

import id from 'uuid/v4'
import initialState from './initialState'

const GRUDGE_ADD = 'GRUDGE_ADD'
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE'

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state]
  }
  if (action.type === GRUDGE_FORGIVE) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) return grudge
      return { ...grudge, forgiven: !grudge.forgiven }
    })
  }

  return state
}

export const GrudgeProvider = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState)
  
  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id(),
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
}
