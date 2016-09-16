import * as types from '../constants/ActionTypes'

const initialState = {
  item: {},
  error: null,
  loading: 'hide'
}

export default function (state = initialState, action) {
  switch (action.type) {

    case types.DEVICE_FETCH:
      return {
        ...state,
        loading: 'loading'
      }
    case types.DEVICE_FETCH_SUCCEEDED:
      return {
        ...state,
        item: action.data,
        loading: 'hide'
      }
    case types.DEVICE_FETCH_FAILED:
      return {
        ...state,
        item: null,
        error: action.data,
        loading: 'hide'
      }

    case types.DEVICE_DELETE:
      return {
        ...state,
        loading: 'loading'
      }
    case types.DEVICE_DELETE_SUCCEEDED:
      return {
        ...state,
        item: {},
        loading: 'hide'
      }
    case types.DEVICE_DELETE_FAILED:
      return {
        ...state,
        error: action.data,
        loading: 'hide'
      }

    case types.DEVICE_STREAM_FETCH_SUCCEEDED:
    // replaces value in the item.streams array
      const index = state.item.streams.findIndex((stream) => stream.id === action.data.id)
      return {
         ...state,
          item: {
            name: state.item.name,
            id: state.item.id,
            path: state.item.path,
            streams: [
              ...state.item.streams.slice(0, index),
              Object.assign({}, state.item.streams[index], action.data),
              ...state.item.streams.slice(index + 1)
            ]
          },
          loading: 'hide'
      }

    case types.DEVICE_STREAM_FETCH_FAILED:
      return {
        ...state,
        error: action.data,
        loading: 'hide'
      }

    default:
      return state
  }
}
