// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { StoragePipelineOptions } from "../Pipeline.js";

/**
 * The programmatic identifier of the storageSessionAuthenticationPolicy.
 */
export const storageSessionAuthenticationPolicyName = "storageSessionAuthenticationPolicy";

/**
 * Options used to configure storageSessionAuthenticationPolicy.
 */
export interface StorageSessionAuthenticationPolicyOptions {
  /** Policy used whenever a request cannot be authenticated with a session. */
  bearerPolicy: PipelinePolicy;
  /** Credential used to mint sessions when the caller supplies no provider. */
  credential: TokenCredential;
  /** Client options, forwarded to a provider created on demand. */
  clientOptions: StoragePipelineOptions;
}

/**
 * Session authentication signs requests with the Shared Key protocol, which is not available in
 * the browser, so requests are always authenticated with the bearer token policy instead.
 */
export function storageSessionAuthenticationPolicy(
  options: StorageSessionAuthenticationPolicyOptions,
): PipelinePolicy {
  return options.bearerPolicy;
}
