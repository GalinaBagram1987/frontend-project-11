import i18next from './i18next.js';
import { watchedState } from './state.js';

// const urlInput = document.querySelector('#url-input');
// const feedback = document.querySelector('.feedback');

const renderErrors = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('text-danger');
    feedback.innerHTML = i18next.t(watchedState.errorKey);
  } else {
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.innerHTML = ''; // Убираем сообщение при валидном URL
  }
};

const renderGetDataError = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.dataFetchStatus === 'failed') {
    urlInput.classList.add('text-danger');
    urlInput.classList.remove('text-success');
    feedback.innerHTML = i18next.t('downloadError');
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.innerHTML = '';
  }
};

// let ulPosts; // Внешняя переменная для хранения списка постов
// let ulFeeds; // Внешняя переменная для хранения списка фидов

const initUI = () => {
  // const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.parsingStatus === 'failed') {
    feedback.classList.add('text-danger');
    feedback.innerHTML = i18next.t('errorParsing');
  } else if (watchedState.parsingStatus === 'success') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.innerHTML = i18next.t('downloadOk');
  }
  // posts
  const posts = document.querySelector('.posts');
  const wrapPosts = document.createElement('div');
  posts.appendChild(wrapPosts);
  wrapPosts.classList.add('card', 'border-0');
  const cardBodyPosts = document.createElement('div');
  cardBodyPosts.classList.add('card-body');
  wrapPosts.appendChild(cardBodyPosts);
  const titlePosts = document.createElement('h2');
  titlePosts.classList.add('card-title', 'h4');
  titlePosts.textContent = 'Посты';
  cardBodyPosts.appendChild(titlePosts);
  const ulPosts = document.createElement('ul');
  // ulPosts = document.createElement('ul');
  ulPosts.classList.add('list-group', 'border-0', 'rounded-0');
  wrapPosts.appendChild(ulPosts);

  // feeds
  const feeds = document.querySelector('.feeds');
  const wrapFeeds = document.createElement('div');
  feeds.appendChild(wrapFeeds);
  wrapFeeds.classList.add('card', 'border-0');
  const cardBodyFeeds = document.createElement('div');
  cardBodyFeeds.classList.add('card-body');
  wrapFeeds.appendChild(cardBodyFeeds);
  const titleFeeds = document.createElement('h2');
  titleFeeds.classList.add('card-title', 'h4');
  titleFeeds.textContent = 'Фиды';
  cardBodyFeeds.appendChild(titleFeeds);
  const ulFeeds = document.createElement('ul');
  // ulFeeds = document.createElement('ul');
  ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');
  wrapFeeds.appendChild(ulFeeds);
  // return { ulPosts, ulFeeds };
};

const renderListRSS = (ulPosts) => {
  // const ulElement = document.querySelector('.posts .card-body ul');
  if (ulPosts) {
    const articles = watchedState.UI.article;
    articles.forEach((article) => {
      const li = document.createElement('li');
      ulPosts.appendChild(li);
      // prettier-ignore
      li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      );
      li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>: ${article.description}`;
    });
  } else {
    console.error('Не удалось найти элемент ul для добавления статей.');
  }
};
// prettier-ignore
export {
  renderErrors,
  renderGetDataError,
  initUI,
  renderListRSS,
};
