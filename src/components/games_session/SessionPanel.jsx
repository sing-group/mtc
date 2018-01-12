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
import SessionList from "./SessionList.jsx";
import AssignedGamesSession from '../../../../mtc-games/src/games_session/AssignedGamesSession';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  container: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 40,
    verticalAlign: 'middle'
  }
};

export default class SessionPanel extends Component {
  static get propTypes() {
    return {
      sessionsRequested: PropTypes.bool,
      sessions: PropTypes.arrayOf(PropTypes.instanceOf(AssignedGamesSession)).isRequired,
      onComponentWillMount: PropTypes.func,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      }),
      animated: PropTypes.bool,
      cardMd: PropTypes.number,
      cardLg: PropTypes.number,
      cardMdOffset: PropTypes.number,
      cardLgOffset: PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      sessionsRequested: false,
      sessions: [],
      onComponentWillMount: () => {},
      cardMd: 8,
      cardLg: 6,
      cardMdOffset: 2,
      cardLgOffset: 3,
      animated: true
    };
  }

  componentWillMount() {
    this.props.onComponentWillMount();
  }

  render() {
    const {sessionsRequested} = this.props;

    if (sessionsRequested) {
      return <div style={style.container}>
        <CircularProgress thickness={8} size={40}/>&nbsp;Loading
      </div>;
    } else {
      const listProps = Object.assign({}, this.props);
      delete listProps.sessionsRequested;

      return <SessionList {...listProps}/>;
    }
  }
}
