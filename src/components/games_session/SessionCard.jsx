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
import React, {Component} from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';
import PropTypes from 'prop-types';

import {Card, CardActions, CardText, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import GamePanel from '../games/GamePanel';

import Locales from '../../i18n/Locales';
import Messages from '../../i18n/Messages';
import AssignedGamesSession from '../../../../mtc-games/src/games_session/AssignedGamesSession';

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
  },
  dialog: {
    maxWidth: 'none',
    maxHeight: 'none'
  }
};

export default class SessionCard extends Component {
  static get propTypes() {
    return {
      session: PropTypes.instanceOf(AssignedGamesSession).isRequired,
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired
      })
    };
  }

  static _guid() {
    // Implementation taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    };
  }

  componentDidMount() {
    if (!this.isGameCompleted()) {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState(Object.assign({}, this.state, {
      width: window.innerWidth,
      height: window.innerHeight
    }));
  }

  handleOpenDialog() {
    this.setState({
      showDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      showDialog: false
    });
  }

  isGameCompleted() {
    return this.props.session.isCompleted();
  }

  getNextPendingGameConfigured() {
    if (this.isGameCompleted()) {
      return null;
    } else {
      const {intl} = this.props;
      const gameConfig = this.getNextPendingGame();

      gameConfig.height = this.state.height * 0.6;
      gameConfig.width = this.state.width * 0.6;
      gameConfig.domId = SessionCard._guid();
      gameConfig.i18n = Locales.getI18NForLocale(intl.locale);
      gameConfig.locale = Locales.mapMtcToMtcGamesId(intl.locale);

      return gameConfig;
    }
  }

  getNextPendingGame() {
    if (this.isGameCompleted()) {
      return null;
    } else {
      return this.props.session.nextPendingGame();
    }
  }

  getNextPendingGameNameMessage() {
    if (this.isGameCompleted()) {
      return Messages.gameTitle();
    } else {
      return Messages.gameName(this.getNextPendingGame().metadata.nameId);
    }
  }

  render() {
    const {session, intl} = this.props;

    const games = session.metadata.gameConfigs;

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

    const dialogActions = [
      <FlatButton key={index++} label={<FormattedMessage id="game.exit"/>} primary={true} onClick={this.handleCloseDialog.bind(this)}/>
    ];

    return <div>
      <Card style={style.card} containerStyle={style.card}>
        <CardTitle
          title={<FormattedMessage id={session.metadata.nameId} />}
          subtitle={<span>
            <FormattedDate value={session.startDate}/> - <FormattedDate value={session.endDate}/>
          </span>}
          style={style.title}
        />
        
        <CardText>
          <FormattedMessage id={session.metadata.descriptionId} />
          <div>
            <Stepper activeStep={0} orientation="vertical">
              {steps}
            </Stepper>
          </div>
        </CardText>
        
        {!this.isGameCompleted() &&
        <LinearProgress mode="determinate"
                        value={session.countCompletedGames()}
                        max={session.countGames()}/>
        }
        
        {!this.isGameCompleted() &&
        <CardActions style={style.actions}>
          <FlatButton label={<FormattedMessage id="game.start"/>} onClick={this.handleOpenDialog.bind(this)}/>
        </CardActions>
        }
      </Card>

      {!this.isGameCompleted() &&
      <Dialog
        title={intl.formatMessage(this.getNextPendingGameNameMessage())}
        actions={dialogActions}
        modal={true}
        contentStyle={style.dialog}
        open={this.state.showDialog}
      >
        {this.state.showDialog &&
        <GamePanel gameConfig={this.getNextPendingGameConfigured()}/>
        }
      </Dialog>
      }
    </div>;
  }
}
