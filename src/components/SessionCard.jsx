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
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';
import Session from "../domain/Session.class";

const style = {
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

class SessionCard extends Component {
  static get propTypes() {
    return {
      session: PropTypes.instanceOf(Session).isRequired,
      intl: PropTypes.func.isRequired
    };
  }

  render() {
    const {intl} = this.props;

    const messages = defineMessages({
      name: {
        id: this.props.session.metadata.nameId,
        defaultMessage: "Session"
      },
      description: {
        id: this.props.session.metadata.descriptionId,
        defaultMessage: "No description"
      }
    });

    return (
      <Card style={style.card} containerStyle={style.card}>
        <CardTitle title={intl.formatMessage(messages.name)} style={style.title}/>
        <CardText>{intl.formatMessage(messages.description)}</CardText>
        <LinearProgress mode="determinate" value={1} max={3}/>
        <CardActions style={style.actions}>
          <FlatButton label={<FormattedMessage id="start"/>}/>
        </CardActions>
      </Card>
    );
  }
};

export default injectIntl(SessionCard);
