// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "../pipeline.js";
import type { Agent, ProxySettings, TlsSettings } from "../interfaces.js";
import type { RedirectPolicyOptions } from "./redirectPolicy.js";
import { agentPolicy } from "./agentPolicy.js";
import { tlsPolicy } from "./tlsPolicy.js";
import { proxyPolicy } from "#platform/proxy";
import { decompressResponsePolicy } from "#platform/decompress";
import { redirectPolicy } from "./redirectPolicy.js";

/**
 * Options for configuring platform-specific pipeline policies.
 *
 * @internal
 */
export interface PlatformPoliciesOptions {
  agent?: Agent;
  tlsOptions?: TlsSettings;
  proxyOptions?: ProxySettings;
  redirectOptions?: RedirectPolicyOptions;
}

/**
 * Add platform-specific policies to the pipeline.
 *
 * On Node.js, this adds agent, TLS, proxy, decompression, and redirect
 * policies. On browser and React Native these concerns are handled
 * natively by the runtime, so this is a no-op.
 *
 * @internal
 */
export function addPlatformPolicies(pipeline: Pipeline, options: PlatformPoliciesOptions): void {
  if (options.agent) {
    pipeline.addPolicy(agentPolicy(options.agent));
  }
  if (options.tlsOptions) {
    pipeline.addPolicy(tlsPolicy(options.tlsOptions));
  }
  pipeline.addPolicy(proxyPolicy(options.proxyOptions));
  pipeline.addPolicy(decompressResponsePolicy());
  // Both XHR and Fetch expect to handle redirects automatically,
  // so this only takes effect on Node.
  pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
}
