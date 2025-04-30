import { validateUrl } from './rss-controller.js';
import { renderErrors } from './rss-view.js';

export const state = {
  inputData: '',
  validationStatus: 'invalid', // Статус валидации входных данных: 'cheking', 'valid', 'invalid'
  dataFetchStatus: 'filling', // Статус получения данных: 'filling'(заполнение), 'processing', 'failed', 'success'
  article: [], // статьи
  feeds: [], // поля
  connectionStatus: 'idle', // Статус подключения: 'idle'(проц запущен), 'connected', 'disconnected', 'error'
  // rssExistsStatus: 'not_checked', // Статус проверки существования RSS: 'exists', 'not_exists', 'error'
};

export const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  const input = document.querySelector('#url-input'); // Находим инпут по ID

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value;
    validateUrl(state, inputValue);
    if (state.validationStatus === 'invalid') {
      renderErrors();
    } // else if (state.validationStatus === 'valid') {
    // запускаем функцию получения данных
    // запускаем рендер списка
    //}
  });
};
