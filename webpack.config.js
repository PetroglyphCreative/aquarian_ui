const path = require('path')
const { compile } = require('@vue/compiler-sfc');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
	  main: './src/index.js',
	  styles:'./src/assets/css/style.css'

  },
  optimization: {
    runtimeChunk: 'single',
 
  },
  mode: process.env.NODE_ENV,
  
  module: {
    
    rules: [
      
        {
	        test: /\.vue$/,
	        use: 'vue-loader'
	      },
	    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]'
        }
       },
       {test: /\.js$/,
       loader: 'babel-loader',
       include: [path.join(__dirname, 'src')],
     },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 1
              }
          },
          {
              loader: 'postcss-loader',
              options: {
                  postcssOptions: {
                      plugins: ['autoprefixer']
                  }
              }
          }
      ]
      },
       {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
         filename: 'img/[name][ext]'
       }
       }
     ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
	    filename: 'index.html',
      template: 'src/index.html'
    }),

  ],
  output: {
	  filename:'[name].js',
    path: path.resolve(__dirname, '../deploy/public/ui/')
  },
  devServer: {
	  port: 8088,
    open: true,
    hot: true,

    static: path.join(__dirname,  '..','deploy/public/ui/') // Get it to serve from somewhere other than right here.
  }
}
