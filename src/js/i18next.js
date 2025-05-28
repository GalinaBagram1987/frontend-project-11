import i18next from 'i18next';
import resources from './locales/resources.js';

const initI18next = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });
  return i18nextInstance;
};

export { initI18next, i18next };
export default i18next;
