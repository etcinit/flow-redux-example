/* @flow */

import type { Store, StoreEnhancer } from 'redux';
import type { AppState } from './reducers';
import type { AppAction } from './actions';

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Paper, Divider } from 'material-ui';
import { MuiThemeProvider, getMuiTheme, colors } from 'material-ui/styles';
import { Grid, Row, Column } from 'react-cellblock';

import reducer from './reducers';
import Creator from './components/Creator';
import ToDoList from './components/ToDoList';
import './App.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

const store: Store<AppState, AppAction> = createStore(reducer, getEnhancer());

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, Open Sans, sans-serif',
  palette: {
    accent1Color: colors.deepOrange500,
  },
});

export function getEnhancer(): StoreEnhancer<AppState, AppAction> {
  return window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <MuiThemeProvider muiTheme={ muiTheme }>
          <Grid>
            <div className="App-container">
              <Paper style={{ padding: 10 }}>
                <Creator/>
                <Row>
                  <Column>
                    <Divider/>
                  </Column>
                </Row>
                <ToDoList/>
              </Paper>
            </div>
          </Grid>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
