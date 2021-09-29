// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json.
 */

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
  // TODO: Investigate using `import { Platform } from "react-native"` to get "OS" and "Version".
  // This may bring in a lot of overhead if we have to use this package directly, perhaps we can shim
  // types.
  map.set("OS", `react-native`);
}
