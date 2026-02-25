// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  listVersions,
  deleteVersion,
  getVersion,
  createAgentVersionFromManifest,
  createVersion,
  list,
  $delete,
  updateAgentFromManifest,
  createAgentFromManifest,
  update,
  create,
  get,
} from "../../api/agents/operations.js";
import {
  AgentsListVersionsOptionalParams,
  AgentsDeleteVersionOptionalParams,
  AgentsGetVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateVersionOptionalParams,
  AgentsListOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
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
    options?: AgentsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersion>;
  /** Deletes a specific version of an agent. */
  deleteVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsDeleteVersionOptionalParams,
  ) => Promise<DeleteAgentVersionResponse>;
  /** Retrieves a specific version of an agent. */
  getVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsGetVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Create a new agent version. */
  createVersion(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateOptionalParams,
  ): Promise<AgentVersion>;
  /** Create a new agent version from a manifest. */
  createVersion(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ): Promise<AgentVersion>;
  /** Returns the list of all agents. */
  list: (options?: AgentsListOptionalParams) => PagedAsyncIterableIterator<Agent>;
  /** Deletes an agent. */
  delete: (agentName: string, options?: AgentsDeleteOptionalParams) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateOptionalParams,
  ): Promise<Agent>;
  /** Creates the agent. */
  create(
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateOptionalParams,
  ): Promise<Agent>;
  /** Creates an agent from a manifest. */
  create(
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    listVersions: (agentName: string, options?: AgentsListVersionsOptionalParams) =>
      listVersions(context, agentName, options),
    deleteVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsDeleteVersionOptionalParams,
    ) => deleteVersion(context, agentName, agentVersion, options),
    getVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsGetVersionOptionalParams,
    ) => getVersion(context, agentName, agentVersion, options),
    createVersion(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateVersionOptionalParams | Record<string, unknown>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ): Promise<AgentVersion> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentVersionFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, unknown>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return createVersion(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateVersionOptionalParams | undefined,
      );
    },
    list: (options?: AgentsListOptionalParams) => list(context, options),
    delete: (agentName: string, options?: AgentsDeleteOptionalParams) =>
      $delete(context, agentName, options),
    update(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsUpdateOptionalParams | Record<string, unknown>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return updateAgentFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, unknown>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return update(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsUpdateOptionalParams | undefined,
      );
    },
    create(
      name: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateOptionalParams | Record<string, unknown>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentFromManifest(
          context,
          name,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, unknown>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return create(
        context,
        name,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateOptionalParams | undefined,
      );
    },
    get: (agentName: string, options?: AgentsGetOptionalParams) => get(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
