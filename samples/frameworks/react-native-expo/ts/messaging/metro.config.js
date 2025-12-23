const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve("isomorphic-webcrypto/src/react-native"),
  os: require.resolve("os-browserify"),
  path: require.resolve("path-browserify"),
  process: require.resolve("process/browser"),
  buffer: require.resolve("buffer/"),
};

module.exports = config;
