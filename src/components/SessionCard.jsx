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
import React from "react";
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card";
import {green300, white} from "material-ui/styles/colors";
import FlatButton from "material-ui/FlatButton";
import LinearProgress from "material-ui/LinearProgress";
import { FormattedMessage } from 'react-intl';

const style = {
  actions: {
    textAlign: 'center'
  },
  card: {
    borderRadius: '10px'
  },
  title: {
    fontWeight: 'bold',
    backgroundColor: green300,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  }
};

export default class SessionCard extends React.Component {
  render() {
    return (
      <Card style={style.card} containerStyle={style.card}>
        <CardTitle title={this.props.session.metadata.nameId} style={style.title} titleColor={white}/>
        <CardText>{this.props.session.metadata.descriptionId}</CardText>
        <LinearProgress mode="determinate" value={1} max={3}/>
        <CardActions style={style.actions}>
          <FlatButton label={<FormattedMessage id="start"/>}/>
        </CardActions>
      </Card>
    );
  }
};
