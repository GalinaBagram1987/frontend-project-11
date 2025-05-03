// import axios from 'axios';
import * as yup from 'yup';
import schemaValidate from './schemaForValidate.js';

import { watchedState } from './state.js';
// import fsp from 'fs/promises';

const validateUrl = (inputValue) => {
  watchedState.inputData = inputValue;

  console.log({ watchedState });

  return schemaValidate
    .validate({ url: inputValue }, { abortEarly: false })
    .then(() => {
      watchedState.validationStatus = 'valid';
      return true; // Возвращаем true для дальнейшей логики
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
        throw error; // Пробрасываем ошибку дальше
      }
    });
};

export default validateUrl;
