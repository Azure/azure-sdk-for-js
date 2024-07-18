// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Platform } from "react-native";

/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo(): string {
  return `(${Platform.OS}-${Platform.Version})`;
}

/**
 * Returns information about React-Native this function is being run on.
 * @internal
 */
export function getFrameworkInfo(): string {
  if (Platform.constants?.reactNativeVersion) {
    const { major, minor, patch } = Platform.constants.reactNativeVersion;
    return `react-native/${major}.${minor}.${patch}`;
  }
  return `react-native/unknown`;
}
