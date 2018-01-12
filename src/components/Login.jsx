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

import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PropTypes from "prop-types";
import Messages from "../i18n/Messages";
import Locales from "../i18n/Locales";
import check from "check-types";
import LanguageMenu from "./common/LanguageMenu.jsx";
import { FormattedMessage } from 'react-intl';

export default class Login extends React.Component {
  static get propTypes() {
    return {
      onLogin: PropTypes.func,
      onLanguageChange: PropTypes.func,
      disabled: PropTypes.bool,
      loginError: PropTypes.string,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      })
    };
  }

  static get defaultProps() {
    return {
      disable: false,
      onLogin: () => {},
      onLanguageChange: () => {}
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      valid: false
    };
  }

  handleLanguageChange(localeId) {
    this.props.onLanguageChange(localeId, Locales.getById(localeId));
  }

  handleLogin() {
    this.props.onLogin(this.state.username, this.state.password);
  }

  handleUsernameChange(event, newValue) {
    this.setState(Object.assign({}, this.state, {
      username: newValue,
      valid: this.hasValidCredentials()
    }));
  }

  handlePasswordChange(event, newValue) {
    this.setState(Object.assign({}, this.state, {
      password: newValue,
      valid: this.hasValidCredentials()
    }));
  }

  hasValidCredentials() {
    return check.nonEmptyString(this.state.username)
      && check.nonEmptyString(this.state.password);
  }

  render() {
    const {intl, disabled, loginError} = this.props;

    const hasError = check.nonEmptyString(loginError);

    return <div>
      <Card className="login">
        <CardTitle title={intl.formatMessage(Messages.login.title)}>
        </CardTitle>
        <CardText>
          <TextField
            floatingLabelText={intl.formatMessage(Messages.login.username)}
            disabled={disabled}
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
          />
          <br/>
          <TextField
            floatingLabelText={intl.formatMessage(Messages.login.password)}
            type="password"
            disabled={disabled}
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
          />
        </CardText>
        {hasError &&
          <CardText color="red">
            <FormattedMessage id={loginError}/>
          </CardText>
        }
        <CardActions>
          <FlatButton
            label={intl.formatMessage(Messages.login.doLogin)}
            disabled={disabled || !this.state.valid}
            onClick={this.handleLogin.bind(this)}
          />
          <LanguageMenu
            iconButtonElement={<FlatButton label={intl.formatMessage(Messages.login.changeLanguage)}/>}
            onLanguageChange={this.handleLanguageChange.bind(this)}
            intl={intl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          />
        </CardActions>
      </Card>
    </div>;
  }
}
