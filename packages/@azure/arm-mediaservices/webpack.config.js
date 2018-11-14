// This is a template webpack config file with minimal configuration.
// Users are free to create their own webpack configuration files in their application.
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  entry: './esm/azureMediaServices.js',
  devtool: 'source-map',
  output: {
    filename: 'azureMediaServicesBundle.js',
    path: __dirname,
    libraryTarget: 'var',
    library: 'azureMediaServices'
  },
  // "ms-rest-js" and "ms-rest-azure-js" are dependencies of this library.
  // Customer is expected to import/include this library in browser javascript
  // (probably using the script tag in their html file).
  externals: {
    "ms-rest-js": "msRest",
    "ms-rest-azure-js": "msRestAzure"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};

module.exports = config;
