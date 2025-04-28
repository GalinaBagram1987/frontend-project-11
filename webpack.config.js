const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импортируем HtmlWebpackPlugin

module.exports = {
  mode: 'development', // или 'production
  entry: './src/js/index.js',
  devServer: {
    static: path.resolve(__dirname),
    port: 8080,
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },

  // module: {
  //     rules: [
  // {
  // test: /\.(scss)$/,
  // use: [
  // {
  // loader: 'style-loader',
  // },
  // {
  // loader: 'css-loader',
  // },
  // {
  // loader: 'postcss-loader',
  // options: {
  // postcssOptions: {
  // plugins: () => [require('autoprefixer')],
  // },
  // },
  // },
  // {
  // loader: 'sass-loader',
  // },
  // ],
  // },
  // ],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    clean: true,
  },
};
// import path from 'path'; // Используем import для импорта модуля path
// import HtmlWebpackPlugin from 'html-webpack-plugin';

// export default {
//   mode: process.env.NODE_ENV || 'development',
//   devServer: {
//     client: {
//       overlay: false,
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
// {
//   test: /\.scss$/,
//   use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
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
// };
