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
  listVersions: (
    agentName: string,
    options?: AgentsListAgentVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersionObject>;
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
  ) => Promise<AgentVersionObject>;
  /** Create a new agent version from a manifest. */
  createVersionFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ) => Promise<AgentVersionObject>;
  /** Create a new agent version. */
  createVersion: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentVersionOptionalParams,
  ) => Promise<AgentVersionObject>;
  /** Returns the list of all agents. */
  list: (options?: AgentsListAgentsOptionalParams) => PagedAsyncIterableIterator<AgentObject>;
  /** Deletes an agent. */
  delete: (
    agentName: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ) => Promise<AgentObject>;
  /** Creates an agent from a manifest. */
  createFromManifest: (
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ) => Promise<AgentObject>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<AgentObject>;
  /** Creates the agent. */
  create: (
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<AgentObject>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetAgentOptionalParams) => Promise<AgentObject>;
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
    createVersionFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ) => createAgentVersionFromManifest(context, agentName, manifestId, parameterValues, options),
    createVersion: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentVersionOptionalParams,
    ) => createAgentVersion(context, agentName, definition, options),
    list: (options?: AgentsListAgentsOptionalParams) => listAgents(context, options),
    delete: (agentName: string, options?: AgentsDeleteAgentOptionalParams) =>
      deleteAgent(context, agentName, options),
    updateFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ) => updateAgentFromManifest(context, agentName, manifestId, parameterValues, options),
    createFromManifest: (
      name: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ) => createAgentFromManifest(context, name, manifestId, parameterValues, options),
    update: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, agentName, definition, options),
    create: (
      name: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentOptionalParams,
    ) => createAgent(context, name, definition, options),
    get: (agentName: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
