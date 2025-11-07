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
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateAgentVersionOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsGetAgentOptionalParams,
} from "../../api/agents/options.js";
import {
  AgentObject,
  AgentVersionObject,
  AgentDefinitionUnion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Returns the list of versions of an agent. */
  listAgentVersions: (
    agentName: string,
    options?: AgentsListAgentVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersionObject>;
  /** Deletes a specific version of an agent. */
  deleteAgentVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsDeleteAgentVersionOptionalParams,
  ) => Promise<DeleteAgentVersionResponse>;
  /** Retrieves a specific version of an agent. */
  getAgentVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsGetAgentVersionOptionalParams,
  ) => Promise<AgentVersionObject>;
  /** Create a new agent version from a manifest. */
  createAgentVersionFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ) => Promise<AgentVersionObject>;
  /** Create a new agent version. */
  createAgentVersion: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentVersionOptionalParams,
  ) => Promise<AgentVersionObject>;
  /** Returns the list of all agents. */
  listAgents: (options?: AgentsListAgentsOptionalParams) => PagedAsyncIterableIterator<AgentObject>;
  /** Deletes an agent. */
  deleteAgent: (
    agentName: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgentFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ) => Promise<AgentObject>;
  /** Creates an agent from a manifest. */
  createAgentFromManifest: (
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ) => Promise<AgentObject>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgent: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<AgentObject>;
  /** Creates the agent. */
  createAgent: (
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<AgentObject>;
  /** Retrieves the agent. */
  getAgent: (agentName: string, options?: AgentsGetAgentOptionalParams) => Promise<AgentObject>;
}

function _getAgents(context: AIProjectContext) {
  return {
    listAgentVersions: (agentName: string, options?: AgentsListAgentVersionsOptionalParams) =>
      listAgentVersions(context, agentName, options),
    deleteAgentVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsDeleteAgentVersionOptionalParams,
    ) => deleteAgentVersion(context, agentName, agentVersion, options),
    getAgentVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsGetAgentVersionOptionalParams,
    ) => getAgentVersion(context, agentName, agentVersion, options),
    createAgentVersionFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ) => createAgentVersionFromManifest(context, agentName, manifestId, parameterValues, options),
    createAgentVersion: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentVersionOptionalParams,
    ) => createAgentVersion(context, agentName, definition, options),
    listAgents: (options?: AgentsListAgentsOptionalParams) => listAgents(context, options),
    deleteAgent: (agentName: string, options?: AgentsDeleteAgentOptionalParams) =>
      deleteAgent(context, agentName, options),
    updateAgentFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ) => updateAgentFromManifest(context, agentName, manifestId, parameterValues, options),
    createAgentFromManifest: (
      name: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ) => createAgentFromManifest(context, name, manifestId, parameterValues, options),
    updateAgent: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, agentName, definition, options),
    createAgent: (
      name: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentOptionalParams,
    ) => createAgent(context, name, definition, options),
    getAgent: (agentName: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
