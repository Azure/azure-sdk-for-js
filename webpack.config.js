const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './lib/msRestAzure.ts',
  devtool: 'source-map',
  output: {
    filename: 'msRestAzureBundle.js',
    path: __dirname,
    libraryTarget: 'var',
    library: 'msRestAzure'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|test)/,
        options: { configFile: path.join(__dirname, './tsconfig.es.json') }
      }
    ]
  },
  // ms-rest-js is a dependency of this project. Customer is expected to manually import/include
  // this for browser javascript in a script tag. More info over here
  // https://webpack.js.org/configuration/externals/ and https://webpack.js.org/guides/author-libraries/#add-externals.
  externals: {
    "ms-rest-js": "msRest"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  node: {
    fs: false,
    net: false,
    path: false,
    dns: false,
    tls: false,
    tty: false,
    v8: false,
    Buffer: false
  }
};