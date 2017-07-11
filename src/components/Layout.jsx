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
import Header from './Header.jsx';
import { connect } from 'react-redux';
import SessionList from './SessionList.jsx';
import { withRouter } from 'react-router';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

const mapStateToPropsSessionList = state => {
  return {
    sessions: state.sessions
  };
};

const mapStateToPropsCompletedSessionList = state => {
  return {
    sessions: state.completedSessions
  };
};

const mapStateToPropsHeader = state => {
  return {
    showMainMenu: state.showMainMenu,
    showUserMenu: state.showUserMenu,
    userMenuTarget: state.userMenuTarget
  };
};

const mapDispatchToPropsHeader = dispatch => {
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

const ConnectedHeader = withRouter(connect(
  mapStateToPropsHeader,
  mapDispatchToPropsHeader
)(Header));

const ConnectedSessionList = connect(
  mapStateToPropsSessionList
)(SessionList);

const ConnectedCompletedSessionList = connect(
  mapStateToPropsCompletedSessionList
)(SessionList);

class Layout extends React.Component {
  render() {
    return (
      <Router>
        <div>
            <ConnectedHeader/>
            <Route exact path="/" component={ConnectedSessionList}/>
            <Route exact path="/completed" component={ConnectedCompletedSessionList}/>
        </div>
      </Router>
    );
  }
};

export default Layout;
