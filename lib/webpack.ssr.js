const merge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWepackEnternalsPlugin = require('html-webpack-externals-plugin');
const Cssnano = require('cssnano');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: Cssnano,
    }),
    new HTMLWepackEnternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDom',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
