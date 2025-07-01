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

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  const updateData = () => {
    updateRssData(state)
      .then(() => {
        renderListRSS(state);
        setTimeout(updateData, 5000);
      })
      .catch((error) => {
        console.error('Ошибка обновления данных:', error);
        setTimeout(updateData, 5000);
      });
    // setTimeout(updateData, 5000); // повторный вызов через 5 секунд
  };

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
      })
      // .then(() => {
      //   const updateData = () => {
      //     updateRssData(state)
      //       .then(() => {
      //         renderListRSS(state);
      //       })
      //       .catch((error) => {
      //         console.error('Ошибка обновления данных:', error);
      //       });
      //   };
      //   setTimeout(updateData, 5000);
      //   updateData(); // начиная обновление данных
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
    // updateData();
  });
  // .then(() => {
  //   updateData();
  // });
  updateData();
};

export default rssLogic;
