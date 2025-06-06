import i18next from './i18next.js';
import { watchedState } from './state.js';

const urlInput = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const renderErrors = () => {
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('text-success', 'text-danger');
    feedback.innerHTML = i18next.t(watchedState.errorKey);
  } else {
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.innerHTML = ''; // Убираем сообщение при валидном URL
  }
};

const renderGetDataError = () => {
  if (watchedState.dataFetchStatus === 'failed') {
    urlInput.classList.add('text-danger');
    urlInput.classList.remove('text-success');
    feedback.innerHTML = i18next.t('downloadError'); // } else {
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.innerHTML = ''; // Убираем сообщение
  }
};

const renderRSS = () => {
  if (watchedState.parsingStatus === 'failed') {
    urlInput.classList.add('text-success', 'text-danger');
    feedback.innerHTML = i18next.t('errorParsing');
  } else {
    urlInput.classList.remove('text-danger');
    feedback.innerHTML = i18next.t('downloadOk');
    const posts = document.querySelector('.posts');
    const feeds = document.querySelector('.feeds');
    const wrapPosts = document.createElement('div');
    const wrapFeeds = document.createElement('div');
    document.body.appendChild(wrapPosts);
    document.body.appendChild(wrapFeeds);
    posts.appendChild(wrapPosts);
    feeds.appendChild(wrapFeeds);
    wrapPosts.classList.add('card border-0');
    wrapFeeds.classList.add('card border-0');
  }
};

export { renderErrors, renderGetDataError, renderRSS };
