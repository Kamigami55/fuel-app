import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '@fontsource/roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.global.css';

import Timer from './components/Timer';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/" component={Timer} />
      </Switch>
    </Router>
  );
}
