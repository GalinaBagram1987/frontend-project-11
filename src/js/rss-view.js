import { watchedState } from './state.js';
// import i18next from './i18next.js';

const renderErrors = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('is-invalid');
    feedback.textContent = watchedState.errorMessages.join(', ');
  } else {
    urlInput.classList.remove('is-invalid');
    feedback.textContent = ''; // Убираем сообщение при валидном URL
  }
};

export default renderErrors;
