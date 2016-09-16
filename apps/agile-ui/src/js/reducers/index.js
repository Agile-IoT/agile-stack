import { combineReducers } from 'redux'
import deviceList from './deviceList'
import device from './device'
import settings from './settings'
import messages from './messages'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  deviceList,
  device,
  settings,
  messages
})

export default rootReducer
