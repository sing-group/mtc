/*
 MultiTasking Cubes
 Copyright (C) 2017 - Miguel Reboiro Jato

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
export default class Reducer {
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

      reduce(state, action) {
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