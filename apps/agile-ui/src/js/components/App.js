import React, { Component, PropTypes } from 'react'
import Nav from './Nav/Nav'
import SettingsApp from '../containers/SettingsApp'
import MessagesApp from '../containers/MessagesApp'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object
  }
  render() {
    return (
      <div>
        <Nav route={this.props.location.pathname} />
        <SettingsApp />
        <MessagesApp />
        <div className="container--app">
          {this.props.children}
        </div>
      </div>
    )
  }
}
