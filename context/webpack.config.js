const
  path = require('path'),
  webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production' ? true : false

module.exports = {
  entry: [
    './src/app.js'
  ],

  output: {
    path: path.resolve('../dist/context'),
    filename: 'index.js'
  },

  devtool: isProd ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },

  mode: isProd ? 'production' : 'development'
}