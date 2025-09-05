import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
// import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  // 1. Стилистические правила
  // stylistic.configs.recommended,

  // 2. Базовые правила для JS файлов
  {
    files: ['**/*.{js,mjs,cjs}'], // Все JS файлы
    plugins: { js },
    extends: ['js/recommended'], // Рекомендуемые правила
  },

  // 3. Глобальные переменные
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser, // window, document, etc.
        process: 'readonly', // Переменная process (для Node.js)
      },
    },
  },
]);
