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
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500, green500, cyan700, grey400, pinkA200, grey100, grey500, darkBlack, white, grey300, fullBlack } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    //secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
    //alternateTextColor: _colors.white,
    canvasColor: white,
    borderColor: grey300,
    //disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    //clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
    shadowColor: fullBlack
  }
});

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout/>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
};
