/*
  ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  
  entry: './client/index.jsx',
  
  output: {
    path: path.resolve('docs'),
    filename: 'bundle.js'
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        }
      }
    ]
  },

  plugins: [HtmlWebpackPluginConfig]

}