// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json.
 */

import { TelemetryInfo } from "./userAgentPolicy";

interface NavigatorEx extends Navigator {
  // oscpu is not yet standards-compliant, but can not be undefined in TypeScript 3.6.2
  readonly oscpu: string;
}

export function getDefaultUserAgentKey(): string {
  return "x-ms-useragent";
}

export function getPlatformSpecificData(): TelemetryInfo[] {
  const navigator = self.navigator as NavigatorEx;
  const osInfo = {
    key: "OS",
    value: (navigator.oscpu || navigator.platform).replace(" ", ""),
  };

  return [osInfo];
}
