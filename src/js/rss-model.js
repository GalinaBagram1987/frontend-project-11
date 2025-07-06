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

const rssLogic = async () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const inputValue = event.target.value;
    const inputValue = input.value.trim();
    validateUrl(inputValue)
      .then(() => getData(inputValue))
      .then((data) => {
        updateStateWithParserData(data);
      })
      .then(() => {
        initUI(watchedState);
        // console.log('Articles:', watchedState.UI.articles);
        console.log('feeds:', watchedState.UI.feeds);
      })
      .then(() => {
        renderListRSS(state);
        renderFeedRSS(state);
        // return updateRss(state);
      })
      // .then(() => {
      //   console.log('enteredData:', state.enteredData);
      //   renderListRSS(state);
      // })
      // .then(() => {
      //   setTimeout(() => {
      //     updateRssData(state)
      //       .then(() => {
      //         renderListRSS(state);
      //       })
      //       .catch((error) => {
      //         console.error('error update:', error);
      //       });
      //   }, 5000);
      // })
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
    // updateRss(state).then(() => renderListRSS(state));
    setTimeout(() => {
      updateRssData(state)
        .then(() => {
          renderListRSS(state);
        })
        .catch((error) => {
          console.error('error update:', error);
        });
    }, 5000);
    // updateRssData(state);
  });
};

export default rssLogic;
