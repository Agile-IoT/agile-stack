import React, { Component, PropTypes } from 'react'
import {Card, CardHeader} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

export default class DeviceStream extends Component {

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    color: PropTypes.string,
    time: PropTypes.string
  }

  render () {
    const childNode = <p>Last updated : {this.props.time} unit: {this.props.unit}</p>
    return (
      <Card>
        <CardHeader
          title={this.props.id}
          subtitle={childNode}
          avatar={<Avatar backgroundColor={this.props.color}>{this.props.value}</Avatar>}
        />
      </Card>
    )
  }
}
