// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

export const decompressResponsePolicyName = "decompressResponsePolicy";

/**
 * decompressResponsePolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function decompressResponsePolicy(): PipelinePolicy {
  throw new Error("decompressResponsePolicy is not supported in browser environment");
}
