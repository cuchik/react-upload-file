import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { history } from 'helpers';
import Routes from './Routes';
import theme from './theme';
import './assets/scss/index.scss';
import './App.scss';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ToastContainer autoClose={3000} hideProgressBar />
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
