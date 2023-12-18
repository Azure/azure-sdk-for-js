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
  userAgentData?: {
    platform?: string;
  };
}

/**
 * @internal
 */
export function setPlatformSpecificData(map: Map<string, string>): void {
  const localNavigator = globalThis.navigator as NavigatorEx;
  map.set(
    "OS",
    (localNavigator?.userAgentData?.platform ?? localNavigator?.platform ?? "unknown").replace(
      " ",
      ""
    )
  );
}
