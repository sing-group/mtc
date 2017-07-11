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
import React from "react";
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import SessionCard from './SessionCard.jsx';
import Paper from 'material-ui/Paper';


const style = {
  column: {
    paddingRight: 0,
    paddingLeft: 0
  },
  paper: {
    margin: 10,
    minWidth: 100,
    borderRadius: '10px'
  }
};

export default class SessionList extends React.Component {
  static defaultProps = {
    cardMd: 8,
    cardLg: 6,
    cardMdOffset: 2,
    cardLgOffset: 3,
    animated: true,
    sessions: []
  }

  _paperStyle(index) {
    if (this.props.animated) {
      return {
        ...style.paper,
        animationDuration: '1s',
        animationDelay: (0.25 * index) + 's'
      };
    } else {
      return style.paper;
    }
  }

  render() {
    const paperClass = this.props.animated ? 'animated fadeIn' : '';

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
                <SessionCard session={session}/>
              </Paper>
            </Col>
          </Row>
        ))}
      </Grid>
    );
  }
}
