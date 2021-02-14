// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getUserAgent as userAgent } from "universal-user-agent";
import { Constants } from "./constants";

/**
 * @hidden
 */
export function getUserAgent(suffix?: string) {
  const ua = `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
  if (suffix) {
    return ua + " " + suffix;
  }
  return ua;
}
