// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shared helpers for samples that invoke prompt agents through agent endpoints.
 */

import type {
  AgentDefinitionUnion,
  AgentEndpointConfig,
  AgentsCreateVersionOptionalParams,
  AgentsPatchAgentObjectOptionalParams,
  AgentVersion,
  AIProjectClient,
} from "@azure/ai-projects";

/**
 * Creates an agent version, routes the agent endpoint to it, and cleans up after the callback.
 */
export async function withAgentVersionEndpoint<T>(
  project: AIProjectClient,
  agentName: string,
  definition: AgentDefinitionUnion,
  callback: (agent: AgentVersion) => Promise<T>,
  options?: AgentsCreateVersionOptionalParams,
): Promise<T> {
  let createdVersion: AgentVersion | undefined;
  let originalAgentEndpoint: AgentEndpointConfig | undefined;
  let originalAgentEndpointLoaded = false;

  try {
    createdVersion = await project.agents.createVersion(agentName, definition, options);
    originalAgentEndpoint = (await project.agents.get(agentName)).agent_endpoint;
    originalAgentEndpointLoaded = true;

    await project.agents.updateAgent(agentName, {
      agentEndpoint: {
        version_selector: {
          version_selection_rules: [
            {
              type: "FixedRatio",
              agent_version: createdVersion.version,
              traffic_percentage: 100,
            },
          ],
        },
        protocol_configuration: { responses: {} },
      },
    });
    console.log(`Agent endpoint configured for version ${createdVersion.version}`);

    return await callback(createdVersion);
  } finally {
    try {
      if (originalAgentEndpointLoaded) {
        // JSON Merge Patch requires null to remove fields added by this sample.
        const clearAgentEndpointOptions: AgentsPatchAgentObjectOptionalParams = {};
        Object.assign(clearAgentEndpointOptions, { agentEndpoint: null });
        await project.agents.patchAgentObject(agentName, clearAgentEndpointOptions);
        if (originalAgentEndpoint) {
          await project.agents.patchAgentObject(agentName, {
            agentEndpoint: originalAgentEndpoint,
          });
        }
      }
    } finally {
      if (createdVersion) {
        await project.agents.deleteVersion(agentName, createdVersion.version, { force: true });
      }
    }
  }
}
