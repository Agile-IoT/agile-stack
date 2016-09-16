import { delay, takeEvery } from 'redux-saga'
import { call, put, fork, cancelled } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'
import { requestHandler, redirector } from '../utils'
import { deviceListFetch, deviceProvision } from '../actions/deviceList'

function* _deviceListPoll(action) {
  try {
    while (true) {
      yield call(requestHandler, action)
      yield call(delay, 2500)
    }
  } finally {
    if (yield cancelled())
      // any clean up actions here
      yield
  }
}

// Success event for middleware device provisioning
// uncomment when middleware is ready

// function* provisioner(action) {
//   yield put(deviceProvision(action.prevAction.body))
//   // redirects user from /discovery to device list after successful registration
//   yield call(redirector, '/')
// }
// function* _registerationWatcher() {
//   yield takeEvery(types.DEVICE_REGISTER_SUCCEEDED, provisioner)
// }

export function* deviceListSaga(route) {
  const action = yield put(deviceListFetch(route))
  yield fork(_deviceListPoll, action)
  yield takeEvery([types.DEVICE_REGISTER, types.DEVICE_PROVISION], requestHandler)
}
