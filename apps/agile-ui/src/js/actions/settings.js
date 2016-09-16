import * as types from '../constants/ActionTypes'
import { BASE_API } from '../constants/Endpoints'

export function discoveryToggle(state) {
  let method
  let message
  if (state) {
    method = 'DELETE'
    message = 'Discovery successfully turned off'
  } else {
    method = 'POST'
    message = 'Discovery successfully turned on'
  }
  return {
    type: types.SETTINGS_DISCOVERY,
    method: method,
    url: `${BASE_API}/protocols/discovery`,
    confirm: true,
    confirmation: message
  }
}

export function drawerToggle(state) {
  return {
    type: types.SETTINGS_DRAWER_TOGGLE,
    state: state
  }
}

export function discoveryFetch() {
  return {
    type: types.SETTINGS_DISCOVERY_FETCH,
    method: 'GET',
    url: `${BASE_API}/protocols/discovery`
  }
}
