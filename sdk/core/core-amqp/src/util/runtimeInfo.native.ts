// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json.
 */
const { Platform } = require("react-native"); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports

/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo(): string {
  return `(${Platform.OS}-${Platform.Version})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @internal
 */
export function getFrameworkInfo(): string {
  const { major, minor, patch } = Platform.constants.reactNativeVersion;
  return `react-native/${major}.${minor}.${patch}`;
}
