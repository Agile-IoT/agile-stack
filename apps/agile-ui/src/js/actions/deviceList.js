// Any deviceList view triggers go here
import * as types from '../constants/ActionTypes'
import { BASE_API, MIDDLEWARE_API } from '../constants/Endpoints'

// request agile API to register device
export function deviceRegister(device) {
  return {
    type: types.DEVICE_REGISTER,
    method: 'POST',
    url: `${BASE_API}/devices`,
    body: {"deviceId":"", "address": device.id, "name": device.name, "description":"", "protocol": device.protocol, "path": "","streams": []},
    confirmation: 'Device successfully Registered'
  }
}

// request middleware to perform nesscary tasks like db creation
export function deviceProvision(device) {
  return {
    type: types.DEVICE_PROVISION,
    method: 'POST',
    url: `${MIDDLEWARE_API}/db/create`,
    body: device,
    confirm: true,
    confirmation: 'Device database successful created'
  }
}

export function deviceListFetch(route) {
  let resource
  resource = '/devices'
  if (route === '/') {
    resource = '/devices'
  } else {
    resource = '/protocols/devices'
  }
  return {
    type: types.DEVICELIST_FETCH,
    method: 'GET',
    url: `${BASE_API}${resource}`
  }
}
