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
import EndpointPathBuilder from './EndpointPathBuilder';
import JsonRestBroker from './JsonRestBroker';

import GamesSessionActions from '../actions/GamesSessionActions';

import GameResult from '@sing-group/mtc-games/src/games_session/GameResult';

import check from 'check-types';

export default class GameResultEndpoint {
  constructor(pathBuilder, restBroker, store) {
    check.assert.instance(pathBuilder, EndpointPathBuilder, 'pathBuilder should be an instance of EndpointPathBuilder');
    check.assert.instance(restBroker, JsonRestBroker, 'restBroker should be an instance of JsonRestBroker');
    check.assert.object(store, 'store should be an object');

    this._pathBuilder = pathBuilder;
    this._rest = restBroker;
    this._store = store;
  }

  addResult(username, gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be an instance of GameResult');

    GamesSessionActions.gameResultStorageRequested(gameResult);

    const path = this._pathBuilder.gameResult(username, gameResult.assignedGamesSession.id, gameResult.gameIndex);

    //TODO: do something on response.ok === false
    this._rest.post(path, {
      startDate: gameResult.startDate.getTime(),
      endDate: gameResult.endDate.getTime(),
      results: {
        values: GameResultEndpoint._mapResultsToData(gameResult.results)
      }
    })
    .then(response => {
      if (response.ok) {
        this._store.dispatch(
          GamesSessionActions.gameResultStored(gameResult)
        );
      }
    });
  }

  static _mapResultsToData(results) {
    return Object.keys(results).map(key => ({
      key: key,
      value: `${results[key]}`
    }));
  }
}
