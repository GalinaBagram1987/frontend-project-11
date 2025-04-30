import { schemaValidate } from './schemaForValidate';
// import { watchedState } from './rss-model';
import fsp from 'fs/promises';

export const validateUrl = (state, inputValue) => {
  state.inputData = inputValue;
  return schemaValidate
    .validate({ url: inputValue }, { abortEarly: false })
    .then(() => {
      state.validationStatus = 'valid';
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        state.validationStatus = 'invalid';
      }
    });
};
