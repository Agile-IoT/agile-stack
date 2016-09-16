import { delay, takeEvery } from 'redux-saga'
import { call, put, fork, cancelled } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'
import { redirector, requestHandler } from '../utils'
import { deviceFetch, deviceStreamFetch } from '../actions/device'

function* deviceListeners() {
  yield takeEvery([types.DEVICE_FETCH, types.DEVICE_DELETE], requestHandler)
}

function* deviceRedirectors() {
  yield takeEvery(types.DEVICE_DELETE_SUCCEEDED, redirector, '/')
}

function* streamPoller(action) {
 try {
   while (true) {
     for (var s in action.data.streams) {
       yield call(requestHandler, deviceStreamFetch(action.data, action.data.streams[s]))
     }
     yield call(delay, 2000)
   }
 } finally {
   if (yield cancelled())
     // any clean up actions here
     yield
 }
}

export function* deviceSaga(route) {
  yield fork(deviceListeners)
  yield fork(deviceRedirectors)
  // get the deviceID from route
  const id = route.split("/").pop()
  // fetch the device
  yield put(deviceFetch(id))
  yield takeEvery([types.DEVICE_FETCH_SUCCEEDED], streamPoller)
}
