/*
 * MultiTasking Cubes Administration
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Francisco Rojas Rodríguez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
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

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Locales from "../i18n/Locales";
import Messages from "../i18n/Messages";
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

export default class LanguageMenu extends Component {
  static get propTypes() {
    return {
      onLanguageChange: PropTypes.func,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      })
    };
  }

  static get defaultProps() {
    return {
      onLanguageChange: () => {}
    };
  }

  handleLanguageChange(localeId) {
    this.props.onLanguageChange(localeId, Locales.getById(localeId));
  }

  render() {
    const {intl} = this.props;

    const iconMenuProps = Object.assign({}, this.props);
    delete iconMenuProps.onLanguageChange;

    const localeItems = Locales.LOCALE_IDS.map(id => (
      <MenuItem key={id} value={id}
                primaryText={intl.formatMessage(Messages.locale[id])}
                onClick={() => this.handleLanguageChange(id)}/>
    ));

    return <IconMenu {...iconMenuProps}>
      {localeItems}
    </IconMenu>;
  }
}
