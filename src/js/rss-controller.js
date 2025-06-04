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
      // return true; // Возвращаем true для дальнейшей логики
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
        const errorKey = error.errors[0];
        console.log(error.errors);
        watchedState.errorKey = errorKey; // Сохраняем в watchedState
        throw new Error(watchedState.errorKey); // Пробрасываем ошибку дальше
        // return false;
      }
    });
};

const getData = (inputValue) => {
  watchedState.inputData = inputValue.trim();
  watchedState.dataFetchStatus = 'processing';
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=
  ${encodeURIComponent(watchedState.inputData.trim())}`;
  return axios
    .get(proxyUrl)
    .then((response) => {
      watchedState.getData = response.data;
      watchedState.getDataError = {};
      watchedState.dataFetchStatus = 'success';
    })
    .catch((error) => {
      watchedState.getDataError = error.message;
      watchedState.dataFetchStatus = 'failed';
    });
};

const parserData = () => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(watchedState.getData, 'text/xml');
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
      // url, ?? где взять
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
    watchedState.UI.article = { articles, ...watchedState.UI.article };
    watchedState.UI.feeds = { feed, ...watchedState.UI.feeds };
  } catch (error) {
    watchedState.parsingError = error.message;
    watchedState.parsingStatus = 'failed';
  }
};

export { validateUrl, getData, parserData };
