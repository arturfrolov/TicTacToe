const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
      port: 3000,
      open: true,
      hot: true,
    },
    // entry: './src/js/main.js',
    entry: path.resolve(__dirname, 'src', 'js/main.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.[contenthash].js',
      clean: true,
      // path: __dirname + '/dist/js'
      // assetModuleFilename: '[path][name][ext]',
      assetModuleFilename: pathData => {
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name][ext]`;
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'policy.html'),
        filename: 'policy.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contenthash].css',
      }),
    ],
  
  
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')],
                },
              },
            },
            'group-css-media-queries-loader',
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(woff2?$)|(ttf$)/i,
          type: 'asset/resource',
          // generator: {
          //   filename: 'fonts/[name][ext]',
          // },
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg)$/i,
          use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
          type: 'asset/resource',
          // generator: {
          //   filename: 'img/[name][ext]',
          // },
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: 'usage'
              }]]
            }
          }
        }
      ]
    }
  };