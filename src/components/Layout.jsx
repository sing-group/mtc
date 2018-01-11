/*
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
import Header from './Header.jsx';
import {connect} from 'react-redux';
import SessionList from './SessionList.jsx';
import {withRouter} from 'react-router';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import MenusActions from "../actions/MenusActions";
import Login from "./Login.jsx";
import LoginActions from "../actions/LoginActions";
import PropTypes from "prop-types";

const mapStateToPropsLayout = state => ({
  isLoggedIn: state.mtc.user.isLoggedIn
});

const mapStateToPropsSessionList = state => ({
  sessions: state.mtc.sessions
});

const mapStateToPropsCompletedSessionList = state => ({
  sessions: state.mtc.completedSessions
});

const mapStateToPropsHeader = state => ({
  showMainMenu: state.mtc.menu.showMainMenu
});

const mapDispatchToPropsHeader = dispatch => ({
  onMainMenuToggle: () => {
    dispatch(MenusActions.toggleMainMenu());
  },
  onLanguageChange: (locale, messages) => {
    dispatch(updateIntl({locale, messages}));
  },
  onLogout: () => {
    dispatch(LoginActions.logoutRequested());
  }
});

const mapStateToPropsLogin = state => ({
  disabled: state.mtc.user.loginRequested,
  loginError: state.mtc.user.loginError
});

const mapDispatchToLogin = dispatch => ({
  onLogin: (username, password) => {
    dispatch(LoginActions.loginRequested(username, password));
  },
  onLanguageChange: (locale, messages) => {
    dispatch(updateIntl({locale, messages}));
  }
});

const ConnectedLogin = injectIntl(connect(
  mapStateToPropsLogin,
  mapDispatchToLogin
)(Login));

const ConnectedHeader = injectIntl(withRouter(connect(
  mapStateToPropsHeader,
  mapDispatchToPropsHeader
)(Header)));

const ConnectedSessionList = injectIntl(connect(
  mapStateToPropsSessionList
)(SessionList));

const ConnectedCompletedSessionList = injectIntl(connect(
  mapStateToPropsCompletedSessionList
)(SessionList));

class Layout extends React.Component {
  static get propTypes() {
    return {
      isLoggedIn: PropTypes.bool.isRequired
    };
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Router>
        <div>
          <ConnectedHeader/>
          <Switch>
            <Route exact path="/" component={ConnectedSessionList}/>
            <Route exact path="/completed" component={ConnectedCompletedSessionList}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>;
    } else {
      return <Router>
        <Switch>
          <Route exact path="/" component={ConnectedLogin}/>
          <Redirect to="/"/>
        </Switch>
      </Router>;
    }
  }
}

export default injectIntl(connect(
  mapStateToPropsLayout
)(Layout));
