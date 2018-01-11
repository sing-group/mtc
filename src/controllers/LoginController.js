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
 
import UserEndpoint from "../endpoint/UserEndpoint";
import check from 'check-types';
import StoreListener from "./StoreListener";

export default class LoginController {
  constructor(endpoint) {
    check.assert.instance(endpoint, UserEndpoint, 'endpoint should be an instance of UserEndpoint');

    this._endpoint = endpoint;
  }

  static hasStoredCredentials() {
    return LoginController.getStoredUsername() !== null
      && LoginController.getStoredToken() !== null;
  }

  static getStoredUsername() {
    return localStorage.getItem("username");
  }

  static getStoredToken() {
    return localStorage.getItem("token");
  }

  static setStoredUsername(username) {
    localStorage.setItem("username", username);
  }

  static setStoredToken(token) {
    localStorage.setItem("token", token);
  }

  static clearStoredCredentials() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }

  subscribeTo(store) {
    const storeListener = new StoreListener(store);

    storeListener.listen(
      state => state.mtc.user.loginRequested,
      (loginRequested, _, state) => {
        if (loginRequested) {
          this._endpoint.login(state.mtc.user.username, state.mtc.user.password);
        }
      }
    );

    storeListener.listen(
      state => state.mtc.user.isLoggedIn,
      (loggedIn, _, state) => {
        if (loggedIn) {
          LoginController.setStoredUsername(state.mtc.user.username);
          LoginController.setStoredToken(state.mtc.user.token);
        } else {
          LoginController.clearStoredCredentials();
        }
      }
    );
  }
}
