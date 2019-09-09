const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true,
    contentBase: __dirname,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(svg|gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.css',
      chunkFilename: '[id].css'
    })
  ]
};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  config.devtool = isProduction ? 'source-map' : 'eval-sourcemap';
  config.module.rules[0].use[0] = {
    loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
  };

  return config;
};
