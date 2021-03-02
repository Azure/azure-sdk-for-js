// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json.
 */

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
}

interface NavigatorEx extends Navigator {
  // oscpu is not yet standards-compliant, but can not be undefined in TypeScript 3.6.2
  readonly oscpu: string;
}

/**
 * @internal
 */
export function setPlatformSpecificData(map: Map<string, string>): void {
  const navigator = self.navigator as NavigatorEx;
  map.set("OS", (navigator.oscpu || navigator.platform).replace(" ", ""));
}
