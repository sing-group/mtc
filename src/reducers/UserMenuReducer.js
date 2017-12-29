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
import Reducer from './Reducer.js';

class UserMenuReductions {
  openUserMenu(state, action) {
    return Object.assign({}, state,
      {
        showUserMenu: true,
        userMenuTarget: action.target
      }
    );
  }

  closeUserMenu(state) {
    const newState = Object.assign({}, state,
      { showUserMenu: false }
    );
    delete newState.userMenuTarget;

    return newState;
  }
}

const UserMenuReducer = Reducer.of(UserMenuReductions);

export default UserMenuReducer;
