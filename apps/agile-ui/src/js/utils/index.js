import axios from 'axios'
import { browserHistory } from 'react-router'
import { call, put } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

export function _requester(method, resource, body) {
  return axios({
    method: method,
    url: resource,
    headers: [],
    data: body
  })
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

export function* requestHandler(action) {
  const { response, error } = yield call(_requester, action.method, action.url, action.body)
  if (error) {
    // if there is a failure, propagate to state
    yield put({ type: `${action.type}_FAILED` , data: error, prevAction: action })
    yield put({ type: types.ERRORS_ADD , data: error, prevAction: action })
  } else {
    yield put({ type: `${action.type}_SUCCEEDED` , data: response.data, prevAction: action })
    // if there is a success message, propagate to state
    if (action.confirm) {
      yield put({ type: types.CONFIRMATIONS_ADD ,  data: response, prevAction: action })
    }
  }
}

export function redirector(route) {
  browserHistory.push(route)
  return
}
