import * as yup from 'yup';
import { watchedState } from './rss-model';

export const schemaValidate = yup.object().shape({
  url: yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .trim()
    .required()
    .notOneOf(watchedState.feeds, 'Это значение должно быть уникальным')
    .test('Ссылка должна быть валидным URL', (url) => {
      const rssPattern = /\.(xml|rss)$/i;
      return rssPattern.test(url);
    }),
});
