// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  deleteSessionFile,
  listSessionFiles,
  downloadSessionFile,
  uploadSessionFile,
  getSessionLogStream,
  listSessions,
  stopSession,
  deleteSession,
  getSession,
  createSession,
  disable,
  enable,
  downloadAgentCode,
  createVersionFromCode,
  updateAgentObject,
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
import type {
  AgentsDeleteSessionFileOptionalParams,
  AgentsListSessionFilesOptionalParams,
  AgentsDownloadSessionFileOptionalParams,
  AgentsUploadSessionFileOptionalParams,
  AgentsGetSessionLogStreamOptionalParams,
  AgentsListSessionsOptionalParams,
  AgentsStopSessionOptionalParams,
  AgentsDeleteSessionOptionalParams,
  AgentsGetSessionOptionalParams,
  AgentsCreateSessionOptionalParams,
  AgentsDisableOptionalParams,
  AgentsEnableOptionalParams,
  AgentsDownloadAgentCodeOptionalParams,
  AgentsCreateVersionFromCodeOptionalParams,
  AgentsUpdateAgentObjectOptionalParams,
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
import type {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryEntry,
  AgentsDownloadSessionFileResponse,
  AgentsDownloadAgentCodeResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /**
   * Deletes the specified file or directory from the session sandbox.
   * When `recursive` is false, deleting a non-empty directory returns 409 Conflict.
   */
  deleteSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: AgentsDeleteSessionFileOptionalParams,
  ) => Promise<void>;
  /**
   * Returns files and directories at the specified path in the session sandbox.
   * The response includes only the immediate children of the target directory and defaults to the session home directory when no path is supplied.
   */
  listSessionFiles: (
    agentName: string,
    sessionId: string,
    options?: AgentsListSessionFilesOptionalParams,
  ) => PagedAsyncIterableIterator<SessionDirectoryEntry>;
  /**
   * Downloads the file at the specified sandbox path as a binary stream.
   * The path is resolved relative to the session home directory.
   */
  downloadSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: AgentsDownloadSessionFileOptionalParams,
  ) => Promise<AgentsDownloadSessionFileResponse>;
  /**
   * Uploads binary file content to the specified path in the session sandbox.
   * The service stores the file relative to the session home directory and rejects payloads larger than 50 MB.
   */
  uploadSessionFile: (
    agentName: string,
    sessionId: string,
    path: string,
    content: Uint8Array,
    options?: AgentsUploadSessionFileOptionalParams,
  ) => Promise<SessionFileWriteResponse>;
  /**
   * Streams console logs (stdout / stderr) for a specific hosted agent session
   * as a Server-Sent Events (SSE) stream.
   *
   * Each SSE frame contains:
   * - `event`: always `"log"`
   * - `data`: a plain-text log line (currently JSON-formatted, but the schema
   * is not contractual and may include additional keys or change format
   * over time — clients should treat it as an opaque string)
   *
   * Example SSE frames:
   * ```
   * event: log
   * data: {"timestamp":"2026-03-10T09:33:17.121Z","stream":"stdout","message":"Starting FoundryCBAgent server on port 8088"}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:33:17.130Z","stream":"stderr","message":"INFO: Application startup complete."}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:34:52.714Z","stream":"status","message":"Successfully connected to container"}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:35:52.714Z","stream":"status","message":"No logs since last 60 seconds"}
   * ```
   *
   * The stream remains open until the client disconnects or the server
   * terminates the connection. Clients should handle reconnection as needed.
   */
  getSessionLogStream: (
    agentName: string,
    agentVersion: string,
    sessionId: string,
    options?: AgentsGetSessionLogStreamOptionalParams,
  ) => Promise<AgentsDownloadSessionFileResponse>;
  /** Returns a paged collection of sessions associated with the specified agent endpoint. */
  listSessions: (
    agentName: string,
    options?: AgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /** Terminates the specified hosted agent session and returns 204 No Content when the request succeeds. */
  stopSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsStopSessionOptionalParams,
  ) => Promise<void>;
  /**
   * Deletes a session synchronously.
   * Returns 204 No Content when the session is deleted or does not exist.
   */
  deleteSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsDeleteSessionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the details of a hosted agent session by agent name and session identifier. */
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
    versionIndicator: VersionIndicatorUnion,
    options?: AgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /**
   * Disables the specified agent, preventing it from accepting new sessions or processing requests.
   * Existing active sessions are allowed to drain gracefully but no new sessions can be created.
   * This operation is idempotent — disabling an already-disabled agent returns success with no side effects.
   */
  disable: (agentName: string, options?: AgentsDisableOptionalParams) => Promise<void>;
  /**
   * Enables the specified agent, allowing it to accept new sessions and process requests.
   * This operation is idempotent — enabling an already-enabled agent returns success with no side effects.
   */
  enable: (agentName: string, options?: AgentsEnableOptionalParams) => Promise<void>;
  /**
   * Downloads the code zip for a code-based hosted agent.
   * Returns the previously-uploaded zip (`application/zip`).
   *
   * If `agent_version` is supplied, returns that version's code zip; otherwise
   * returns the latest version's code zip.
   *
   * The SHA-256 digest of the returned bytes matches the `content_hash` on the
   * resolved version's `code_configuration`.
   */
  downloadAgentCode: (
    agentName: string,
    options?: AgentsDownloadAgentCodeOptionalParams,
  ) => Promise<AgentsDownloadAgentCodeResponse>;
  /**
   * Creates a new agent version from code. Uploads the code zip and creates a new version
   * for an existing agent. The SHA-256 hex digest of the zip is provided in the
   * `x-ms-code-zip-sha256` header for integrity and dedup.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  createVersionFromCode: (
    agentName: string,
    codeZipSha256: string,
    content: CreateAgentVersionFromCodeContent,
    options?: AgentsCreateVersionFromCodeOptionalParams,
  ) => Promise<AgentVersion>;
  /** Applies a merge-patch update to the specified agent endpoint configuration. */
  updateAgent: (
    agentName: string,
    options?: AgentsUpdateAgentObjectOptionalParams,
  ) => Promise<Agent>;
  /** Returns the list of versions of an agent. */
  listVersions: (
    agentName: string,
    options?: AgentsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersion>;
  /**
   * Deletes a specific version of an agent. For hosted agents, if the version has active
   * sessions, the request is rejected with HTTP 409 unless `force` is set to true. When
   * force is true, all sessions associated with this version are cascade-deleted.
   */
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
    options?: AgentsCreateVersionOptionalParams,
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
  /**
   * Deletes an agent. For hosted agents, if any version has active sessions, the request
   * is rejected with HTTP 409 unless `force` is set to true. When force is true, all
   * associated sessions are cascade-deleted along with the agent and its versions.
   */
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
    parameterValues: Record<string, unknown>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    deleteSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: AgentsDeleteSessionFileOptionalParams,
    ) => deleteSessionFile(context, agentName, sessionId, path, options),
    listSessionFiles: (
      agentName: string,
      sessionId: string,
      options?: AgentsListSessionFilesOptionalParams,
    ) => listSessionFiles(context, agentName, sessionId, options),
    downloadSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: AgentsDownloadSessionFileOptionalParams,
    ) => downloadSessionFile(context, agentName, sessionId, path, options),
    uploadSessionFile: (
      agentName: string,
      sessionId: string,
      path: string,
      content: Uint8Array,
      options?: AgentsUploadSessionFileOptionalParams,
    ) => uploadSessionFile(context, agentName, sessionId, path, content, options),
    getSessionLogStream: (
      agentName: string,
      agentVersion: string,
      sessionId: string,
      options?: AgentsGetSessionLogStreamOptionalParams,
    ) => getSessionLogStream(context, agentName, agentVersion, sessionId, options),
    listSessions: (agentName: string, options?: AgentsListSessionsOptionalParams) =>
      listSessions(context, agentName, options),
    stopSession: (
      agentName: string,
      sessionId: string,
      options?: AgentsStopSessionOptionalParams,
    ) => stopSession(context, agentName, sessionId, options),
    deleteSession: (
      agentName: string,
      sessionId: string,
      options?: AgentsDeleteSessionOptionalParams,
    ) => deleteSession(context, agentName, sessionId, options),
    getSession: (agentName: string, sessionId: string, options?: AgentsGetSessionOptionalParams) =>
      getSession(context, agentName, sessionId, options),
    createSession: (
      agentName: string,
      versionIndicator: VersionIndicatorUnion,
      options?: AgentsCreateSessionOptionalParams,
    ) => createSession(context, agentName, versionIndicator, options),
    disable: (agentName: string, options?: AgentsDisableOptionalParams) =>
      disable(context, agentName, options),
    enable: (agentName: string, options?: AgentsEnableOptionalParams) =>
      enable(context, agentName, options),
    downloadAgentCode: (agentName: string, options?: AgentsDownloadAgentCodeOptionalParams) =>
      downloadAgentCode(context, agentName, options),
    createVersionFromCode: (
      agentName: string,
      codeZipSha256: string,
      content: CreateAgentVersionFromCodeContent,
      options?: AgentsCreateVersionFromCodeOptionalParams,
    ) => createVersionFromCode(context, agentName, codeZipSha256, content, options),
    updateAgent: (agentName: string, options?: AgentsUpdateAgentObjectOptionalParams) =>
      updateAgentObject(context, agentName, options),
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
