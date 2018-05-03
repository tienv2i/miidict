import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import configureStore from "../store";
import App from '../App';

const store = configureStore(window.__PRELOADED_STATE__);

window.main = () => {
  Loadable.preloadAll().then(() => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  })
};

if (module.hot) {
  module.hot.accept();
}
