const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve("isomorphic-webcrypto/src/react-native"),
  buffer: require.resolve("buffer/"),
  stream: require.resolve("stream"),
};

module.exports = config;
