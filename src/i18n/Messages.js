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

const LOGIN = Symbol();
const LOCALE = Symbol();

export default class Messages {
  static get login() {
    if (!Messages[LOGIN]) {
      Messages[LOGIN] = {
        title: {
          id: "login.title",
          defaultMessage: "MultiTasking Cubes"
        },
        username: {
          id: "login.username",
          defaultMessage: "User"
        },
        password: {
          id: "login.password",
          defaultMessage: "Password"
        },
        doLogin: {
          id: "login.doLogin",
          defaultMessage: "Login"
        },
        changeLanguage: {
          id: "login.changeLanguage",
          defaultMessage: "Change Language"
        }
      };

      Messages._deepFreeze(Messages[LOGIN]);
    }

    return Messages[LOGIN];
  }

  static get locale() {
    if (!Messages[LOCALE]) {
      Messages[LOCALE] = {
        es: {
          id: "locale.es",
          defaultMessage: "Spanish"
        },
        gl: {
          id: "locale.gl",
          defaultMessage: "Galician"
        },
        en: {
          id: "locale.en",
          defaultMessage: "English"
        }
      };

      Messages._deepFreeze(Messages[LOCALE]);
    }

    return Messages[LOCALE];
  }

  static _deepFreeze(object) {
    Object.freeze(object);

    Object.getOwnPropertyNames(object).forEach(property => {
      if (object.hasOwnProperty(property)) {
        const value = object[property];

        if (value !== null && (typeof value === "object") && !Object.isFrozen(value)) {
          Messages._deepFreeze(object[property]);
        }
      }
    });
  }
}
