// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 * and "plugins" section in webpack.testconfig.ts.
 */

import { TelemetryInfo } from "./userAgentPolicy";
const { Platform } = require("react-native");

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

  console.log("Platform.constants", Platform.constants);
  return [runtimeInfo, osInfo];
}
