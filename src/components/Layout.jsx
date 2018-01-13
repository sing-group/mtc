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
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Header from './Header';
import Login from './Login';
import SessionPanel from './games_session/SessionPanel';

import MenusActions from '../actions/MenusActions';
import LoginActions from '../actions/LoginActions';
import GamesSessionActions from '../actions/GamesSessionActions';


const mapStateToPropsLayout = state => ({
  isLoggedIn: state.mtc.user.isLoggedIn
});

const mapDispatchToPropsLayout = dispatch => ({
  onComponentWillMount: () => {
    dispatch(GamesSessionActions.assignedGamesSessionsRequested());
  }
});

const mapStateToPropsSessionList = state => ({
  sessions: state.mtc.activeSessions.sessions,
  sessionsRequested: state.mtc.sessionsRequested
});

const mapDispatchToPropsSessionList = dispatch => ({
  onGameStarted: (assignedGamesSession, gameConfig) => {
    dispatch(GamesSessionActions.gameStarted(assignedGamesSession, gameConfig));
  },
  onGameFinished: gameResult => {
    dispatch(GamesSessionActions.gameFinished(gameResult));
  }
});

const mapStateToPropsCompletedSessionList = state => ({
  sessions: state.mtc.inactiveSessions.sessions,
  sessionsRequested: state.mtc.sessionsRequested
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

const ConnectedSessionList = muiThemeable()(injectIntl(connect(
  mapStateToPropsSessionList,
  mapDispatchToPropsSessionList
)(SessionPanel)));

const ConnectedCompletedSessionList = muiThemeable()(injectIntl(connect(
  mapStateToPropsCompletedSessionList
)(SessionPanel)));

class Layout extends React.Component {
  static get propTypes() {
    return {
      isLoggedIn: PropTypes.bool.isRequired,
      onComponentWillMount: PropTypes.func,
    };
  }

  componentWillMount() {
    this.props.onComponentWillMount();
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Router>
        <div>
          <ConnectedHeader/>
          <Switch>
            <Route exact path="/" component={ConnectedSessionList}/>
            <Route exact path="/finished" component={ConnectedCompletedSessionList}/>
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
  mapStateToPropsLayout,
  mapDispatchToPropsLayout
)(Layout));
