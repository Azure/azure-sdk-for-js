const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    aliasFields: ['browser'],
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve("os-browserify/browser")
    }
  },
  mode: 'development',
  devServer: {
    static: '.',
  },
  optimization: {
    usedExports: true
  }
};
