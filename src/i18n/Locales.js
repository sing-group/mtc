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

import es_ES_Games from '@sing-group/mtc-games/src/i18n/es_ES';
import gl_ES_Games from '@sing-group/mtc-games/src/i18n/gl_ES';
import en_US_Games from '@sing-group/mtc-games/src/i18n/en_US';
import I18NStatic from '@sing-group/mtc-games/src/i18n/I18NStatic';

import check from 'check-types';

const LOCALES = Symbol();

export default class Locales {
  static get LOCALES() {
    if (!Locales[LOCALES]) {
      Locales[LOCALES] = {
        es: Object.assign({}, es_ES, es_ES_Games),
        gl: Object.assign({}, gl_ES, gl_ES_Games),
        en: Object.assign({}, en_US, en_US_Games)
      };
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
    check.assert.assigned(Locales.LOCALES[id], 'id should be a valid Locale id');

    return Locales.LOCALES[id];
  }

  static getByIndex(index) {
    check.assert.inRange(index, 0, Locales.LOCALE_IDS.length, 'index should be a valid index value');

    return Locales.LOCALES[Locales.LOCALE_IDS[index]];
  }

  static addLocales(messages) {
    check.assert.object(messages, 'messages should be an object');

    Object.keys(messages).forEach(key => {
      const parsedKey = Locales.mapMtcGamesToMtcId(key);
      Locales[LOCALES][parsedKey] = Object.assign(Locales[LOCALES][parsedKey], messages[key]);
    });
  }

  static getI18NForLocale(locale) {
    return new I18NStatic(Locales.mapMtcToMtcGamesId(locale));
  }

  static mapMtcGamesToMtcId(id) {
    return id.substring(0, id.indexOf('_'));
  }

  static mapMtcToMtcGamesId(id) {
    switch(id) {
      case 'es':
      case 'gl':
        return id + '_ES';
      case 'en':
        return id + '_US';
      default:
        throw new Error('Unknown locale id: ' + id);
    }
  }
}
