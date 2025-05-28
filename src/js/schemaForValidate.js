import * as yup from 'yup';
import { setLocale } from 'yup';
import i18next from './i18next.js';
import { watchedState } from './state.js';

setLocale({
  mixed: {
    default: i18next.t('errorRSS'),
    notOneOf: i18next.t('errorUniq'),
  },
  string: {
    url: i18next.t('errorRSS'),
    test: i18next.t('errorRSS'),
  },
});

const schemaValidate = yup.object().shape({
  url: yup
    .string()
    .url(i18next.t('errorRSS'))
    .trim()
    .required()
    .notOneOf(watchedState.feeds, i18next.t('errorUniq'))
    .test('URL must be valid', i18next.t('errorRSS'), (url) => {
      const rssPattern = /\.(xml|rss|feed|feed=atom)$/i;
      return rssPattern.test(url);
    }),
});

export default schemaValidate;
