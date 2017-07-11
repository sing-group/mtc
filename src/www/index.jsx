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
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider, intlReducer } from "react-intl-redux";
import ReactDOM from "react-dom";
import App from "../components/App.jsx";
import injectTapEventPlugin from "react-tap-event-plugin";
import UserMenuReducer from "../reducers/UserMenuReducer.js";
import MainMenuReducer from "../reducers/MainMenuReducer.js";
import Reducer from "../reducers/Reducer.js";
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import gl from 'react-intl/locale-data/gl';
import es from 'react-intl/locale-data/es';
import es_ES from '../i18n/es_ES.js';

addLocaleData([...en, ...gl, ...es]);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const mtc = Reducer.chain(new UserMenuReducer(), new MainMenuReducer());

const store = createStore(
  combineReducers({
    mtc: mtc,
    intl: intlReducer
  }),
  {
    mtc: {
      showMainMenu: false,
      showUserMenu: false,
      sessions: [
        {
          id: 1,
          title: 'Session 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor nisl est, nec feugiat mi vehicula non.'
        },
        {
          id: 2,
          title: 'Session 2',
          description: 'Nam tempor ex vitae elit euismod dapibus. Nam ornare nulla nec lectus vestibulum, dictum aliquet turpis commodo.'
        }
      ],
      completedSessions: [
        {
          id: 3,
          title: 'Session 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor nisl est, nec feugiat mi vehicula non.'
        },
        {
          id: 4,
          title: 'Session 4',
          description: 'Nam tempor ex vitae elit euismod dapibus. Nam ornare nulla nec lectus vestibulum, dictum aliquet turpis commodo.'
        },
        {
          id: 5,
          title: 'Session 5',
          description: 'Nam tempor ex vitae elit euismod dapibus. Nam ornare nulla nec lectus vestibulum, dictum aliquet turpis commodo.'
        }
      ]
    },
    intl: {
      defaultLocale: 'es',
      locale: 'es',
      messages: es_ES
    }
  }

);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);