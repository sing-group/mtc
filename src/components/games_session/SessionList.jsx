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
import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {Card, CardText, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import SessionCard, {style as sessionCardStyle} from './SessionCard';

import AssignedGamesSession from '@sing-group/mtc-games/src/games_session/AssignedGamesSession';

export const style = {
  column: {
    paddingRight: 0,
    paddingLeft: 0
  },
  paper: {
    margin: 10,
    minWidth: 100,
    borderRadius: "10px"
  }
};

export default class SessionList extends React.Component {
  static get propTypes() {
    return {
      sessions: PropTypes.arrayOf(PropTypes.instanceOf(AssignedGamesSession)).isRequired,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      }),
      muiTheme: PropTypes.shape({
        palette: PropTypes.object.isRequired
      }),
      onGameStarted: PropTypes.func,
      onGameFinished: PropTypes.func,
      animated: PropTypes.bool,
      cardMd: PropTypes.number,
      cardLg: PropTypes.number,
      cardMdOffset: PropTypes.number,
      cardLgOffset: PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      sessions: [],
      onGameStarted: () => {},
      onGameFinished: () => {},
      cardMd: 8,
      cardLg: 6,
      cardMdOffset: 2,
      cardLgOffset: 3,
      animated: true
    };
  }

  handleGameStarted(assignedGamesSession, gameConfig) {
    this.props.onGameStarted(assignedGamesSession, gameConfig);
  }

  handleGameFinished(gameResult) {
    this.props.onGameFinished(gameResult);
  }

  _paperStyle(index) {
    if (this.props.animated) {
      return Object.assign({}, style.paper, {
        animationDuration: "1s",
        animationDelay: (0.25 * index) + "s"
      });
    } else {
      return style.paper;
    }
  }

  render() {
    const paperClass = this.props.animated ? 'animated fadeIn' : '';

    if (this.props.sessions.length === 0) {
      return (
        <Grid fluid>
          <Row>
            <Col style={style.column}
                 md={this.props.cardMd}
                 lg={this.props.cardLg}
                 mdOffset={this.props.cardMdOffset}
                 lgOffset={this.props.cardLgOffset}
            >
              <Paper style={this._paperStyle(0)} zDepth={2} className={paperClass}>
                <Card style={sessionCardStyle.card}>
                  <CardTitle title={<FormattedMessage id="sessions.title"/>} style={sessionCardStyle.title}/>
                  <CardText>
                    <FormattedMessage id="sessions.empty"/>
                  </CardText>
                </Card>
              </Paper>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Grid fluid>
          {this.props.sessions.map((session, index) => (
            <Row key={index}>
              <Col style={style.column}
                   md={this.props.cardMd}
                   lg={this.props.cardLg}
                   mdOffset={this.props.cardMdOffset}
                   lgOffset={this.props.cardLgOffset}
              >
                <Paper style={this._paperStyle(index)} zDepth={2} className={paperClass}>
                  <SessionCard session={session}
                               intl={this.props.intl}
                               onGameStarted={this.handleGameStarted.bind(this)}
                               onGameFinished={this.handleGameFinished.bind(this)}
                               muiTheme={this.props.muiTheme}
                  />
                </Paper>
              </Col>
            </Row>
          ))}
        </Grid>
      );
    }
  }
}
