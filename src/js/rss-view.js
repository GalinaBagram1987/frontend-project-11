import i18next from './i18next.js';
import { watchedState } from './state.js';

const renderErrors = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('is-invalid');
    feedback.innerHTML = i18next.t(watchedState.errorKey);
  } else {
    urlInput.classList.remove('is-invalid');
    feedback.innerHTML = ''; // Убираем сообщение при валидном URL
  }
};

export default renderErrors;
