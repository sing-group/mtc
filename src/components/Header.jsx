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
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import { FormattedMessage } from 'react-intl';
import es_ES from '../i18n/es_ES.js';
import gl_ES from '../i18n/gl_ES.js';
import en_US from '../i18n/en_US.js';

export default class Header extends React.Component {
  static defaultProps = {
    showMainMenu: false,
    showUserMenu: false,
    onCloseUserMenu: () => {},
    onMainMenuToggle: () => {},
    onOpenUserMenu: e => {},
    onLanguageChange: (locale, messages) => {}
  };

  render() {
    const {
      history,
      intl,
      onMainMenuToggle,
      onOpenUserMenu,
      onCloseUserMenu,
      onLanguageChange
    } = this.props;
    const pushAndToggle = route => {
      return e => {
        history.push(route);
        onMainMenuToggle();
      }
    };
    
    const iconStyle = {
      color: 'white !important'
    };

    const languageMenu = (
      <div>
        <IconMenu iconButtonElement={<IconButton><ActionLanguage color="white"/></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="en" onTouchTap={e => onLanguageChange('en', en_US)}/>
          <MenuItem primaryText="es" onTouchTap={e => onLanguageChange('es', es_ES)}/>
          <MenuItem primaryText="gl" onTouchTap={e => onLanguageChange('gl', gl_ES)}/>
        </IconMenu>

        <IconMenu iconButtonElement={<IconButton><MoreVertIcon color="white"/></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem>
            <FormattedMessage id="settings"/>
          </MenuItem>
          <Divider/>
          <MenuItem>
            <FormattedMessage id="exit"/>
          </MenuItem>
        </IconMenu>
      </div>
    );

    return (
      <div>
        <AppBar title="MultiTasking Cubes"
                iconElementRight={languageMenu}
                onLeftIconButtonTouchTap={e => onMainMenuToggle()}
        />
        <Drawer open={this.props.showMainMenu}
                docked={false}
                onRequestChange={e => onMainMenuToggle()}
        >
          <AppBar title="MTC"
                  showMenuIconButton={false}
                  iconElementRight={<IconButton><NavigationClose/></IconButton>}
                  onRightIconButtonTouchTap={e => onMainMenuToggle()}
          />
          <MenuItem onTouchTap={ pushAndToggle('/') }>
            <FormattedMessage id="openSessions"/>
          </MenuItem>
          <MenuItem onTouchTap={ pushAndToggle('/completed') }>
            <FormattedMessage id="completedSessions"/>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
