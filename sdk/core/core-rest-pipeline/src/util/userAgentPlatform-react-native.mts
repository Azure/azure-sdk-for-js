// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { Platform } = await import("react-native");

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
}

/**
 * @internal
 */
export function setPlatformSpecificData(map: Map<string, string>): void {
  if (Platform.constants?.reactNativeVersion) {
    const { major, minor, patch } = Platform.constants.reactNativeVersion;
    map.set("react-native", `${major}.${minor}.${patch}`);
  }
  map.set("OS", `${Platform.OS}-${Platform.Version}`);
}
