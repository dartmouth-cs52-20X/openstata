/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import { ActionTypes } from './actions';
import reducers from './reducers';
import App from './app';
import MainTheme from './themes';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <App />
        <ModalContainer />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('main')
);
