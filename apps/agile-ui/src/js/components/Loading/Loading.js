import React, { Component, PropTypes } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default class Device extends Component {

  static propTypes = {
    loading: PropTypes.string.isRequired
  };

  style = {
    // position: 'relative',
    // margin: 'auto'
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: '0 !important'
  }

  render () {
    return (
      <div className='container--app'>
        <RefreshIndicator
          size={80}
          top={50}
          left={0}
          status={this.props.loading}
          loadingColor={"#FF9800"}
          style={this.style}
        />
      </div>
    )
  }
}
