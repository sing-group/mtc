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
import {create} from 'apisauce';

export default class JsonRestBroker {
  constructor(apiUrl, tokenProvider) {
    check.assert.nonEmptyString(apiUrl, 'apiUrl should be a non empty string');
    check.assert.function(tokenProvider, 'tokenProvider should be a function');

    this._apiUrl = apiUrl;
    this._tokenProvider = tokenProvider;
  }

  _createApi() {
    const headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    const token = this._tokenProvider();

    if (check.nonEmptyString(token)) {
      headers.Authorization = 'Basic ' + token;
    }

    return create({
      baseURL: this._apiUrl,
      headers: headers
    });
  }

  get(...params) {
    return this._createApi().get(...params);
  }


  post(...params) {
    return this._createApi().post(...params);
  }
}
