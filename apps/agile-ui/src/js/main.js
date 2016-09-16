import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore  from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap for material-ui
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({}, sagaMiddleware)

sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(browserHistory, store)

const rootElement = document.getElementById('app')

let ComponentEl

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default

  ComponentEl = (
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  )
} else {
  ComponentEl = (
    <div>
      <Router history={history} routes={routes} />
    </div>
  )
}

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
    {ComponentEl}
    </MuiThemeProvider>
  </Provider>,
  rootElement
)
