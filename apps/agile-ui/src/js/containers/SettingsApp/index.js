import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Settings } from '../../components'
import { bindActionCreators } from 'redux'
import * as settingsActions from '../../actions/settings'

class SettingsApp extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  render () {
    const { open, actions, settings, error } = this.props
    return (
      <Settings open={open} settings={settings} actions={actions} error={error}  />
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings.items,
    open: state.settings.open,
    error: state.settings.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsApp)
