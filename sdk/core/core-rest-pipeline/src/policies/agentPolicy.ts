// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";
import type { Agent } from "../interfaces.js";
import {
  agentPolicyName as tspAgentPolicyName,
  agentPolicy as tspAgentPolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * Name of the Agent Policy
 */
export const agentPolicyName = tspAgentPolicyName;

/**
 * Gets a pipeline policy that sets http.agent
 */
export function agentPolicy(agent?: Agent): PipelinePolicy {
  return tspAgentPolicy(agent);
}
