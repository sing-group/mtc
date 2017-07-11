/*
 MultiTasking Cubes
 Copyright (C) 2017 - Miguel Reboiro Jato

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';

class BaseHeader extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="MultiTasking Cubes"
                iconElementRight={<FlatButton label="User"/>}
                onLeftIconButtonTouchTap={e => this.props.onMainMenuToggle()}
                onRightIconButtonTouchTap={e => this.props.onOpenUserMenu(e) }
        />
        <Drawer open={this.props.showMainMenu}
                docked={false}
                onRequestChange={e => this.props.onMainMenuToggle()}
        >
          <AppBar title="MTC"
                  showMenuIconButton={false}
                  iconElementRight={<IconButton><NavigationClose/></IconButton>}
                  onRightIconButtonTouchTap={e => this.props.onMainMenuToggle()}
          />
          <MenuItem onTouchTap={e => this.props.onMainMenuToggle()}>Sesiones pendientes</MenuItem>
          <MenuItem onTouchTap={e => this.props.onMainMenuToggle()}>Sesiones completas</MenuItem>
        </Drawer>
        <Popover open={this.props.showUserMenu}
                 anchorEl={this.props.userMenuTarget}
                 anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
                 onRequestClose={e => { console.log(e); this.props.onCloseUserMenu(); }}
        >
          <Menu>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Exit</MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMainMenu: state.showMainMenu,
    showUserMenu: state.showUserMenu,
    userMenuTarget: state.userMenuTarget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMainMenuToggle: () => {
      dispatch({ type: 'TOGGLE_MAIN_MENU' });
    },
    onOpenUserMenu: (e) => {
      e.preventDefault();
      dispatch({ type: 'OPEN_USER_MENU', target: e.currentTarget });
    },
    onCloseUserMenu: () => {
      dispatch({ type: 'CLOSE_USER_MENU' });
    }
  };
};

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseHeader);

export default Header;