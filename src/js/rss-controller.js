import axios from 'axios';
import * as yup from 'yup';
import { uniqueId } from 'lodash';
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
    // const feedUrl = channel.querySelector('link') ? channel.querySelector('link').textContent : '';

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

  watchedState.UI.articles = { ...watchedState.UI.articles, ...articles };
  watchedState.UI.feeds.unshift(feeds[0]);
  watchedState.parsingStatus = 'success';
};

// обновление данных каждые 5 сек

const checkNewRSS = (responseData, state) => {
  const copyArticles = state.UI.articles;
  const existingArticles = Object.values(copyArticles).map((article) => article.url);
  // хранилище уникальных url
  // console.log(`existingArticles: ${JSON.stringify(existingArticles)}`);
  const parsData = parserData(responseData);
  // console.log(`parsData: ${JSON.stringify(parsData)}`);
  const articles = { ...parsData };
  console.log(`articles: ${JSON.stringify(articles)}`);
  const newArticles = articles.articles.filter((item) => !existingArticles.includes(item.url));
  console.log(`newArticles: ${JSON.stringify(newArticles)}`);
  // фильр дынных не включ статьи
  if (newArticles.length > 0) {
    state.UI.articles.articles.unshift(...newArticles); // Добавляем новые статьи в начало
  }
};

const updateRssData = async (state) => {
  // const { feeds } = state.UI.feeds;
  // const feeds = [...state.UI.feeds];
  const feeds = [...state.enteredData];
  console.log(`feeds: ${JSON.stringify(feeds)}`);
  const fetchPromises = feeds.map((feedUrl) => {
    // console.log(`feed: ${JSON.stringify(feed)}`);
    // const feedUrl = feed.url;
    console.log(`feedUrl: ${JSON.stringify(feedUrl)}`);
    watchedState.dataFetchStatus = 'processing';
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=
      ${encodeURIComponent(feedUrl)}`;
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
        return null;
      });
  });
  // console.log('fetchPromises:', fetchPromises);
  const responseDataArray = await Promise.all(fetchPromises);
  console.log('responseDataArray:', responseDataArray);

  responseDataArray.forEach((responseData) => {
    if (responseData) {
      checkNewRSS(responseData, state);
    }
  });
};

const updateRss = (state) => {
  setTimeout(() => {
    updateRssData(state);
  }, 5000);
};

// prettier-ignore
export {
  validateUrl,
  getData,
  parserData,
  updateStateWithParserData,
  updateRss,
};
