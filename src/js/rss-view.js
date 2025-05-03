import { watchedState } from './state.js';

const renderErrors = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (watchedState.validationStatus === 'invalid') {
    urlInput.classList.add('is-invalid');
    feedback.textContent = 'Ссылка должна быть валидным URL';
  } else {
    urlInput.classList.remove('is-invalid');
    feedback.textContent = ''; // Убираем сообщение при валидном URL
  }
};
export default renderErrors;
