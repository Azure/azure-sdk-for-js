// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

/**
 * Name of the TLS Policy
 */
export const tlsPolicyName = "tlsPolicy";

/**
 * tlsPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function tlsPolicy(): PipelinePolicy {
  throw new Error("tlsPolicy is not supported in browser environment");
}
