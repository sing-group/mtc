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
import React, {Component} from 'react';
import PropTypes from "prop-types";

import GameConfig from '../../../../mtc-games/src/game/GameConfig';
import GameBuilder from '../../../../mtc-games/src/game/GameBuilder';

export default class GamePanel extends Component {
  static get propTypes() {
    return {
      gameConfig: PropTypes.instanceOf(GameConfig).isRequired
    };
  }

  componentDidMount() {
    const {gameConfig} = this.props;

    const builder = new GameBuilder();
    builder.buildGame(gameConfig);
  }

  render() {
    const {gameConfig} = this.props;

    const style = {
      margin: 'auto',
      height: gameConfig.height,
      width: gameConfig.width
    };

    return <div id={gameConfig.domId} style={style}/>;
  }
}
