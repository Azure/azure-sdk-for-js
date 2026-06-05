// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxySettings } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

export const proxyPolicyName = "proxyPolicy";
const errorMessage = "proxyPolicy is not supported in browser environment";

export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  throw new Error(errorMessage);
}

/**
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function proxyPolicy(
  _proxySettings?: ProxySettings,
  _options?: {
    customNoProxyList?: string[];
  },
): PipelinePolicy {
  throw new Error(errorMessage);
}

/**
 * A function to reset the cached agents.
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 * @internal
 */
export function resetCachedProxyAgents(): void {
  throw new Error(errorMessage);
}
