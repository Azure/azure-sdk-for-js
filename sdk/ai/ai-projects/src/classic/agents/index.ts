// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  listSessions,
  deleteSession,
  getSession,
  createSession,
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
  updateFromCode,
  update,
  createFromCode,
  create,
  get,
} from "../../api/agents/operations.js";
import type {
  AgentsListSessionsOptionalParams,
  AgentsDeleteSessionOptionalParams,
  AgentsGetSessionOptionalParams,
  AgentsCreateSessionOptionalParams,
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
  AgentsUpdateFromCodeOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateFromCodeOptionalParams,
  AgentsCreateOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import type {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  CreateAgentFromCodeContent,
  CreateAgentVersionFromCodeContent,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
  VersionIndicatorUnion,
  AgentSessionResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Returns a list of sessions for the specified agent. */
  listSessions: (
    agentName: string,
    options?: AgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /**
   * Deletes a session synchronously.
   * Returns 204 No Content when the session is deleted or does not exist.
   */
  deleteSession: (
    agentName: string,
    sessionId: string,
    isolationKey: string,
    options?: AgentsDeleteSessionOptionalParams,
  ) => Promise<void>;
  /** Retrieves a session by ID. */
  getSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsGetSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /**
   * Creates a new session for an agent endpoint.
   * The endpoint resolves the backing agent version from `version_indicator` and
   * enforces session ownership using the provided isolation key for session-mutating operations.
   */
  createSession: (
    agentName: string,
    isolationKey: string,
    versionIndicator: VersionIndicatorUnion,
    options?: AgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
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
    parameterValues: Record<string, unknown>,
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
    parameterValues: Record<string, unknown>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /**
   * Updates a code-based agent by uploading new code and creating a new version.
   * If the code and definition are unchanged (matched by x-ms-code-zip-sha256 header), returns the existing version.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  updateFromCode: (
    agentName: string,
    codeZipSha256: string,
    body: CreateAgentVersionFromCodeContent,
    options?: AgentsUpdateFromCodeOptionalParams,
  ) => Promise<Agent>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateOptionalParams,
  ): Promise<Agent>;
  /**
   * Creates a new code-based agent. Uploads the code zip and creates the agent in a single call.
   * The agent name is provided in the `x-ms-agent-name` header since POST /agents has no name in the URL path.
   * The SHA-256 hex digest of the zip is provided in the `x-ms-code-zip-sha256` header for integrity and dedup.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  createFromCode: (
    agentName: string,
    codeZipSha256: string,
    body: CreateAgentFromCodeContent,
    options?: AgentsCreateFromCodeOptionalParams,
  ) => Promise<Agent>;
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
    parameterValues: Record<string, unknown>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    listSessions: (agentName: string, options?: AgentsListSessionsOptionalParams) =>
      listSessions(context, agentName, options),
    deleteSession: (
      agentName: string,
      sessionId: string,
      isolationKey: string,
      options?: AgentsDeleteSessionOptionalParams,
    ) => deleteSession(context, agentName, sessionId, isolationKey, options),
    getSession: (agentName: string, sessionId: string, options?: AgentsGetSessionOptionalParams) =>
      getSession(context, agentName, sessionId, options),
    createSession: (
      agentName: string,
      isolationKey: string,
      versionIndicator: VersionIndicatorUnion,
      options?: AgentsCreateSessionOptionalParams,
    ) => createSession(context, agentName, isolationKey, versionIndicator, options),
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
    updateFromCode: (
      agentName: string,
      codeZipSha256: string,
      body: CreateAgentVersionFromCodeContent,
      options?: AgentsUpdateFromCodeOptionalParams,
    ) => updateFromCode(context, agentName, codeZipSha256, body, options),
    createFromCode: (
      agentName: string,
      codeZipSha256: string,
      body: CreateAgentFromCodeContent,
      options?: AgentsCreateFromCodeOptionalParams,
    ) => createFromCode(context, agentName, codeZipSha256, body, options),
    get: (agentName: string, options?: AgentsGetOptionalParams) => get(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
