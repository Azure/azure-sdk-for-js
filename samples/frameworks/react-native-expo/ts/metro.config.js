/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * This is required to polyfill the node.js URL module.
 * Once @azure/ai-text-analytics is updated with react native
 * file mappings, this config and file can be removed.
 * 
 * @format
 */

module.exports = {
  resolver: {
    extraNodeModules: {
      ...require('node-libs-react-native'),
    },
  },
};
