import i18next from './i18next.js';
// import { updateData } from './rss-controller.js';
// import { watchedState } from './state.js';
// import { watchedState } from './state.js';
// import { watchedState } from './state.js';

const urlInput = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const renderErrors = (watchedState) => {
  // const urlInput = document.querySelector('#url-input');
  // const feedback = document.querySelector('.feedback');
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('text-danger');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.innerHTML = i18next.t(watchedState.errorKey);
  } else {
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.innerHTML = ''; // Убираем сообщение при валидном URL
  }
};

const renderGetDataError = (watchedState) => {
  // const urlInput = document.querySelector('#url-input');
  // const feedback = document.querySelector('.feedback');
  if (watchedState.dataFetchStatus === 'failed') {
    urlInput.classList.add('text-danger');
    urlInput.classList.remove('text-success');
    feedback.innerHTML = i18next.t('downloadError');
  }
};

const renderParsingError = (watchedState) => {
  if (watchedState.parsingStatus === 'failed') {
    urlInput.classList.remove('text-success');
    urlInput.classList.add('text-danger');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.innerHTML = i18next.t('errorParsing');
  }
};

const initUI = (watchedState) => {
  if (watchedState.parsingStatus === 'success') {
    urlInput.classList.remove('text-danger');
    urlInput.classList.add('text-success');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = i18next.t('downloadOk');
    console.log(feedback);
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
    ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');
    wrapFeeds.appendChild(ulFeeds);
  }
};

const renderListRSS = (state) => {
  const ulPosts = document.querySelector('.posts .card > ul.list-group.border-0.rounded-0');
  // console.log(ulPosts);
  if (ulPosts) {
    const { articles } = state.UI.articles;
    // console.log(`state: ${state}`);
    // console.log(`articles: ${JSON.stringify(articles)}`);
    // console.log(`state.UI.articles: ${state.UI.articles}`);
    articles.forEach((article) => {
      // console.log(`article: ${article}`);
      const { title, url, id } = article;
      // console.log(`Title: ${title}`);
      // console.log(`Description: ${description}`);
      // console.log(`URL: ${url}`);
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
      const linkRSS = document.createElement('a');
      li.appendChild(linkRSS);
      linkRSS.classList.add('fw-bold');
      linkRSS.href = url;
      linkRSS.target = '_blank';
      linkRSS.textContent = title;
      linkRSS.rel = 'noopener noreferrer';

      const openButton = document.createElement('button');
      li.appendChild(openButton);
      openButton.type = 'button';
      openButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      openButton.setAttribute('data-id', id);
      openButton.setAttribute('data-bs-toggle', 'modal');
      openButton.setAttribute('data-bs-target', '#modal');
      openButton.textContent = i18next.t('viewButton');
    });
  } else {
    console.error('Не удалось найти элемент ul для добавления статей.');
  }
};

const renderFeedRSS = (state) => {
  const ulFeeds = document.querySelector('.feeds .list-group');
  console.log(ulFeeds);
  if (ulFeeds) {
    const { feed } = state.UI.feeds;
    console.log(`state: ${JSON.stringify(state)}`);
    console.log(`feed: ${JSON.stringify(feed)}`);
    feed.forEach((item) => {
      const { name, description } = item;
      const li = document.createElement('li');
      ulFeeds.appendChild(li);
      li.classList.add('list-group-item', 'border-end-0');
      const hFeed = document.createElement('h3');
      li.appendChild(hFeed);
      hFeed.classList.add('h6', 'm-0');
      hFeed.textContent = name;
      const pFeed = document.createElement('p');
      li.appendChild(pFeed);
      pFeed.classList.add('m-0', 'small', 'text-black-50');
      pFeed.textContent = description;
    });
  } else {
    console.error('Не удалось найти элемент ul для добавления feeds.');
  }
};

// prettier-ignore
export {
  renderErrors,
  renderGetDataError,
  initUI,
  renderListRSS,
  renderParsingError,
  renderFeedRSS,
};
