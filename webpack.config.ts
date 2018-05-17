import * as webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
  entry: './lib/msRest.ts',
  devtool: 'source-map',
  output: {
    filename: 'msRestBundle.js',
    path: __dirname,
    libraryTarget: 'var',
    library: 'msRest'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|test)/,
        options: { configFile: 'tsconfig.webpack.json' }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  node: {
    fs: false,
    net: "empty", // TODO: create wrapper package for tough-cookie and change this back to "false"
    path: false,
    dns: false,
    tls: false,
    tty: false,
    v8: false,
    Buffer: false
  }
};

export = config;