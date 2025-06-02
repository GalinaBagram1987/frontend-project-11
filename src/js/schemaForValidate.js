import * as yup from 'yup';
import { setLocale } from 'yup';
import { watchedState } from './state.js';

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
    .notOneOf(watchedState.feeds, 'errorUniq')
    .test('errorRSS', (url) => {
      const rssPattern = /\.(xml|rss|feed)$/i;
      return rssPattern.test(url);
    }),
});

export default schemaValidate;
