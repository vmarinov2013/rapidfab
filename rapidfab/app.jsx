import 'babel-polyfill';
import 'font-awesome-webpack';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import Config from 'rapidfab/config';
import Raven from 'raven-js';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'rapidfab/styles/main.less';
import 'rapidfab/styles/flags.less';
import initializeStore from 'rapidfab/reducers/initializeStore';
import AppContainer from 'rapidfab/containers/app';
import '../node_modules/fullcalendar/dist/fullcalendar.css';
import '../node_modules/fullcalendar-scheduler/dist/scheduler.css';

if (Config.SENTRY_DSN) {
  Raven.config(Config.SENTRY_DSN, {
    fetchContext: true,
    release: process.env.COMMIT_HASH,
  }).install();
  /* eslint-disable no-console */
  console.log(
    `Raven integration installed. Release: ${process.env.COMMIT_HASH}`
  );
  /* eslint-disable no-console */
}

const App = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

ReactDOM.render(
  <App store={initializeStore()} />,
  document.getElementById('app')
);

export default App;
