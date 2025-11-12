// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  listAgentVersions,
  deleteAgentVersion,
  getAgentVersion,
  createAgentVersionFromManifest,
  createAgentVersion,
  listAgents,
  deleteAgent,
  updateAgentFromManifest,
  createAgentFromManifest,
  updateAgent,
  createAgent,
  getAgent,
} from "../../api/agents/operations.js";
import {
  AgentsListAgentVersionsOptionalParams,
  AgentsDeleteAgentVersionOptionalParams,
  AgentsGetAgentVersionOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsGetAgentOptionalParams,
  CreateAgentConfig,
  UpdateAgentConfig,
  CreateAgentVersionConfig,
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Returns the list of versions of an agent. */
  listVersions: (
    agentName: string,
    options?: AgentsListAgentVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersion>;
  /** Deletes a specific version of an agent. */
  deleteVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsDeleteAgentVersionOptionalParams,
  ) => Promise<DeleteAgentVersionResponse>;
  /** Retrieves a specific version of an agent. */
  getVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsGetAgentVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Create a new agent version. */
  createVersion: (agentName: string, config: CreateAgentVersionConfig) => Promise<AgentVersion>;
  /** Returns the list of all agents. */
  list: (options?: AgentsListAgentsOptionalParams) => PagedAsyncIterableIterator<Agent>;
  /** Deletes an agent. */
  delete: (
    agentName: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update: (agentName: string, config: UpdateAgentConfig) => Promise<Agent>;
  /** Creates an agent. */
  create: (name: string, config: CreateAgentConfig) => Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetAgentOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    listVersions: (agentName: string, options?: AgentsListAgentVersionsOptionalParams) =>
      listAgentVersions(context, agentName, options),
    deleteVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsDeleteAgentVersionOptionalParams,
    ) => deleteAgentVersion(context, agentName, agentVersion, options),
    getVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsGetAgentVersionOptionalParams,
    ) => getAgentVersion(context, agentName, agentVersion, options),
    createVersion: (agentName: string, config: CreateAgentVersionConfig): Promise<AgentVersion> => {
      if (config.type === "definition") {
        return createAgentVersion(context, agentName, config.definition, config.options);
      } else {
        return createAgentVersionFromManifest(
          context,
          agentName,
          config.manifestId,
          config.parameterValues,
          config.options,
        );
      }
    },
    list: (options?: AgentsListAgentsOptionalParams) => listAgents(context, options),
    delete: (agentName: string, options?: AgentsDeleteAgentOptionalParams) =>
      deleteAgent(context, agentName, options),
    update: (agentName: string, config: UpdateAgentConfig): Promise<Agent> => {
      if (config.type === "definition") {
        return updateAgent(context, agentName, config.definition, config.options);
      } else {
        return updateAgentFromManifest(
          context,
          agentName,
          config.manifestId,
          config.parameterValues,
          config.options,
        );
      }
    },
    create: (name: string, config: CreateAgentConfig): Promise<Agent> => {
      if (config.type === "definition") {
        return createAgent(context, name, config.definition, config.options);
      } else {
        return createAgentFromManifest(
          context,
          name,
          config.manifestId,
          config.parameterValues,
          config.options,
        );
      }
    },
    get: (agentName: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
