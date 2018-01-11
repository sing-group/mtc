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
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import LinearProgress from "material-ui/LinearProgress";
import {FormattedMessage, FormattedDate} from 'react-intl';
import AssignedGamesSession from '../domain/AssignedGamesSession';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

export const style = {
  actions: {
    textAlign: 'center'
  },
  card: {
    borderRadius: '10px'
  },
  title: {
    fontWeight: 'bold',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  }
};

export default class SessionCard extends Component {
  static get propTypes() {
    return {
      session: PropTypes.instanceOf(AssignedGamesSession).isRequired
    };
  }

  render() {
    const {session} = this.props;

    const games = session.sessionMetadata.gameConfigs;

    let index = 0;
    const steps = games.map(game => {
      return <Step key={game.metadata.nameId + index++}>
        <StepLabel>
          <FormattedMessage id={game.metadata.nameId}/>
        </StepLabel>
        <StepContent>
          <FormattedMessage id={game.metadata.descriptionId}/>
        </StepContent>
      </Step>;
    });

    return (
      <Card style={style.card} containerStyle={style.card}>
        <CardTitle
          title={<FormattedMessage id={session.sessionMetadata.nameId} />}
          subtitle={<span>
            <FormattedDate value={session.startDate}/> - <FormattedDate value={session.endDate}/>
          </span>}
          style={style.title}
        />
        <CardText>
          <FormattedMessage id={session.sessionMetadata.descriptionId} />
          <div>
            <Stepper activeStep={0} orientation="vertical">
              {steps}
            </Stepper>
          </div>
        </CardText>
        <LinearProgress mode="determinate" value={1} max={3}/>
        <CardActions style={style.actions}>
          <FlatButton label={<FormattedMessage id="start"/>}/>
        </CardActions>
      </Card>
    );
  }
}
