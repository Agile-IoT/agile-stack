import React, { Component, PropTypes } from 'react'
import { Card } from 'material-ui/Card'
import DeviceBasicInfo from './DeviceBasicInfo'
import Loading from '../Loading/Loading'
import DeviceStream from './DeviceStream'
import DeviceActions from './DeviceActions'
var randomMC = require('random-material-color')

export default class Device extends Component {

  static propTypes = {
    loading: PropTypes.string,
    actions: PropTypes.array,
    color: PropTypes.string,
    device: PropTypes.object
  }

  renderStreams(streams) {
    // renders each devices stream
    if (streams)
      return streams.map((stream, index) =>
        (
          <DeviceStream
            key={index}
            id={stream.id}
            unit={stream.unit}
            value={stream.value}
            color={randomMC.getColor()}
            time={stream.time}
            />
        )
      )
  }
  render () {
    return (
      <div>
        <Card>
          <Loading loading={this.props.loading} />
          <DeviceBasicInfo
            id={this.props.device.deviceId}
            name={this.props.device.name}
            protocol={this.props.device.protocol}
          />
          <DeviceActions
            device={this.props.device}
            actions={this.props.actions}
          />
        </Card>
      {this.renderStreams(this.props.device.streams)}
      </div>
    )
  }
}
