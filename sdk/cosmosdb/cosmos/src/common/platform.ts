// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants } from "./constants";
import { getUserAgent as userAgent } from "universal-user-agent";

/**
 * @hidden
 */
export function getUserAgent(suffix?: string): string {
  const ua = `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
  if (suffix) {
    return ua + " " + suffix;
  }
  return ua;
}
