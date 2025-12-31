// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { Platform } = require("react-native"); // eslint-disable-line @typescript-eslint/no-require-imports

/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
export function getRuntimeInfo(): string {
  const { major, minor, patch } = Platform.constants.reactNativeVersion;
  return `react-native/${major}.${minor}.${patch} (${Platform.OS} ${Platform.Version})`;
}
