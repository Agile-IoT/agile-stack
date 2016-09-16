import { fork, take, cancel } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import {deviceListSaga} from './deviceList'
import {settingsSaga} from './settings'
import {deviceSaga} from './device'
import * as types from '../constants/ActionTypes'

export function* rootSaga() {
  // settings saga runs on every page
  yield fork(settingsSaga)
  // handle view changes and spawn appropriate sagas
  yield takeEvery(types.LOCATION_CHANGE, routeHandler)
}

function* routeHandler(action) {
  if (action.payload.pathname === '/' || action.payload.pathname === '/discover' ) {
    // spawn deviceListSaga
    const saga = yield fork(deviceListSaga, action.payload.pathname)
    // kill when route changes
    yield take(types.LOCATION_CHANGE)
    yield cancel(saga)
  } else {
    // else spawn device view saga
    const saga = yield fork(deviceSaga, action.payload.pathname)
    // kill when route changes
    yield take(types.LOCATION_CHANGE)
    yield cancel(saga)
  }
}
