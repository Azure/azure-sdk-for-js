// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  listManagedIdentityBlueprints,
  deleteManagedIdentityBlueprint,
  getManagedIdentityBlueprint,
  createOrUpdateManagedIdentityBlueprint,
  deleteSessionFile,
  listSessionFiles,
  downloadSessionFile,
  uploadSessionFile,
  listSessions,
  deleteSession,
  getSession,
  createSession,
  patchAgentObject,
} from "../../../api/beta/agents/operations.js";
import {
  ListManagedIdentityBlueprintsOptionalParams,
  DeleteManagedIdentityBlueprintOptionalParams,
  GetManagedIdentityBlueprintOptionalParams,
  CreateOrUpdateManagedIdentityBlueprintOptionalParams,
  BetaAgentsDeleteSessionFileOptionalParams,
  BetaAgentsListSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsListSessionsOptionalParams,
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
} from "../../../api/beta/agents/options.js";
import {
  Agent,
  VersionIndicatorUnion,
  AgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  ManagedAgentIdentityBlueprint,
  PagedManagedAgentIdentityBlueprint,
  BetaAgentsDownloadSessionFileResponse,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  listManagedIdentityBlueprints: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    options?: ListManagedIdentityBlueprintsOptionalParams,
  ) => Promise<PagedManagedAgentIdentityBlueprint>;
  /** Deletes a managed agent identity blueprint by name. */
  deleteManagedIdentityBlueprint: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    options?: DeleteManagedIdentityBlueprintOptionalParams,
  ) => Promise<void>;
  /** Retrieves a managed agent identity blueprint by name. */
  getManagedIdentityBlueprint: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    options?: GetManagedIdentityBlueprintOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
  createOrUpdateManagedIdentityBlueprint: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    name: string,
    options?: CreateOrUpdateManagedIdentityBlueprintOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
  /**
   * Delete a file or directory from the session sandbox.
   * If `recursive` is false (default) and the target is a non-empty directory, the API returns 409 Conflict.
   */
  deleteSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentsDeleteSessionFileOptionalParams,
  ) => Promise<void>;
  /**
   * List files and directories at a given path in the session sandbox.
   * Returns only the immediate children of the specified directory (non-recursive).
   */
  listSessionFiles: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentsListSessionFilesOptionalParams,
  ) => Promise<SessionDirectoryListResponse>;
  /** Download a file from the session sandbox as a binary stream. */
  downloadSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentsDownloadSessionFileOptionalParams,
  ) => Promise<BetaAgentsDownloadSessionFileResponse>;
  /**
   * Upload a file to the session sandbox via binary stream.
   * Maximum file size is 50 MB. Uploads exceeding this limit return 413 Payload Too Large.
   */
  uploadSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    content: Uint8Array,
    options?: BetaAgentsUploadSessionFileOptionalParams,
  ) => Promise<SessionFileWriteResponse>;
  /** Returns a list of sessions for the specified agent. */
  listSessions: (
    agentName: string,
    options?: BetaAgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /**
   * Deletes a session synchronously.
   * Returns 204 No Content when the session is deleted or does not exist.
   */
  deleteSession: (
    agentName: string,
    sessionId: string,
    isolationKey: string,
    options?: BetaAgentsDeleteSessionOptionalParams,
  ) => Promise<void>;
  /** Retrieves a session by ID. */
  getSession: (
    agentName: string,
    sessionId: string,
    options?: BetaAgentsGetSessionOptionalParams,
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
    options?: BetaAgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /** Updates an agent endpoint. */
  patchAgentObject: (
    agentName: string,
    options?: BetaAgentsPatchAgentObjectOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    listManagedIdentityBlueprints: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      options?: ListManagedIdentityBlueprintsOptionalParams,
    ) => listManagedIdentityBlueprints(context, foundryFeatures, options),
    deleteManagedIdentityBlueprint: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      options?: DeleteManagedIdentityBlueprintOptionalParams,
    ) => deleteManagedIdentityBlueprint(context, foundryFeatures, blueprintName, options),
    getManagedIdentityBlueprint: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      options?: GetManagedIdentityBlueprintOptionalParams,
    ) => getManagedIdentityBlueprint(context, foundryFeatures, blueprintName, options),
    createOrUpdateManagedIdentityBlueprint: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      name: string,
      options?: CreateOrUpdateManagedIdentityBlueprintOptionalParams,
    ) =>
      createOrUpdateManagedIdentityBlueprint(
        context,
        foundryFeatures,
        blueprintName,
        name,
        options,
      ),
    deleteSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentsDeleteSessionFileOptionalParams,
    ) => deleteSessionFile(context, agentName, sessionId, path, options),
    listSessionFiles: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentsListSessionFilesOptionalParams,
    ) => listSessionFiles(context, agentName, sessionId, path, options),
    downloadSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentsDownloadSessionFileOptionalParams,
    ) => downloadSessionFile(context, agentName, sessionId, path, options),
    uploadSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      content: Uint8Array,
      options?: BetaAgentsUploadSessionFileOptionalParams,
    ) => uploadSessionFile(context, agentName, sessionId, path, content, options),
    listSessions: (agentName: string, options?: BetaAgentsListSessionsOptionalParams) =>
      listSessions(context, agentName, options),
    deleteSession: (
      agentName: string,
      sessionId: string,
      isolationKey: string,
      options?: BetaAgentsDeleteSessionOptionalParams,
    ) => deleteSession(context, agentName, sessionId, isolationKey, options),
    getSession: (
      agentName: string,
      sessionId: string,
      options?: BetaAgentsGetSessionOptionalParams,
    ) => getSession(context, agentName, sessionId, options),
    createSession: (
      agentName: string,
      isolationKey: string,
      versionIndicator: VersionIndicatorUnion,
      options?: BetaAgentsCreateSessionOptionalParams,
    ) => createSession(context, agentName, isolationKey, versionIndicator, options),
    patchAgentObject: (agentName: string, options?: BetaAgentsPatchAgentObjectOptionalParams) =>
      patchAgentObject(context, agentName, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
