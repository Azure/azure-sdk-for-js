// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";
import type { Agent } from "../interfaces.js";

/**
 * Name of the Agent Policy
 */
export const agentPolicyName = "agentPolicy";

/**
 * Gets a pipeline policy that sets http.agent
 */
export function agentPolicy(agent?: Agent): PipelinePolicy {
  return {
    name: agentPolicyName,
    sendRequest: async (req, next) => {
      // Users may define an agent on the request, honor it over the client level one
      if (!req.agent) {
        req.agent = agent;
      }
      return next(req);
    },
  };
}
