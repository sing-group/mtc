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
import ReactDOM from 'react-dom';
import {addLocaleData} from 'react-intl';
import {intlReducer, Provider} from 'react-intl-redux';
import en from 'react-intl/locale-data/en';
import gl from 'react-intl/locale-data/gl';
import es from 'react-intl/locale-data/es';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {combineReducers, createStore} from 'redux';

import App from '../components/App';
import Locales from '../i18n/Locales';

import WebFontLoader from 'webfontloader';
import './main.css';

import 'pixi';
import 'p2';

import Reducer from '../reducers/Reducer';
import GamesSessionsReducer from '../reducers/GamesSessionsReducer';
import LoginReducer, {LoginReductions} from '../reducers/LoginReducer';
import MainMenuReducer from '../reducers/MainMenuReducer';
import UserMenuReducer from '../reducers/UserMenuReducer';

import EndpointPathBuilder from '../endpoint/EndpointPathBuilder';
import JsonRestBroker from '../endpoint/JsonRestBroker';

import GamesSessionEndpoint from '../endpoint/GamesSessionEndpoint';
import UserEndpoint from '../endpoint/UserEndpoint';

import GamesSessionsController from '../controllers/GamesSessionsController';
import LoginController from '../controllers/LoginController';

import { API_URL } from '../configuration/configuration';


WebFontLoader.load({
  google: {
    families: ['Roboto:400,300,500:latin']
  }
});

addLocaleData([...en, ...gl, ...es]);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const mtc = Reducer.chain(
  new UserMenuReducer(),
  new MainMenuReducer(),
  new LoginReducer(),
  new GamesSessionsReducer()
);

const store = createStore(
  combineReducers({
    mtc: mtc,
    intl: intlReducer
  }),
  {
    mtc: {
      user: LoginReductions.initialUserState(),
      menu: {
        showMainMenu: false
      },
      assignedSessions: {
        requested: false,
        sessions: []
      },
      completedSessions: {
        requested: false,
        sessions: []
      }
    },
    intl: {
      defaultLocale: Locales.DEFAULT_LOCALE_ID,
      locale: Locales.DEFAULT_LOCALE_ID,
      messages: Locales.DEFAULT_LOCALE
    }
  }
);

const restBroker = new JsonRestBroker(API_URL, () => store.getState().mtc.user.token);
const endpointPathBuilder = new EndpointPathBuilder();

const userEndpoint = new UserEndpoint(endpointPathBuilder, restBroker, store);
const gamesSessionEndpoint = new GamesSessionEndpoint(endpointPathBuilder, restBroker, store);

const loginController = new LoginController(userEndpoint);
const gamesSessionController = new GamesSessionsController(gamesSessionEndpoint);

loginController.subscribeTo(store);
gamesSessionController.subscribeTo(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
