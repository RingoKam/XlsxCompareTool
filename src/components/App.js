import '../assets/css/App.css';
import React, { Component } from 'react';
import { Nav } from './nav'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { SelectFiles } from './SelectFiles'

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/SelectFiles" component={SelectFiles} />
          <Redirect to="/SelectFiles" />
        </Switch>
      </div>
    );
  }
}

export default App;
