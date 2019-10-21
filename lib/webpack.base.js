
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const projectRoot = process.cwd();

// 动态配置页面
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/page/*/index.js'));
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/page\/(.*)\/index\.js/);
      const pageName = match && match[1];
      entry[pageName] = entryFile;
      return htmlWebpackPlugin.push(
        new HTMLWebpackPlugin({
          template: path.join(projectRoot, `src/page/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['common', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            nminifyCSS: true,
            nminifyJS: true,
            removeComments: false,
          },
        }),
      );
    });

  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                Autoprefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 自定义错误代码
    function ErrorPlugin () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log("build error");//eslint-disbale-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
};
