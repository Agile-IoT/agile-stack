import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DeviceList, NoResults } from '../../components'
import { bindActionCreators } from 'redux'
import { deviceRegister } from '../../actions/deviceList'

class DeviceListApp extends Component {
  static propTypes = {
    deviceList: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  }
  
  render () {
    const { deviceList: { items, loading, error }, actions, route } = this.props
    if (error) {
      return (<NoResults text='Something went wrong'/>)
    } else if (items.length < 1) {
      return (<NoResults text='No devices found'/>)
    } else {
      return (<DeviceList listName={route.title} loading={loading} devices={items} actions={actions} />)
    }
  }
}

function mapStateToProps(state) {
  return {
    deviceList: state.deviceList
  }
}

function mapDispatchToProps(dispatch, props) {
  let actions = []
  if (props.route.path === '/discover') {
    actions = [{
      text: 'Register',
      func:  bindActionCreators(deviceRegister, dispatch)
    }]
  }
  return {
    actions: actions
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceListApp)
