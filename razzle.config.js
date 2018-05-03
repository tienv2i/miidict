const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const razzleHeroku = require('razzle-heroku');
const autoprefixer = require('autoprefixer');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const appConfig = Object.assign({}, config);
    // Config for alias
    const alias = {
      '~': resolve('.'),
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'pages': resolve('src/pages'),
      'store': resolve('src/store'),
      'components': resolve('src/components'),
      'container': resolve('src/container')
    };
    appConfig.resolve.alias = {...config.resolve.alias, ...alias };

    // Config for target==='web'
    if (target === 'web') {
      // Config for SASS Loader
      const sassLoader = {
        loader: "sass-loader",
        options: {
          sourceMap: dev,
          precision: 8
        }
      };
      const cssLoader = {
        loader: "css-loader",
        options: {
          minimize: !dev,
          sourceMap: dev,
          importLoaders: 1
        }
      };
      const postCSSLoader = {
        loader: "postcss-loader",
        options: {
          ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
          sourceMap: dev,
          plugins: () => [
            autoprefixer({
              browsers: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9" // React doesn't support IE8 anyway
              ]
            })
          ]
        }
      };

      if (dev) {
        appConfig.module.rules.push({
          test: /\.scss$/,
          use: ['style-loader', cssLoader, postCSSLoader, sassLoader]
        });      
      } else {
        appConfig.module.rules.push({
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, cssLoader, postCSSLoader, sassLoader]
        });
        // appConfig.plugins.push(new ExtractTextPlugin('style_[hash].js'));
      }

      // Config for React Loadable plugin
      appConfig.plugins.push(
        new ReactLoadablePlugin({ 
          filename: './build/react-loadable.json'
        })
      );
      
    } else {
      // Config for target!=='web'
      appConfig.module.rules.push({
        test: /.scss$/,
        use: ["ignore-loader"]
      });
    }
    return razzleHeroku(appConfig, {target, dev}, webpack);
  }
};