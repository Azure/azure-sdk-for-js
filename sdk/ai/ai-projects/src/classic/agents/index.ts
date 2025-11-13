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
<<<<<<< HEAD
  CreateAgentConfig,
  UpdateAgentConfig,
  CreateAgentVersionConfig,
=======
  AgentsCreateAgentOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
>>>>>>> main
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
<<<<<<< HEAD
=======
  AgentDefinitionUnion,
>>>>>>> main
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
<<<<<<< HEAD
  /** Create a new agent version. */
  createVersion: (agentName: string, config: CreateAgentVersionConfig) => Promise<AgentVersion>;
=======
  /** Create a new agent version from a definition. */
  createVersion(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentVersionOptionalParams,
  ): Promise<AgentVersion>;
  /** Create a new agent version from a manifest. */
  createVersion(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ): Promise<AgentVersion>;
>>>>>>> main
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
<<<<<<< HEAD
  update: (agentName: string, config: UpdateAgentConfig) => Promise<Agent>;
  /** Creates an agent. */
  create: (name: string, config: CreateAgentConfig) => Promise<Agent>;
=======
  update(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ): Promise<Agent>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Creates an agent from a definition. */
  create(
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ): Promise<Agent>;
  /** Creates an agent from a manifest. */
  create(
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
>>>>>>> main
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
<<<<<<< HEAD
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
=======
    createVersion(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateAgentVersionOptionalParams | Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ): Promise<AgentVersion> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentVersionFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return createAgentVersion(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateAgentVersionOptionalParams | undefined,
      );
>>>>>>> main
    },
    list: (options?: AgentsListAgentsOptionalParams) => listAgents(context, options),
    delete: (agentName: string, options?: AgentsDeleteAgentOptionalParams) =>
      deleteAgent(context, agentName, options),
<<<<<<< HEAD
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
=======
    update(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsUpdateAgentOptionalParams | Record<string, any>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return updateAgentFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return updateAgent(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsUpdateAgentOptionalParams | undefined,
      );
    },
    create(
      name: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateAgentOptionalParams | Record<string, any>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentFromManifest(
          context,
          name,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return createAgent(
        context,
        name,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateAgentOptionalParams | undefined,
      );
>>>>>>> main
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
