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
      watchedState.errorKey = [];
      return true; // Возвращаем true для дальнейшей логики
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
        const firstError = error.errors;
        watchedState.errorKey = firstError; // Сохраняем в watchedState
        throw new Error(firstError); // Пробрасываем ошибку дальше
      }
    });
};

export default validateUrl;
