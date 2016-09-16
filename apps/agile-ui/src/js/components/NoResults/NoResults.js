import React, { Component, PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'

export default class NoResults extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };
  render () {
    return (
      <div className="test--center">
        <FontIcon className="material-icons">sentiment_very_dissatisfied</FontIcon>
        <h3>{this.props.text}</h3>
      </div>
    )
  }
}
