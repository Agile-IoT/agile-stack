import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'
import { requestHandler } from '../utils'
import { discoveryFetch } from '../actions/settings'

function* discovery(action) {
  yield call(requestHandler, action)
  yield call(requestHandler, discoveryFetch())
}

export function* settingsSaga() {
  yield call(requestHandler, discoveryFetch())
  yield* takeEvery( types.SETTINGS_DISCOVERY , discovery)
}
