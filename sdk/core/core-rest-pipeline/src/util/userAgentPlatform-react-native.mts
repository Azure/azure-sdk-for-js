// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Platform } from "react-native";

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
}

/**
 * @internal
 */
export async function setPlatformSpecificData(map: Map<string, string>): Promise<void> {
  if (Platform.constants?.reactNativeVersion) {
    const { major, minor, patch } = Platform.constants.reactNativeVersion;
    map.set("react-native", `${major}.${minor}.${patch}`);
  }
  map.set("OS", `${Platform.OS}-${Platform.Version}`);
}
