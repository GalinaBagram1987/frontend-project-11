import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Импортируем HtmlWebpackPlugin
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const config = {
//   mode: 'development', // или 'production
//   entry: './index.js',
//   devServer: {
//     static: path.resolve(__dirname),
//     port: 8081,
//     hot: false, // Выключаем HMR
//     client: {
//       overlay: false, // не экранируем ошибки
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//           },
//         },
//       },
//       { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
//       {
//         test: /\.scss$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
//       },
//       {
//         test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//         use: 'url-loader?limit=10000',
//       },
//       {
//         test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
//         use: 'file-loader',
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'index.html',
//     }),
//   ],
//   output: {
//     clean: true,
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           compress: {
//             drop_console: false, // Убедитесь, что эта опция установлена
//           },
//         },
//         extractComments: false,
//       }),
//     ],
//   },
// };
// export default config;

// настройки без bable
// Без babel: вычисляем __dirname/filename через URL API
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development', // или 'production'
  entry: './src/index.js',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'), // Только нужная папка
      watch: {
        ignored: /node_modules/, // Игнорировать node_modules
        usePolling: false,
      },
    },
    port: 8081,
    hot: true, // Включаем HMR
    client: {
      overlay: false, // не экранируем ошибки
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      scriptLoading: 'module',
      attributes: {
        crossorigin: '',
      },
    }),
  ],
  output: {
    clean: true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false, // Отключаем в development
  },
  watchOptions: {
    aggregateTimeout: 500, // Задержка перед пересборкой
    ignored: ['**/node_modules', '**/dist'], // Игнорируемые пути
  },
};

export default config;
