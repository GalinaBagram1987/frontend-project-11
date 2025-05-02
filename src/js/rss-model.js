import { validateUrl } from './rss-controller.js';
import { renderErrors } from './rss-view.js';
import { state } from './state.js';

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();
    await validateUrl(state, inputValue);
    if (state.validationStatus === 'invalid') {
      renderErrors();
    }
    // else if (state.validationStatus === 'valid') {
    // запускаем функцию получения данных
    // запускаем рендер списка
    // }
  });
};

export default rssLogic;
