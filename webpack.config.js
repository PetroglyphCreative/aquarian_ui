const path = require('path')
const { compile } = require('@vue/compiler-sfc');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
	  main: './src/index.js',
	  styles:'./src/assets/css/style.css'

  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'styles.css'
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
