// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json.
 */

import { TelemetryInfo } from "./userAgentPolicy";
const { Platform } = require("react-native"); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports

export function getDefaultUserAgentKey(): string {
  return "x-ms-useragent";
}

export function getPlatformSpecificData(): TelemetryInfo[] {
  const runtimeInfo = {
    key: "react-native",
    value: Platform.reactNativeVersion,
  };

  const osInfo = {
    key: "OS",
    value: `${Platform.OS}-${String(Platform.Version)}`,
  };

  return [runtimeInfo, osInfo];
}
