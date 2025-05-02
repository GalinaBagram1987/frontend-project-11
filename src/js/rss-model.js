import validateUrl from './rss-controller.js';
import renderErrors from './rss-view.js';
import { watchedState } from './state.js';

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  console.log(form);
  const input = document.querySelector('#url-input'); // Находим инпут по ID
  console.log(input);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    validateUrl(watchedState, inputValue).then(() => {
      renderErrors(); // Обновляем интерфейс после валидации
    });
    // else if (state.validationStatus === 'valid') {
    // запускаем функцию получения данных
    // запускаем рендер списка
    // }
  });
};

export default rssLogic;
