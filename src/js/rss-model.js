import { validateUrl, getData, parserData } from './rss-controller.js';
import renderErrors from './rss-view.js';

const rssLogic = () => {
  const form = document.querySelector('.rss-form'); // Находим форму по классу
  console.log(form);
  const input = document.querySelector('#url-input'); // Находим инпут по ID
  console.log(input);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const inputValue = event.target.value;
    const inputValue = input.value.trim();
    validateUrl(inputValue)
      .then(() => {
        getData(inputValue);
        parserData();
      })
      .catch(() => {
        renderErrors();
      });
  });
};

export default rssLogic;
