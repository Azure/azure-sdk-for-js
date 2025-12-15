// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxySettings } from "../interfaces.js";

export const proxyPolicyName = "proxyPolicy";
const errorMessage = "proxyPolicy is not supported in browser environment";

export function getDefaultProxySettings(_proxyUrl?: string): never {
  throw new Error(errorMessage);
}

/**
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function proxyPolicy(
  _proxySettings?: ProxySettings,
  _options?: {
    /** a list of patterns to override those loaded from NO_PROXY environment variable. */
    customNoProxyList?: string[];
  },
): never {
  throw new Error(errorMessage);
}

/**
 * A function to reset the cached agents.
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 * @internal
 */
export function resetCachedProxyAgents(): never {
  throw new Error(errorMessage);
}
