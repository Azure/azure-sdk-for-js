// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    buffer: require.resolve("buffer/"),
    os: require.resolve("os-browserify/browser"),
    process: require.resolve("process/browser"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("isomorphic-webcrypto/src/react-native"),
  },
};

module.exports = config;
