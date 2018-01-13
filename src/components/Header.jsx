/**
 * MultiTasking Cubes
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Adolfo Piñón Blanco,
 * Hugo López-Fernández, Rosalía Laza Fidalgo, Reyes Pavón Rial,
 * Francisco Otero Lamas, Adrián Varela Pomar, Carlos Spuch Calvar,
 * and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionLanguage from 'material-ui/svg-icons/action/language';

import LanguageMenu from './common/LanguageMenu';

import Locales from '../i18n/Locales';

export default class Header extends React.Component {
  static get propTypes() {
    return {
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      }),
      showMainMenu: PropTypes.bool,
      onMainMenuToggle: PropTypes.func,
      onLanguageChange: PropTypes.func,
      onLogout: PropTypes.func,
      history: PropTypes.object.isRequired
    };
  }

  static get defaultProps() {
    return {
      showMainMenu: false,
      onLogout: () => {},
      onMainMenuToggle: () => {},
      onLanguageChange: () => {}
    };
  }

  handleLogout() {
    this.props.onLogout();
  }

  handleLanguageChange(localeId) {
    this.props.onLanguageChange(localeId, Locales.getById(localeId));
  }

  handleRouteChange(route) {
    const {history} = this.props;

    if (history.location.pathname !== route) {
      history.push(route);
    }
    this.handleMainMenuToggle();
  }

  handleMainMenuToggle() {
    this.props.onMainMenuToggle();
  }

  render() {
    const {
      intl,
      showMainMenu
    } = this.props;

    const settingsMenu = (
      <div>
        <LanguageMenu iconButtonElement={<IconButton><ActionLanguage color='white'/></IconButton>}
          intl={intl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onLanguageChange={this.handleLanguageChange.bind(this)}
        />
        <IconMenu iconButtonElement={<IconButton><MoreVertIcon color='white'/></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem>
            <FormattedMessage id="settings"/>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={this.handleLogout.bind(this)}>
            <FormattedMessage id="exit"/>
          </MenuItem>
        </IconMenu>
      </div>
    );

    return (
      <div>
        <AppBar title="MultiTasking Cubes"
                iconElementRight={settingsMenu}
                onLeftIconButtonClick={this.handleMainMenuToggle.bind(this)}
        />
        <Drawer open={showMainMenu}
                docked={false}
                onRequestChange={this.handleMainMenuToggle.bind(this)}
        >
          <AppBar title="MTC"
                  showMenuIconButton={false}
                  iconElementRight={<IconButton><NavigationClose/></IconButton>}
                  onRightIconButtonClick={this.handleMainMenuToggle.bind(this)}
          />
          <MenuItem onClick={() => this.handleRouteChange('/') }>
            <FormattedMessage id="sessions.active"/>
          </MenuItem>
          <MenuItem onClick={() => this.handleRouteChange('/finished') }>
            <FormattedMessage id="sessions.inactive"/>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
