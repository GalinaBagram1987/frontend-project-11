import axios from 'axios';
import * as yup from 'yup';
import { uniqueId } from 'lodash';
import schemaValidate from './schemaForValidate.js';

import { watchedState } from './state.js';

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
        console.log(
          'watchedState.validationStatus:',
          watchedState.validationStatus,
        );
        const errorKey = error.errors[0];
        console.log(error.errors);
        watchedState.errorKey = errorKey; // Сохраняем в watchedState
        throw new Error(watchedState.errorKey); // Пробрасываем ошибку дальше
      }
    });
  console.log(watchedState.validationStatus);
};

const getData = (inputValue) => {
  watchedState.inputData = inputValue.trim();
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
    const feedName = channel.querySelector('title')
      ? channel.querySelector('title').textContent
      : '';
    const feedDescription = channel.querySelector('description')
      ? channel.querySelector('description').textContent
      : '';

    const feed = {
      name: feedName,
      description: feedDescription,
      // url: responseUrl,
      id: uniqueId(),
    };

    const items = channel.querySelectorAll('item');
    const articles = Array.from(items)
      .map((article) => {
        const articleTitle = article.querySelector('title')
          ? article.querySelector('title').textContent
          : '';
        const articleDescr = article.querySelector('description')
          ? article.querySelector('description').textContent
          : '';
        const articleUrl = article.querySelector('link')
          ? article.querySelector('link').textContent
          : '';
        if (!articleUrl) {
          return null;
        }
        return {
          title: articleTitle,
          description: articleDescr,
          url: articleUrl,
          id: uniqueId(),
          feedId: feed.id,
        };
      })
      .filter((article) => article);
    watchedState.parsingStatus = 'success';
    watchedState.UI.article = { articles, ...watchedState.UI.article };
    watchedState.UI.feeds = { feed, ...watchedState.UI.feeds };
  } catch (error) {
    watchedState.parsingStatus = 'failed';
    watchedState.parsingError = error.message;
  }
};
export { validateUrl, getData, parserData };
