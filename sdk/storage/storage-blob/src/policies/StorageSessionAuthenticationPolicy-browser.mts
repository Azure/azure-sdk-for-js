// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { PipelineLike } from "../Pipeline.js";

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
  /** Pipeline of the owning client, reused by a provider created on demand. */
  pipeline: PipelineLike;
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
