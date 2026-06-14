// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosClientOptions } from "../index.js";
import { Constants } from "./constants.js";
import { userAgentDetails } from "#platform/common/platform";

/**
 * Constructs the user-agent string for Cosmos DB requests.
 */
export function getUserAgent(
  optionsOrConnectionString?: CosmosClientOptions,
  hostFramework?: string,
): string {
  let ua = `${userAgentDetails()} ${Constants.SDKName}/${Constants.SDKVersion}`;
  if (hostFramework) {
    ua = ua + " " + hostFramework;
  }
  if (optionsOrConnectionString && optionsOrConnectionString.userAgentSuffix) {
    ua = ua + " " + optionsOrConnectionString.userAgentSuffix;
  }
  return ua;
}
