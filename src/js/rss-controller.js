// import axios from 'axios';
import * as yup from 'yup';
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

export default validateUrl;
