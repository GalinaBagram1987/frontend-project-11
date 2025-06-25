// prettier-ignore
import {
  validateUrl,
  getData,
  // parserData,
  updateStateWithParserData,
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

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const inputValue = event.target.value;
    const inputValue = input.value.trim();
    validateUrl(inputValue)
      .then(() => getData(inputValue))
      .then((data) => {
        // const parsedData = parserData(data);
        // console.log('Parsing status:', watchedState.parsingStatus);
        // console.log('Articles:', watchedState.UI.article);
        // return parsedData;
        // console.log(parsedData);
        // })
        // .then(() => {
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
};

export default rssLogic;
