import { validateUrl, getData, parserData } from './rss-controller.js';
import {
  renderErrors,
  renderGetDataError,
  initUI,
  renderListRSS,
} from './rss-view.js';
import { watchedState } from './state.js';

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
        const parsedData = parserData(data);
        console.log('Parsing status:', watchedState.parsingStatus);
        console.log('Articles:', watchedState.UI.article);
        return parsedData;
        console.log(parsedData);
      })
      .then((parsedData) => {
        initUI(parsedData, watchedState);
        renderListRSS(watchedState);
      })
      // .then((watchedState) => {
      //   renderListRSS(paths, watchedState);
      // })
      .catch((error) => {
        if (
          // prettier-ignore
          Array.isArray(watchedState.getDataError)
          && watchedState.getDataError.includes(error)
        ) {
          renderGetDataError(); // Выводим сообщение об ошибке
        } else {
          renderErrors(); // Обработка других возможных ошибок
        }
      });
  });
};

export default rssLogic;
