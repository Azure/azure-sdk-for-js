// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse, ProxySettings, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

export const proxyPolicyName = "proxyPolicy";

/**
 * Proxy settings are not supported outside of Node.js, so there are no
 * settings to retrieve in this environment.
 */
export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  return undefined;
}

/**
 * proxyPolicy is not supported outside of Node.js. To avoid breaking pipelines
 * that include it on unsupported platforms, this implementation returns a
 * no-op policy that simply forwards the request to the next policy.
 */
export function proxyPolicy(
  _proxySettings?: ProxySettings,
  _options?: {
    customNoProxyList?: string[];
  },
): PipelinePolicy {
  return {
    name: proxyPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Proxy is not supported outside of Node.js, so do nothing.
      return next(request);
    },
  };
}

/**
 * A function to reset the cached agents.
 * proxyPolicy is not supported outside of Node.js, so this is a no-op.
 * @internal
 */
export function resetCachedProxyAgents(): void {
  // Proxy is not supported outside of Node.js, so there is nothing to reset.
}
