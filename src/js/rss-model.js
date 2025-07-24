// prettier-ignore
import {
  validateUrl,
  getData,
  // parserData,
  updateStateWithParserData,
  updateRssData,
} from './rss-controller.js';
// prettier-ignore
import {
  renderErrors,
  renderGetDataError,
  initUI,
  renderListRSS,
  renderParsingError,
  renderFeedRSS,
} from './rss-view.js';
import { state, watchedState } from './state.js';

// const updateAndRender = () => {
//   updateRssData()
//     .then(() => {
//       console.log(`stateUIarticles: ${JSON.stringify(watchedState.UI.articles)}`);
//       renderListRSS(watchedState);
//     })
//     .catch((error) => {
//       console.error('error update:', error);
//     });
// };

const rssLogic = async () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = input.value.trim();
    validateUrl(inputValue)
      .then(() => getData(inputValue))
      .then((data) => {
        updateStateWithParserData(data);
      })
      .then(() => {
        initUI(state);
        // console.log('Articles:', watchedState.UI.articles);
        console.log('feeds:', state.UI.feeds);
      })
      .then(() => {
        renderListRSS(state);
        renderFeedRSS(state);
      })
      .catch((error) => {
        if (
          // prettier-ignore
          (Array.isArray(watchedState.getDataError)
          && watchedState.getDataError.includes(error))
          || watchedState.dataFetchStatus === 'failed'
        ) {
          renderGetDataError(); // ошибка получения данных
        } else if (watchedState.validationStatus === 'invalid') {
          renderErrors(watchedState); // ошибка валидации
        } else if (watchedState.parsingStatus === 'failed') {
          renderParsingError(watchedState);
        }
      });
  });
  updateRssData();
  // if (state.enteredData.length > 0) {
  // updateAndRender(watchedState);
  // }
  // updateRssData(state)
  //   .then(() => {
  //     console.log(`stateUIarticles: ${JSON.stringify(watchedState.UI.articles)}`);
  //     renderListRSS(state);
  //   })
  //   .catch((error) => {
  //     console.error('error update:', error);
  //   });
};

export default rssLogic;
