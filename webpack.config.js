const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const isProd = !isDev

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   }
   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssets(),
         new TerserWebpackPlugin()
      ]
   }
   return config
}
const babelToggle = () => {
   if (isProd) {
      return {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: {
            loader: 'babel-loader',
            options: {
               presets: [
                  '@babel/preset-env'
               ]
            }
         }
      }
   }
   return {}
};

module.exports = {
   context: path.resolve(__dirname, 'src'),
   entry: './index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./index.html",
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new copyWebpackPlugin([
         {
            from: path.resolve(__dirname, 'src/assets/content_img'),
            to: path.resolve(__dirname, 'dist')
         }
      ]),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
   ],
   module: {
      rules: [
         babelToggle(),
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.less$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: [
                        autoprefixer()
                     ],
                     sourceMap: true
                  }
               },
               'less-loader'
            ],
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            use: ['file-loader']
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
         }
      ]
   },
   optimization: optimization(),
}