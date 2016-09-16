import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import Toggle from 'material-ui/Toggle'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

export default class Settings extends Component {

  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  // TODO decide on styling technique
  style = {
    AppBar: {
      margin: '0 0 20px'
    },
    Toggle: {
      margin: '0 20px 0'
    },
    Cog: {
      margin: '20px 0 0 20px',
      cursor: 'pointer'
    }
  }

  renderList () {
    if (this.props.settings.discovery.protocols.length > 0) {
      return this.props.settings.discovery.protocols.map((protocol) =>
        (
          <div key={protocol.name}>
            <ListItem primaryText={protocol.name} secondaryText={protocol.status} />
            <Divider />
          </div>
        )
      )
    }
  }

  render() {
    const { actions: { drawerToggle, discoveryToggle }, settings, open } = this.props
    return (
      <div>
        <FontIcon style={this.style.Cog} toggled={open}
          onTouchTap={() => drawerToggle(open)}
          className="material-icons"
          >
          settings
        </FontIcon>
        <Drawer open={open}>
          <AppBar
             title='Settings'
             style={this.style.AppBar}
             showMenuIconButton={false}
             iconElementRight={<IconButton
             onTouchTap={() => drawerToggle(open)}>
              <NavigationClose/>
             </IconButton>}
          />
          <Toggle
             label="Device Discovery"
             labelPosition="right"
             style={this.style.Toggle}
             onToggle={() => discoveryToggle(settings.discovery.on)}
             toggled={settings.discovery.on}
           />
         <List>
         {this.renderList()}
         </List>
        </Drawer>
      </div>
    )
  }
}
