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
import React from 'react';
import Header from './Header.jsx';
import Paper from 'material-ui/Paper';
import SessionCard from './SessionCard.jsx';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

const style = {
  column: {
    paddingRight: 0,
    paddingLeft: 0
  },
  paper: function(index) {
    return {
      margin: 10,
      minWidth: 100,
      borderRadius: '10px',
      animationDuration: '1s',
      animationDelay: (0.25 * index) + 's'
    }
  }
};

class BaseLayout extends React.Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col style={style.column}>
              <Header/>
            </Col>
          </Row>

          {this.props.sessions.map((session, index) => (
            <Row key={index}>
              <Col style={style.column} md={8} lg={6} mdOffset={2} lgOffset={3}>
                <Paper style={style.paper(index)} zDepth={2} className="animated fadeIn">
                  <SessionCard session={session}/>
                </Paper>
              </Col>
            </Row>
          ))}

        </Grid>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    sessions: state.sessions,
    showMenu: state.showMenu
  };
};

const Layout = connect(
  mapStateToProps
)(BaseLayout);

export default Layout;