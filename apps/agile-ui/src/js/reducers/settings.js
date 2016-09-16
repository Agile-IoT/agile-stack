import * as types from '../constants/ActionTypes'

const initialState = {
  open: false,
  items: {
    discovery: {
      on: false,
      protocols: []
    }
  },
  error: null
}

export default function (state = initialState, action) {

  switch (action.type) {
    case types.SETTINGS_DRAWER_TOGGLE:
      return {
        ...state,
        open: !action.state
      }

    case types.SETTINGS_DISCOVERY:
    // start fetching posts and set loading = true
      return {
        ...state,
        items: {
          discovery: {
            on: !state.items.discovery.on,
            protocols: state.items.discovery.protocols
          }
        }
      }
    case types.SETTINGS_DISCOVERY_SUCCEEDED:// return list of posts and make loading = false
      return {
        ...state
      }
    case types.SETTINGS_DISCOVERY_FAILED:// return error and make loading = false
      return {
        ...state,
        items: {
          discovery: {
            on: !state.items.discovery.on,
            protocols: state.items.discovery.protocols
          }
        },
        error: action.payload
      }

    case types.SETTINGS_DISCOVERY_FETCH:
    // start fetching posts and set loading = true
      return {
        ...state
      }
    case types.SETTINGS_DISCOVERY_FETCH_SUCCEEDED:// return list of posts and make loading = false
      console.log(action.data)
      return {
        ...state,
        items: {
          discovery: {
            on: state.items.discovery.on,
            protocols: action.data
          }
        }
      }
    case types.SETTINGS_DISCOVERY_FETCH_FAILED:// return error and make loading = false
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
