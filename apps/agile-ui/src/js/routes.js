import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './components/App'
import DeviceListApp from './containers/DeviceListApp'
import DeviceApp from './containers/DeviceApp'
import NotFoundApp from './containers/NotFoundApp'

export default (
  <Route path="/" component={App}>
    <IndexRoute title="Devices" component={DeviceListApp} />
    <Route path="/discover" title="Discover" component={DeviceListApp} />
    <Route path="/device/:id" component={DeviceApp} />
    <Route path="404" component={NotFoundApp} />
    <Redirect from="*" to="404" />
  </Route>
)
