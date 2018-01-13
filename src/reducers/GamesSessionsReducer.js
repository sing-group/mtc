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
import Reducer from './Reducer';
import Locales from '../i18n/Locales';

class GamesSessionsReductions {
  static _compareSessions(s1, s2) {
    if (s1.endDate === s2.endDate) {
      if (s1.startDate === s2.startDate) {
        return s1.id - s2.id;
      } else {
        return s1.startDate < s2.startDate ? -1 : 1;
      }
    } else {
      return s1.endDate < s2.endDate ? -1 : 1;
    }
  }

  assignedGamesSessionsRequested(state) {
    return Object.assign({}, state, {
      sessionsRequested: true,
      activeSessions: {
        sessions: []
      },
      inactiveSessions: {
        sessions: []
      }
    });
  }

  assignedGamesSessionsUpdated(state, action) {
    Locales.addLocales(action.messages);

    return Object.assign({}, state, {
      sessionsRequested: false,
      activeSessions: {
        sessions: action.sessions.filter(session => session.isActive())
          .sort(GamesSessionsReductions._compareSessions)
      },
      inactiveSessions: {
        sessions: action.sessions.filter(session => !session.isActive())
          .sort(GamesSessionsReductions._compareSessions)
      }
    });
  }

  gameFinished(state, action) {
    return Reducer.propertyPartialModification(state, 'activeGame', {
      results: [...state.activeGame.results, action.gameResult]
    });
  }

  gameResultStorageRequested(state, action) {
    return Reducer.propertyPartialModification(state, 'activeGame', {
      results: GamesSessionsReducer._removeFromArray(state.activeGame.results, action.gameResult),
      resultsBeingStored: [...state.activeGame.resultsBeingStored, action.gameResult]
    });
  }

  gameResultStored(state, action) {
    action.gameResult.assignedGamesSession.addResult(action.gameResult);

    return Reducer.propertyPartialModification(state, 'activeGame', {
      resultsBeingStored: GamesSessionsReducer._removeFromArray(state.activeGame.resultsBeingStored, action.gameResult)
    });
  }

  static _removeFromArray(array, value) {
    const index = array.indexOf(value);

    if (index === -1) {
      throw new Error('value not found in array');
    }

    const arrayCopy = [...array];

    arrayCopy.splice(index, 1);

    return arrayCopy;
  }
}

const GamesSessionsReducer = Reducer.of(GamesSessionsReductions);

export default GamesSessionsReducer;
