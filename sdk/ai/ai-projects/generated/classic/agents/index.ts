// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  createAgentVersionFromCode,
  patchAgentObject,
  listVersions,
  deleteVersion,
  getVersion,
  createAgentVersionFromManifest,
  createVersion,
  list,
  $delete,
  updateAgentFromManifest,
  createAgentFromManifest,
  updateAgentFromCode,
  updateAgent,
  createAgentFromCode,
  createAgent,
  get,
} from "../../api/agents/operations.js";
import {
  AgentsCreateAgentVersionFromCodeOptionalParams,
  AgentsPatchAgentObjectOptionalParams,
  AgentsListVersionsOptionalParams,
  AgentsDeleteVersionOptionalParams,
  AgentsGetVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateVersionOptionalParams,
  AgentsListOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentFromCodeOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsCreateAgentFromCodeOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  CreateAgentFromCodeContent,
  CreateAgentVersionFromCodeContent,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  createAgentVersionFromCode: (
    agentName: string,
    codeZipSha256: string,
    body: CreateAgentVersionFromCodeContent,
    options?: AgentsCreateAgentVersionFromCodeOptionalParams,
  ) => Promise<AgentVersion>;
  /** Updates an agent endpoint. */
  patchAgentObject: (
    agentName: string,
    options?: AgentsPatchAgentObjectOptionalParams,
  ) => Promise<Agent>;
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
  /** Create a new agent version from a manifest. */
  createAgentVersionFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ) => Promise<AgentVersion>;
  /** Create a new agent version. */
  createVersion: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Returns the list of all agents. */
  list: (options?: AgentsListOptionalParams) => PagedAsyncIterableIterator<Agent>;
  /** Deletes an agent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (agentName: string, options?: AgentsDeleteOptionalParams) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgentFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ) => Promise<Agent>;
  /** Creates an agent from a manifest. */
  createAgentFromManifest: (
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ) => Promise<Agent>;
  /**
   * Updates a code-based agent by uploading new code and creating a new version.
   * If the code and definition are unchanged (matched by x-ms-code-zip-sha256 header), returns the existing version.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  updateAgentFromCode: (
    agentName: string,
    codeZipSha256: string,
    body: CreateAgentVersionFromCodeContent,
    options?: AgentsUpdateAgentFromCodeOptionalParams,
  ) => Promise<Agent>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgent: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<Agent>;
  /**
   * Creates a new code-based agent. Uploads the code zip and creates the agent in a single call.
   * The agent name is provided in the `x-ms-agent-name` header since POST /agents has no name in the URL path.
   * The SHA-256 hex digest of the zip is provided in the `x-ms-code-zip-sha256` header for integrity and dedup.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  createAgentFromCode: (
    agentName: string,
    codeZipSha256: string,
    body: CreateAgentFromCodeContent,
    options?: AgentsCreateAgentFromCodeOptionalParams,
  ) => Promise<Agent>;
  /** Creates the agent. */
  createAgent: (
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    createAgentVersionFromCode: (
      agentName: string,
      codeZipSha256: string,
      body: CreateAgentVersionFromCodeContent,
      options?: AgentsCreateAgentVersionFromCodeOptionalParams,
    ) => createAgentVersionFromCode(context, agentName, codeZipSha256, body, options),
    patchAgentObject: (agentName: string, options?: AgentsPatchAgentObjectOptionalParams) =>
      patchAgentObject(context, agentName, options),
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
    createAgentVersionFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ) => createAgentVersionFromManifest(context, agentName, manifestId, parameterValues, options),
    createVersion: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateVersionOptionalParams,
    ) => createVersion(context, agentName, definition, options),
    list: (options?: AgentsListOptionalParams) => list(context, options),
    delete: (agentName: string, options?: AgentsDeleteOptionalParams) =>
      $delete(context, agentName, options),
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
    updateAgentFromCode: (
      agentName: string,
      codeZipSha256: string,
      body: CreateAgentVersionFromCodeContent,
      options?: AgentsUpdateAgentFromCodeOptionalParams,
    ) => updateAgentFromCode(context, agentName, codeZipSha256, body, options),
    updateAgent: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, agentName, definition, options),
    createAgentFromCode: (
      agentName: string,
      codeZipSha256: string,
      body: CreateAgentFromCodeContent,
      options?: AgentsCreateAgentFromCodeOptionalParams,
    ) => createAgentFromCode(context, agentName, codeZipSha256, body, options),
    createAgent: (
      name: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentOptionalParams,
    ) => createAgent(context, name, definition, options),
    get: (agentName: string, options?: AgentsGetOptionalParams) => get(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
