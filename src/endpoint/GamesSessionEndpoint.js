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

import EndpointPathBuilder from "./EndpointPathBuilder";
import {JsonRestBroker} from "./JsonRestBroker";
import check from "check-types";
import GameBuilder from '@sing-group/mtc-games/src/game/GameBuilder';
import SessionMetadata from '@sing-group/mtc-games/src/session/SessionMetadata';
import AssignedGamesSession from "../domain/AssignedGamesSession";
import GamesSessionActions from "../actions/GamesSessionActions";

export default class GamesSessionEndpoint {
  constructor(pathBuilder, restBroker, store) {
    check.assert.instance(pathBuilder, EndpointPathBuilder, 'pathBuilder should be an instance of EndpointPathBuilder');
    check.assert.instance(restBroker, JsonRestBroker, 'restBroker should be an instance of JsonRestBroker');

    this._pathBuilder = pathBuilder;
    this._rest = restBroker;
    this._store = store;
  }

  getAssignedSessions(username) {
    const path = this._pathBuilder.assignedSessions(username);

    this._rest.get(path)
      .then(response => {
        return Promise.all(response.data.map(assignedSession =>
          this.completeAssignedSession(assignedSession)
        ));
      })
      .then(assignedSessions => {
        assignedSessions = this.mergeAssignedSessions(assignedSessions);
        this._store.dispatch(
          GamesSessionActions.assignedGamesSessionsUpdated(
            assignedSessions.sessions, assignedSessions.messages
          ));
      });
  }

  mergeAssignedSessions(assignedSessions) {
    const merged = {
      messages: {},
      sessions: []
    };

    assignedSessions.forEach(session => {
      merged.messages = this.mergeMessages(merged.messages, session.messages);
      merged.sessions.push(session.session);
    });

    return merged;
  }

  completeAssignedSession(assignedSession) {
    return this._rest.get(assignedSession.gamesSession.uri)
      .then(response => {
        assignedSession.gamesSession = response.data;
        return {
          messages: this.mapAssignedGamesSessionToLocaleMessages(assignedSession),
          session: this.mapAssignedGamesSessionToSessionMetadata(assignedSession)
        };
      });
  }

  mapAssignedGamesSessionToSessionMetadata(session) {
    const gamesSession = session.gamesSession;

    const gameConfigs = gamesSession.gameConfiguration.map(gameConfig => {
      return this.mapGameConfigurationToGameConfig(gameConfig)
    });

    return new AssignedGamesSession(
      new Date(session.startDate),
      new Date(session.endDate),
      new SessionMetadata(
        `session.${gamesSession.id}.name`,
        `session.${gamesSession.id}.description`,
        gameConfigs
      )
    );
  }

  mapGameConfigurationToGameConfig(gameConfiguration) {
    const config = GameBuilder.gameConfigForId(gameConfiguration.gameId);

    gameConfiguration.parameter.forEach(parameter => {
      config[parameter.key] = parameter.value;
    });

    return config;
  }

  mapAssignedGamesSessionToLocaleMessages(session) {
    const gamesSession = session.gamesSession;

    const names = this.mapMessages(`session.${gamesSession.id}.name`, gamesSession.name.values);
    const descriptions = this.mapMessages(`session.${gamesSession.id}.description`, gamesSession.description.values);

    return this.mergeMessages(names, descriptions);
  }

  mapMessages(type, messages) {
    return messages.map(message => ({
      [message.key]: {
        [type]: message.value
      }
    }))
    .reduce((prev, next) => Object.assign(prev, next), {});
  }

  mergeMessages(message1, message2) {
    const props = new Set();
    Object.keys(message1).forEach(key => props.add(key));
    Object.keys(message2).forEach(key => props.add(key));

    const merged = {};
    for (let key of props) {
      merged[key] = {};

      if (message1.hasOwnProperty(key)) {
        Object.assign(merged[key], message1[key]);
      }

      if (message2.hasOwnProperty(key)) {
        Object.assign(merged[key], message2[key]);
      }
    }

    return merged;
  }
}
