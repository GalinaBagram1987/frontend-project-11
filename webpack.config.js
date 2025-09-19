import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Импортируем HtmlWebpackPlugin
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin'; // Импортируйте TerserPlugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development', // или 'production
  entry: './index.js',
  devServer: {
    static: path.resolve(__dirname),
    port: 8081,
    hot: false, // Включаем HMR
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Убедитесь, что эта опция установлена
          },
        },
        extractComments: false,
      }),
    ],
  },
};
export default config;
