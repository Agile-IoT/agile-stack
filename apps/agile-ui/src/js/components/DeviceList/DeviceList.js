import React, { Component, PropTypes } from 'react'
import DeviceListItem from '../DeviceListItem/DeviceListItem'
import Loading from '../Loading/Loading'

export default class DeviceList extends Component {

  static propTypes = {
    devices: PropTypes.array.isRequired,
    loading: PropTypes.string
  };

  renderList() {
    return this.props.devices.map((device) =>
      (
        <DeviceListItem
          key={device.deviceId || device.id}
          id={device.deviceId || device.id}
          name={device.name}
          protocol={device.protocol}
          device={device}
          actions={this.props.actions} />
      )
    )
  }

  render () {
    return (
      <div>
        <Loading loading={this.props.loading}/>
        <ul className="DeviceList">
          {this.renderList()}
        </ul>
      </div>

    )
  }
}
