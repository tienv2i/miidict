import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { Provider } from 'react-redux';
import {JssProvider, SheetsRegistry} from 'react-jss'
import serialize from 'serialize-javascript';
import configureStore from '../store';
import stats from '../../build/react-loadable.json';
import App from '../App';
import api from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server
  .disable('x-powered-by')
  .use('/api', api)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const modules = [];
    const sheets = new SheetsRegistry();
    const preloadedState = {
      dict: {
        currentWord: '',
        hints: {
          isLoading: false,
          words: []
        },
        test: {
          tt: 'Tor'
        }
      }
    };
    const store = configureStore(preloadedState);
    const markup = renderToString(
      <Capture report={module => modules.push(module)}>
        <JssProvider registry={sheets} >
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </Provider>
        </JssProvider>
      </Capture>
    );
    const bundles = getBundles(stats, modules);
    const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
    const finalState = store.getState();
    const jssString = sheets.toString();

    if (context.url) {
      res.redirect(context.url);
    } else {
      const outputHtml = (`
        <!doctype html>
        <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>Anatomy Dictionary</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">`: ''}
              ${jssString ? `<style type="text/css">${jssString}</style>`: ''}
          </head>
          <body>
              <div id="root">${markup}</div>
              <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
              ${process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}"></script>`
                : `<script src="${assets.client.js}" crossorigin></script>`}
              ${chunks.map(chunk => (process.env.NODE_ENV === 'production'
                ? `<script src="/${chunk.file}"></script>`
                : `<script src="http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/${chunk.file}"></script>`
              )).join('\n')}
              <script>window.main();</script>
          </body>
        </html>
      `);
      res.status(200).send(outputHtml);
    }
  });

export default server;
