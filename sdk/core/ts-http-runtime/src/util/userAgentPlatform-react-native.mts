// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json.
 */

/* @ts-ignore */
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
