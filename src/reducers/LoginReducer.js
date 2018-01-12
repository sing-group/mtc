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
import Reducer from './Reducer';

import LoginController from '../controllers/LoginController';

export class LoginReductions {
  static initialUserState() {
    return {
      isLoggedIn: LoginController.hasStoredCredentials(),
      username: LoginController.getStoredUsername(),
      password: null,
      token: LoginController.getStoredToken(),
      loginRequested: false,
      loginError: null
    };
  }

  userLoginRequested(state, action) {
    return Object.assign({}, state,
      {
        user: {
          isLoggedIn: false,
          username: action.username,
          password: action.password,
          token: null,
          loginRequested: true,
          loginError: null
        }
      }
    );
  }

  userLogged(state) {
    return Object.assign({}, state,
      {
        user: {
          isLoggedIn: true,
          username: state.user.username,
          password: null,
          token: btoa(state.user.username + ':' + state.user.password),
          loginRequested: false,
          loginError: null
        }
      }
    );
  }

  userLoginFailed(state) {
    return Object.assign({}, state, {
      user: Object.assign({}, state.user,
        {
          isLoggedIn: false,
          loginRequested: false,
          loginError: 'login.invalidCredentials'
        }
      )
    });

  }

  userLogoutRequested(state) {
    return Object.assign({}, state, {
      user: {
        isLoggedIn: false,
        username: null,
        password: null,
        token: null,
        loginRequested: false,
        loginError: null
      }
    });
  }
}

const LoginReducer = Reducer.of(LoginReductions);

export default LoginReducer;
