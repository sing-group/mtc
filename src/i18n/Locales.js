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

import es_ES from './es_ES';
import gl_ES from './gl_ES';
import en_US from './en_US';

const LOCALES = Symbol();

export default class Locales {
  static get LOCALES() {
    if (!Locales[LOCALES]) {
      Locales[LOCALES] = {
        es: Object.assign({}, es_ES),
        gl: Object.assign({}, gl_ES),
        en: Object.assign({}, en_US)
      };

      Object.freeze(Locales[LOCALES]);
    }

    return Locales[LOCALES];
  }


  static get LOCALE_IDS() {
    return [ 'es', 'gl', 'en' ];
  }

  static get DEFAULT_LOCALE_ID() {
    return 'es';
  }

  static get DEFAULT_LOCALE() {
    return Locales.getById(Locales.DEFAULT_LOCALE_ID);
  }

  static getById(id) {
    return Locales.LOCALES[id];
  }

  static getByIndex(index) {
    return Locales.LOCALES[Locales.LOCALE_IDS[index]];
  }
}
