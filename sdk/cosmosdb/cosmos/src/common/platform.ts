// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { userAgent } from "../utils/user-agent";
import { Constants } from "./constants";

/**
 * @ignore
 */
export function getUserAgent(suffix?: string) {
  const ua = `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
  if (suffix) {
    return ua + " " + suffix;
  }
  return ua;
}
