
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
