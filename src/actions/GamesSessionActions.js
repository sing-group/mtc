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
import AssignedGamesSession from '@sing-group/mtc-games/src/games_session/AssignedGamesSession';
import GameResult from '@sing-group/mtc-games/src/games_session/GameResult';
import GameConfig from '@sing-group/mtc-games/src/game/GameConfig';

import check from "check-types";

export default class GamesSessionActions {
  static assignedGamesSessionsRequested() {
    return {
      type: 'ASSIGNED_GAMES_SESSIONS_REQUESTED'
    };
  }

  static assignedGamesSessionsUpdated(sessions, messages) {
    check.assert.array.of.instance(sessions, AssignedGamesSession, 'sessions should be an array of AssignedGamesSession');
    check.assert.object(messages, 'messages should be an object');

    return {
      type: 'ASSIGNED_GAMES_SESSIONS_UPDATED',
      sessions: sessions,
      messages: messages
    };
  }

  static gameStarted(assignedGamesSession, gameConfig) {
    check.assert.instance(assignedGamesSession, AssignedGamesSession, 'assignedGamesSession should be an instance of AssignedGamesSession');
    check.assert.instance(gameConfig, GameConfig, 'gameConfig should be an instance of GameConfig');

    return {
      type: 'GAME_STARTED',
      assignedGamesSession: assignedGamesSession,
      gameConfig: gameConfig
    };
  }

  static gameFinished(gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be an instance of GameResult');

    return {
      type: 'GAME_FINISHED',
      gameResult: gameResult
    };
  }

  static gameResultStorageRequested(gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be an instance of GameResult');

    return {
      type: 'GAME_RESULT_STORAGE_REQUESTED',
      gameResult: gameResult
    };
  }

  static gameResultStored(gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be an instance of GameResult');

    return {
      type: 'GAME_RESULT_STORED',
      gameResult: gameResult
    };
  }
}
