// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

/**
 * Name of the Agent Policy
 */
export const agentPolicyName = "agentPolicy";

/**
 * agentPolicy is not supported in react-native and attempting
 * to use it will raise an error.
 */
export function agentPolicy(): PipelinePolicy {
  throw new Error("agentPolicy is not supported in react-native environment");
}
