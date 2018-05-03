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
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
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
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "moment": path.resolve('./node_modules/moment/min/moment.min.js')
    }
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

export default config;