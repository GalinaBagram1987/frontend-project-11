import onChange from 'on-change';
import { state } from './rss-model.js';

const watchedState = onChange(state);

const renderErrors = (watchedState) => {
  const urlInput = document.querySelector('#url-input');
  const button = document.querySelector('[aria-label="add"]');
  const feedback = document.querySelector('.feedback');

  if (watchedState.validateStatus === 'invalid') {
    urlInput.classList.add = 'is-invalid';
    feedback.textContent = 'Ссылка должна быть валидным URL';
  }
};
