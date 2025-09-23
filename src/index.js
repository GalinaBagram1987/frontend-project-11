import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import rssLogic from './src/js/rss-model.js';
import rssLogic from './js/rss-model.js';

document.addEventListener('DOMContentLoaded', () => {
  rssLogic();
});

// /* eslint-disable no-undef */
// if (module.hot) {
//   module.hot.accept();
//}
// /* eslint-enable no-undef */
