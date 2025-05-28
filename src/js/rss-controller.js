// import axios from 'axios';
import * as yup from 'yup';
import schemaValidate from './schemaForValidate.js';

import { watchedState } from './state.js';

const validateUrl = (inputValue) => {
  watchedState.inputData = inputValue;

  console.log({ watchedState });

  return schemaValidate
    .validate({ url: inputValue }, { abortEarly: false })
    .then(() => {
      watchedState.validationStatus = 'valid';
      watchedState.errorMessages = [];
      return true; // Возвращаем true для дальнейшей логики
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
        watchedState.errorMessages = error.errors;
        throw new Error(error.errors); // Пробрасываем ошибку дальше
      }
    });
};

export default validateUrl;
