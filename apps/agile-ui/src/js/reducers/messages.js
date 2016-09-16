import * as types from '../constants/ActionTypes'
var update = require('react/lib/update')

const initialState = {
  confirmations: [],
  errors: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CONFIRMATIONS_ADD:
      return {
        ...state,
        confirmations: [...state.confirmations, action.prevAction.confirmation]
      }

    case types.CONFIRMATIONS_REMOVE:
      return {
        ...state,
        confirmations: [...state.confirmations.slice(0, state.confirmations.length - 1)]
      }

    case types.ERRORS_ADD:
      return {
        ...state,
        errors: [...state.errors, action.data]
      }

    case types.ERRORS_REMOVE:
      return {
        ...state,
        errors: [...state.errors.slice(0, state.errors.length - 1)]
      }

    default:
      return state
  }
}
