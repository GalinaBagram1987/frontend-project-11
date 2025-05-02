// import { watchedState } from './state.js';

const renderErrors = (watchedState) => {
  const urlInput = document.querySelector('#url-input');
  // const button = document.querySelector('[aria-label="add"]');
  const feedback = document.querySelector('.feedback');
  if (watchedState.validateStatus === 'invalid') {
    urlInput.classList.add('is-invalid');
    feedback.textContent = 'Ссылка должна быть валидным URL';
  } else {
    urlInput.classList.remove('is-invalid');
    feedback.textContent = ''; // Убираем сообщение при валидном URL
  }
};
export default renderErrors;
