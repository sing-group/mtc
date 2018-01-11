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
import check from 'check-types';
import {JsonRestBroker} from './JsonRestBroker';
import LoginActions from "../actions/LoginActions";
import EndpointPathBuilder from "./EndpointPathBuilder";
 
export default class UserEndpoint {
  constructor(pathBuilder, restBroker, store) {
    check.assert.instance(pathBuilder, EndpointPathBuilder, 'pathBuilder should be an instance of EndpointPathBuilder');
    check.assert.instance(restBroker, JsonRestBroker, 'restBroker should be an instance of JsonRestBroker');

    this._pathBuilder = pathBuilder;
    this._rest = restBroker;
    this._store = store;
  }

  login(user, password) {
    const path = this._pathBuilder.login(user, password);

    this._rest.get(path)
      .then(response => {
        if (response.status === 200) {
          if (response.data === "PATIENT") {
            this._store.dispatch(LoginActions.userLogged(user));
          } else {
            this._store.dispatch(LoginActions.userLoginFailed(user, 'Invalid role: ' + response.data));
          }
        } else {
          this._store.dispatch(LoginActions.userLoginFailed(user, response.problem));
        }
      });
  }
}
