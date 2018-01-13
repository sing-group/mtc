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
import FontIcon from 'material-ui/FontIcon';

import GamePanel from '../games/GamePanel';

import Locales from '../../i18n/Locales';
import Messages from '../../i18n/Messages';

import AssignedGamesSession from '@sing-group/mtc-games/src/games_session/AssignedGamesSession';
import GameResult from '@sing-group/mtc-games/src/games_session/GameResult';

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
  sessionStatus: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    verticalAlign: 'middle'
  },
  sessionStatusIcon: {
    verticalAlign: 'middle'
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
      }),
      muiTheme: PropTypes.shape({
        palette: PropTypes.object.isRequired
      }),
      onGameStarted: PropTypes.func,
      onGameFinished: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      onGameStarted: () => {},
      onGameFinished: () => {}
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

  handleOpenDialog() {
    this.setState(Object.assign({}, this.state, {
      showDialog: true
    }));
  }

  handleCloseDialog() {
    this.setState(Object.assign({}, this.state, {
      showDialog: false
    }));
  }

  handleGameStarted(gameConfig) {
    this.setState(Object.assign({}, this.state, {
      activeGame: gameConfig,
      gameStartTime: new Date()
    }));

    this.props.onGameStarted(this.props.session, gameConfig);
  }

  handleGameFinished(result) {
    const gameResult = new GameResult(
      this.props.session,
      this.props.session.getGameIndex(this.state.activeGame),
      this.props.session.countResultsOfGame(this.state.activeGame) + 1,
      this.state.gameStartTime,
      new Date,
      result
    );

    this.props.onGameFinished(gameResult);

    this.setState({
      showDialog: this.state.showDialog
    });
  }

  isSessionCompleted() {
    return this.props.session.isCompleted();
  }
  
  isSessionOpen() {
    return this.props.session.isOpen();
  }

  isSessionActive() {
    return this.props.session.isActive();
  }

  isGameCompleted(game) {
    return this.props.session.isGameCompleted(game);
  }

  getNextPendingGameConfigured() {
    if (this.isSessionCompleted()) {
      return null;
    } else {
      const {intl} = this.props;
      const gameConfig = this.getNextPendingGame();

      gameConfig.height = window.innerHeight * 0.6;
      gameConfig.width = window.innerWidth * 0.6;
      gameConfig.domId = SessionCard._guid();
      gameConfig.i18n = Locales.getI18NForLocale(intl.locale);
      gameConfig.locale = Locales.mapMtcToMtcGamesId(intl.locale);

      gameConfig.gameCallback = {
        gameStarted: () => this.handleGameStarted(gameConfig),
        gameFinished: result => this.handleGameFinished(result)
      };

      return gameConfig;
    }
  }

  getNextPendingGame() {
    if (this.isSessionCompleted()) {
      return null;
    } else {
      return this.props.session.nextPendingGame();
    }
  }

  getNextPendingGameIndex() {
    if (this.isSessionCompleted()) {
      return null;
    } else {
      return this.props.session.nextPendingGameIndex();
    }
  }

  getNextPendingGameNameMessage() {
    if (this.isSessionCompleted()) {
      return Messages.gameTitle();
    } else {
      return Messages.gameName(this.getNextPendingGame().metadata.nameId);
    }
  }

  isSessionStarted() {
    return this.props.session.countCompletedGames() !== 0;
  }

  render() {
    const {session, intl, muiTheme} = this.props;

    const games = session.metadata.gameConfigs;

    let index = 0;
    const steps = games.map(game => {
      return <Step key={game.metadata.nameId + index++} completed={this.isGameCompleted(game)}>
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

    const playMessage = this.isSessionStarted() ? 'session.continue' : 'session.start';

    const notOpenStyle = Object.assign({}, style.sessionStatus, {color: muiTheme.palette.primary3Color});
    const completeStyle = Object.assign({}, style.sessionStatus, {color: muiTheme.palette.primary1Color});
    const notCompletedStyle = Object.assign({}, style.sessionStatus, {color: muiTheme.palette.accent1Color});

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
            <Stepper activeStep={this.getNextPendingGameIndex()} orientation="vertical" linear={!this.isSessionCompleted()}>
              {steps}
            </Stepper>
          </div>
        </CardText>

        <LinearProgress mode="determinate"
                        value={session.countCompletedGames()}
                        max={session.countGames()}/>

        {this.isSessionActive() && !this.isSessionOpen() &&
        <CardActions style={notOpenStyle}>
          <FontIcon className="material-icons" color={muiTheme.palette.primary3Color} style={style.sessionStatusIcon}>alarm</FontIcon>
          &nbsp;
          <FormattedMessage id="session.notOpen"/>
        </CardActions>
        }

        {this.isSessionOpen() && !this.isSessionCompleted() &&
        <CardActions style={style.actions}>
          <FlatButton label={<FormattedMessage id={playMessage}/>} onClick={this.handleOpenDialog.bind(this)}/>
        </CardActions>
        }

        {!this.isSessionActive() && !this.isSessionCompleted() &&
        <CardActions style={notCompletedStyle}>
          <FontIcon className="material-icons" color={muiTheme.palette.accent1Color} style={style.sessionStatusIcon}>report</FontIcon>
          &nbsp;
          <FormattedMessage id="session.notCompleted"/>
        </CardActions>
        }

        {this.isSessionCompleted() &&
        <CardText style={completeStyle}>
          <FontIcon className="material-icons" color={muiTheme.palette.primary1Color} style={style.sessionStatusIcon}>check_circle</FontIcon>
          &nbsp;
          <FormattedMessage id="session.completed"/>
        </CardText>
        }
      </Card>

      {!this.isSessionCompleted() &&
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
