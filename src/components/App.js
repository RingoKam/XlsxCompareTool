//fix onTapEvent missing
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import '../assets/css/App.css';
import React, { Component } from 'react';

import {green600} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FileCompareSteps from '../containers/FileCompareSteps'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: green600
  },
});

class App extends React.Component {

  render() {
    const contentStyle = { margin: '0 16px' };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <FileCompareSteps />
      </MuiThemeProvider>
    );
  }
}

export default App;
