import * as webpack from 'webpack';
import * as glob from 'glob';
import * as path from 'path';

const config: webpack.Configuration = {
  entry: [...glob.sync(path.join(__dirname, 'test/shared/**/*.ts')), ...glob.sync(path.join(__dirname, 'test/browser/**/*.ts'))],
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname
  },
  output: {
    filename: 'testBundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules)/
      }
    ]
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
    Buffer: false,
    process: true,
    stream: false
  }
};

export = config;
