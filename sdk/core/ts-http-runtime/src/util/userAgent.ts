// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getHeaderName, setPlatformSpecificData } from "./userAgentPlatform";
import { SDK_VERSION } from "../constants";

function getUserAgentString(telemetryInfo: Map<string, string>): string {
  const parts: string[] = [];
  for (const [key, value] of telemetryInfo) {
    const token = value ? `${key}/${value}` : key;
    parts.push(token);
  }
  return parts.join(" ");
}

/**
 * @internal
 */
export function getUserAgentHeaderName(): string {
  return getHeaderName();
}

/**
 * @internal
 */
export function getUserAgentValue(prefix?: string): string {
  const runtimeInfo = new Map<string, string>();
  runtimeInfo.set("ts-http-runtime", SDK_VERSION);
  setPlatformSpecificData(runtimeInfo);
  const defaultAgent = getUserAgentString(runtimeInfo);
  const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
  return userAgentValue;
}
