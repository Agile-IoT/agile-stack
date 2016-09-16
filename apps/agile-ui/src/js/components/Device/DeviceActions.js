import React, { Component, PropTypes } from 'react'
import {CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class DeviceActions extends Component {

  static propTypes = {
    actions: PropTypes.array,
    device: PropTypes.object
  }

  renderList() {
    return this.props.actions.map((action) =>
      (
        <FlatButton key={action.text} label={action.text}
          onClick={() => action.func(this.props.device)}
        />
      )
    )
  }

  render () {
    return (
      <CardActions>
        {this.renderList()}
     </CardActions>
    )
  }
}
