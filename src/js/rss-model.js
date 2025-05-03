import validateUrl from './rss-controller.js';
import renderErrors from './rss-view.js';
import { watchedState } from './state.js';

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  console.log(form);
  const input = document.querySelector('#url-input'); // Находим инпут по ID
  console.log(input);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const inputValue = event.target.value;
    const inputValue = input.value;
    validateUrl(watchedState, inputValue)
      .then(() => {
        // Обновляем интерфейс после валидации
        renderErrors();
      })
      .catch(() => {
        renderErrors();
      });
  });
};

export default rssLogic;
