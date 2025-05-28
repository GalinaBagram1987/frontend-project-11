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
<<<<<<< HEAD
      watchedState.errorMessages = [];
=======
>>>>>>> 253dfdbe736d02ec9f2579b8fd13168d5eed4abc
      return true; // Возвращаем true для дальнейшей логики
    })
    .catch((error) => {
      // console.error(error); // Это сообщение должно появиться в консоли, если происходит ошибка
      if (error instanceof yup.ValidationError) {
        watchedState.validationStatus = 'invalid';
<<<<<<< HEAD
        watchedState.errorMessages = error.errors;
        throw new Error(error.errors); // Пробрасываем ошибку дальше
=======
        throw error; // Пробрасываем ошибку дальше
>>>>>>> 253dfdbe736d02ec9f2579b8fd13168d5eed4abc
      }
    });
};

export default validateUrl;
