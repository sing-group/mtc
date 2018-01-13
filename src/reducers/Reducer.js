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
import check from 'check-types';

export default class Reducer {
  static propertyPartialModification(state, property, values) {
    check.assert.object(state, 'state should be an object');
    check.assert.nonEmptyString(property, 'property should be a non empty string');
    check.assert.assigned(state[property], 'property should be a valid property of state');
    check.assert.object(values, 'values should be an object');

    return Object.assign({}, state, {
      [property]: Object.assign({}, state[property], values)
    });
  }

  static chain(...reducers) {
    const chain = reducers.reverse().reduce((reducerA, reducerB) => {
      reducerB.reducer = reducerA;

      return reducerB;
    });

    return (state, action) => chain.reduce(state, action);
  }

  static of(reducer) {
    return class extends reducer {
      constructor() {
        super();
        this.reducer = { reduce: (state) => state };
      }

      reduce(state = {}, action) {
        if (action && action.type) {
          const method = action.type.toLowerCase()
            .replace(/_[a-z]/g, letter => letter.charAt(1).toUpperCase());

          if (this[method]) {
            state = this[method](state, action);
          }

          return this.reducer.reduce(state, action);
        } else {
          return state;
        }
      }
    }
  }
}
