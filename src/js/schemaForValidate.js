import * as yup from 'yup';
import { setLocale } from 'yup';
import { state } from './state.js';

setLocale({
  mixed: {
    default: 'errorRSS',
    notOneOf: 'errorUniq',
  },
  string: {
    url: 'errorRSS',
    test: 'errorRSS',
  },
});

const schemaValidate = yup.object().shape({
  url: yup
    .string()
    .url('errorRSS')
    .required()
    .test('errorUniq', 'errorUniq', (url) => !state.enteredData.includes(url))
    .test('errorRSS', (url) => {
      const rssPattern = /(\.(xml|rss|feed))|((\/feed)|(\/feeds))$/i;
      return rssPattern.test(url);
    }),
});

export default schemaValidate;
