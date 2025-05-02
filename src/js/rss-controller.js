// import axios from 'axios';
import * as yup from 'yup';
import schemaValidate from './schemaForValidate.js';

// import { watchedState  } from './state.js';
// import fsp from 'fs/promises';

const validateUrl = (watchedState, inputValue) => {
  const newState = { ...watchedState };

  newState.inputData = inputValue;

  console.log({ newState });

  return schemaValidate
    .validate({ url: inputValue }, { abortEarly: false })
    .then(() => {
      newState.validationStatus = 'valid';
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        newState.validationStatus = 'invalid';
      }
    });
};

export default validateUrl;
