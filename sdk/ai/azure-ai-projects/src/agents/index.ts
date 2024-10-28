
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { AgentsCreateAgentParameters, AgentsDeleteAgentParameters, AgentsGetAgentParameters, AgentsListAgentsParameters, AgentsUpdateAgentParameters } from "../generated/src/parameters.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";

export interface AgentsOperations {
    /** Creates a new agent. */
    createAgent: (
      options: AgentsCreateAgentParameters,
    ) => Promise<AgentOutput>;
    /** Gets a list of agents that were previously created. */
    listAgents: (
      options?: AgentsListAgentsParameters,
    ) => Promise<OpenAIPageableListOfAgentOutput>;
    /** Retrieves an existing agent. */
    getAgent: (
      assistantId: string,
      options?: AgentsGetAgentParameters,
    ) => Promise<AgentOutput>;
    /** Modifies an existing agent. */
    updateAgent: (
      assistantId: string,
      options?: AgentsUpdateAgentParameters,
    ) => Promise<AgentOutput>;
    /** Deletes an agent. */
    deleteAgent: (
      assistantId: string,
      options?: AgentsDeleteAgentParameters,
    ) => Promise<AgentDeletionStatusOutput>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function getAgents(context: Client)  {
    return {
      createAgent: (options: AgentsCreateAgentParameters) =>
        createAgent(context, options),
      listAgents: (options?: AgentsListAgentsParameters) =>
        listAgents(context, options),
      getAgent: (assistantId: string, options?: AgentsGetAgentParameters) =>
        getAgent(context, assistantId, options),
      updateAgent: (
        assistantId: string,
        options?: AgentsUpdateAgentParameters,
      ) => updateAgent(context, assistantId, options),
      deleteAgent: (
        assistantId: string,
        options?: AgentsDeleteAgentParameters,
      ) => deleteAgent(context, assistantId, options),
    };
}

export function getAgentsOperations(context: Client): AgentsOperations {
    return {
     ...getAgents(context),
    };
}
