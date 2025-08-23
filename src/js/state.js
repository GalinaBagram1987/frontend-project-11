import onChange from 'on-change';
import { isEqual } from 'lodash';
import { renderListRSS } from './rss-view.js';

const state = {
  inputData: '',
  validationStatus: 'invalid', // Статус валидации входных данных: 'cheking', 'valid', 'invalid'
  dataFetchStatus: 'filling', // Статус получения данных: 'filling'(заполнение), 'processing', 'failed', 'success'
  errorKey: '', // ключ ошибки для перевода,
  enteredData: [],
  connectionStatus: 'idle', // Статус подключения: 'idle'(проц запущен), 'connected', 'disconnected', 'error'
  // rssExistsStatus: 'not_checked', // Статус проверки сущ-я RSS: 'exists', 'not_exists', 'error'
  getDataError: [],
  // getData: '',
  updateFetchStatus: 'filling', // Статус получения данных: 'filling'(заполнение), 'processing', 'failed', 'success'
  updateStatus: 'filling', // Статус: 'filling'(заполнение), 'processing', 'failed', 'success'
  parsingStatus: 'filling', // Статус: 'filling'(заполнение), 'processing', 'failed', 'success'
  parsingError: {},
  UI: {
    articles: [], // статьи
    feeds: [], // поля
  },
};

// Флаг для пропуска начальной инициализации

const watchedState = onChange(state, (path, value, previousValue) => {
  console.log(`Путь "${path}" изменился с ${previousValue} на ${value}`);
  console.log(watchedState);
  if (path === 'UI.articles' && previousValue !== undefined) {
    const validArticles = Array.isArray(value) ? value.filter((article) => article && article.title && article.url) : [];
    const hasChanged = !isEqual(value, previousValue);
    // const hasArticles = Array.isArray(value) && value.length > 0;
    const hasArticles = validArticles.length > 0;

    if (hasChanged && hasArticles) {
      console.log('Рендерим статьи:', value.length);
      renderListRSS({ UI: { articles: value } });
    } else {
      console.log('Статьи не изменились, пропускаем рендер');
    }
  }
});

export { state, watchedState };
