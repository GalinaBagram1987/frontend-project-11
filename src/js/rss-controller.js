import axios from 'axios';
import * as yup from 'yup';
import { uniqueId, differenceWith } from 'lodash';
import schemaValidate from './schemaForValidate.js';

import { watchedState } from './state.js';

// получение данных

const validateUrl = (inputValue) => {
  watchedState.inputData = inputValue;

  return schemaValidate
    .validate({ url: inputValue }, { abortEarly: false })
    .then(() => {
      watchedState.validationStatus = 'valid';
      watchedState.errorKey = '';
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
        // console.log('watchedState.validationStatus:' watchedState.validationStatus);
        const errorKey = error.errors[0];
        console.log(error.errors);
        watchedState.errorKey = errorKey; // Сохраняем в watchedState
        throw new Error(watchedState.errorKey); // Пробрасываем ошибку дальше
      }
    });
  // console.log(watchedState.validationStatus);
};

const getData = (inputValue) => {
  watchedState.inputData = inputValue.trim();
  watchedState.enteredData.push(watchedState.inputData);
  watchedState.dataFetchStatus = 'processing';
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=
  ${encodeURIComponent(watchedState.inputData.trim())}`;
  return axios
    .get(proxyUrl)
    .then((response) => {
      watchedState.dataFetchStatus = 'success';
      const responseData = response.data.contents;
      // const responseUrl = response.data.url;
      // console.log('Response Data:', responseData); // Логируем данные для проверки
      return responseData;
      // watchedState.getData = response.data;
      // watchedState.getDataError = {};
      // watchedState.dataFetchStatus = 'success';
    })
    .catch((error) => {
      watchedState.getDataError = error.message;
      watchedState.dataFetchStatus = 'failed';
    });
};

const parserData = (responseData) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseData, 'text/xml');
    const channel = xmlDoc.querySelector('channel');
    const feedName = channel.querySelector('title') ? channel.querySelector('title').textContent : '';
    const feedDescription = channel.querySelector('description') ? channel.querySelector('description').textContent : '';

    const feed = {
      name: feedName,
      description: feedDescription,
      // url: feedUrl,
      id: uniqueId(),
    };

    const items = channel.querySelectorAll('item');
    const articles = Array.from(items)
      .map((article) => {
        const articleTitle = article.querySelector('title') ? article.querySelector('title').textContent : '';
        const articleDescr = article.querySelector('description') ? article.querySelector('description').textContent : '';
        const articleUrl = article.querySelector('link') ? article.querySelector('link').textContent : '';
        if (!articleUrl) {
          return null;
        }
        return {
          title: articleTitle,
          description: articleDescr,
          url: articleUrl,
          // id: uniqueId(),
          feedId: feed.id,
        };
      })
      .filter((article) => article);
    // watchedState.parsingStatus = 'success';
    // watchedState.UI.articles = { ...watchedState.UI.articles, ...articles };
    // watchedState.UI.feeds.unshift(feed);
    return { articles, feeds: [feed] };
  } catch (error) {
    watchedState.parsingStatus = 'failed';
    watchedState.parsingError = error.message;
    return null;
  }
};

const updateStateWithParserData = (responseData) => {
  const parsData = parserData(responseData);
  const { articles, feeds } = parsData;

  // watchedState.UI.articles = { ...watchedState.UI.articles, ...articles };
  watchedState.UI.articles = watchedState.UI.articles.concat(articles);
  watchedState.UI.feeds.unshift(feeds[0]);
  watchedState.parsingStatus = 'success';
};

// обновление данных каждые 5 сек

const updateRssData = async () => {
  // const { feeds } = state.UI.feeds;
  // const feeds = [...state.UI.feeds];
  const feeds = [...watchedState.enteredData];
  console.log(`watchedState.UI.articles: ${JSON.stringify(watchedState.UI.articles)}`);
  // console.log(`feeds: ${JSON.stringify(feeds)}`);
  const fetchPromises = feeds.map((feedUrl) => {
    // console.log(`feed: ${JSON.stringify(feed)}`);
    // console.log(`feedUrl: ${JSON.stringify(feedUrl)}`);

    watchedState.dataFetchStatus = 'processing';
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=
      ${encodeURIComponent(feedUrl)}`;
    return axios
      .get(proxyUrl)
      .then((response) => {
        watchedState.dataFetchStatus = 'success';
        const feedData = parserData(response.data.contents);
        // console.log(`feedData: ${JSON.stringify(feedData)}`);
        // prettier-ignore
        const allNewArticles = feedData.articles
          .map((article) => ({ ...article, channelId: article.feedId }));
        // console.log(`watchedState.UI.articles: ${JSON.stringify(watchedState.UI.articles)}`);
        // console.log(`allNewArticles: ${JSON.stringify(allNewArticles)}`);
        // prettier-ignore
        const oldArticles = Object.values(watchedState.UI.articles)
          .filter((article) => article.feedId);
        // console.log(`oldArticles: ${JSON.stringify(oldArticles)}`);
        // prettier-ignore
        const newArticles = differenceWith(allNewArticles, oldArticles, (art1, art2) => art1.title === art2.title)
          .map((article) => ({ ...article, id: uniqueId() }));
        console.log(`newArticles: ${JSON.stringify(newArticles)}`);
        if (newArticles.length > 0) {
          newArticles.forEach((article) => {
            watchedState.UI.articles.unshift(article);
            console.log(`watchedState.UI.articles: ${JSON.stringify(watchedState.UI.articles)}`);
          });
        }
      })
      .catch((error) => {
        watchedState.getDataError = error.message;
        watchedState.dataFetchStatus = 'failed';
        return null;
      });
  });
  await Promise.all(fetchPromises).finally(() => {
    setTimeout(() => updateRssData(watchedState), 5000);
  });
};

// prettier-ignore
export {
  validateUrl,
  getData,
  parserData,
  updateStateWithParserData,
  updateRssData,
};
