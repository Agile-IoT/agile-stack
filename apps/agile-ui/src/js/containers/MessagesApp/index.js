import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

class MessagesApp extends Component {

  static propTypes = {
    errors: PropTypes.array.isRequired,
    confirmations: PropTypes.array.isRequired
  }

  render () {
    // TODO CLEAN UP THIS RENDER METHOD
    let node = ''
    let open = false
    let type = null
    if (this.props.errors.length > 0) {
      type = 'CONFIRMATIONS_ADD'
      open = true
      node = (<div>Error: errors[0]</div>)
    }
    if (this.props.confirmations.length > 0) {
      type = 'CONFIRMATIONS_REMOVE'
      open = true
      node = (<div>{this.props.confirmations[0]}</div>)
    }
    return (
      <Snackbar
        open={open}
        message={node}
        autoHideDuration={4000}
        onRequestClose={() => this.props.dispatch({type: type })}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.messages.errors,
    confirmations: state.messages.confirmations
  }
}

export default connect(
  mapStateToProps,
)(MessagesApp)
