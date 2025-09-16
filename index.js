// import './src/scss/styles.scss';
// import 'bootstrap';

if (process.env.NODE_ENV !== 'test') {
  import('./src/scss/style.scss');
  import('bootstrap');
}

import rssLogic from './src/js/rss-model.js';

rssLogic();
