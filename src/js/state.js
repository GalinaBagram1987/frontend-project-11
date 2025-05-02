import onChange from 'on-change';

const state = {
  inputData: '',
  validationStatus: 'invalid', // Статус валидации входных данных: 'cheking', 'valid', 'invalid'
  dataFetchStatus: 'filling', // Статус получения данных: 'filling'(заполнение), 'processing', 'failed', 'success'
  article: [], // статьи
  feeds: [], // поля
  connectionStatus: 'idle', // Статус подключения: 'idle'(проц запущен), 'connected', 'disconnected', 'error'
  // rssExistsStatus: 'not_checked', // Статус проверки сущ-я RSS: 'exists', 'not_exists', 'error'
};

const watchedState = onChange(state);
console.log(watchedState);
export { state, watchedState };
