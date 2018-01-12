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
}
