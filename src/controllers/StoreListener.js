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
import check from 'check-types';

class Listener {
  constructor(store, propertyExtractor, callback) {
    check.assert.object(store, 'store should be an object');
    check.assert.function(propertyExtractor, 'propertyExtractor should be function');
    check.assert.function(callback, 'callback should be a function');

    this._store = store;
    this._propertyExtractor = propertyExtractor;
    this._callback = callback;

    this.updateValue();
  }

  getPreviousValue() {
    return this._previousValue;
  }

  getCurrentValue() {
    return this._propertyExtractor(this._store.getState());
  }

  updateValue() {
    this._previousValue = this.getCurrentValue();
  }

  hasValueChanged() {
    return this.getPreviousValue() !== this.getCurrentValue();
  }

  manageChange() {
    if (this.hasValueChanged()) {
      const previousValue = this.getPreviousValue();
      const currentValue = this.getCurrentValue();

      this.updateValue();

      this._callback(currentValue, previousValue, this._store.getState());
    }
  }
}

export default class StoreListener {
  constructor(store) {
    check.assert.object(store, 'store should be an object');

    this._store = store;
  }

  listen(propertyExtractor, callback) {
    const listener = new Listener(this._store, propertyExtractor, callback);

    this._store.subscribe(listener.manageChange.bind(listener));

    return listener;
  }
}
