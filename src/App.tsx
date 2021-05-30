import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '@fontsource/roboto';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.global.css';

import Timer from './components/Timer';

export default function App() {
  // Dark theme by Material-UI
  // ref: https://material-ui.com/customization/palette/#dark-mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/" component={Timer} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
