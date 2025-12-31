// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClientOptions } from "../index.js";
import { Constants, UserAgentFeatureFlags } from "./constants.js";

/**
 * @hidden
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

// TODO: Standardize across other platforms from @azure/core-util
function userAgentDetails(): string {
  let userAgentDetail = "<environment undetectable>";

  if (globalThis.navigator && globalThis.navigator.userAgent) {
    userAgentDetail = globalThis.navigator.userAgent;
  }

  if (globalThis.process && globalThis.process.version) {
    userAgentDetail = `Node.js/${process.version.slice(1)} (${process.platform}; ${process.arch})`;
  }

  return userAgentDetail;
}

/**
 * @hidden
 * TODO: This function was getting used to track PPAF. Now by default PPAF is enabled. We need to revisit this function.
 */
export function addFeatureFlagsToUserAgent(optionsOrConnectionString: CosmosClientOptions): string {
  let featureFlag = 0;

  if (optionsOrConnectionString.connectionPolicy) {
    if (optionsOrConnectionString.connectionPolicy.enablePartitionLevelFailover) {
      featureFlag += UserAgentFeatureFlags.PerPartitionAutomaticFailover;
    }
    if (
      optionsOrConnectionString.connectionPolicy.enablePartitionLevelFailover ||
      optionsOrConnectionString.connectionPolicy.enablePartitionLevelCircuitBreaker
    ) {
      featureFlag += UserAgentFeatureFlags.PerPartitionCircuitBreaker;
    }
  }

  return featureFlag === 0 ? "" : ` F${featureFlag.toString(16).toUpperCase()}`;
}
