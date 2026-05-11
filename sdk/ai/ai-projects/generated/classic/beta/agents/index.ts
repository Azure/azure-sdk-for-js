// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteSessionFile,
  getSessionFiles,
  downloadSessionFile,
  uploadSessionFile,
  getSessionLogStream,
  listSessions,
  deleteSession,
  getSession,
  createSession,
  patchAgentObject,
} from "../../../api/beta/agents/operations.js";
import {
  BetaAgentsDeleteSessionFileOptionalParams,
  BetaAgentsGetSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsGetSessionLogStreamOptionalParams,
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
  SessionLogEvent,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  BetaAgentsDownloadSessionFileResponse,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /**
   * Delete a file or directory from the session sandbox.
   * If `recursive` is false (default) and the target is a non-empty directory, the API returns 409 Conflict.
   */
  deleteSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: BetaAgentsDeleteSessionFileOptionalParams,
  ) => Promise<void>;
  /**
   * List files and directories at a given path in the session sandbox.
   * Returns only the immediate children of the specified directory (non-recursive).
   */
  getSessionFiles: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: BetaAgentsGetSessionFilesOptionalParams,
  ) => Promise<SessionDirectoryListResponse>;
  /** Download a file from the session sandbox as a binary stream. */
  downloadSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: BetaAgentsDownloadSessionFileOptionalParams,
  ) => Promise<BetaAgentsDownloadSessionFileResponse>;
  /**
   * Upload a file to the session sandbox via binary stream.
   * Maximum file size is 50 MB. Uploads exceeding this limit return 413 Payload Too Large.
   */
  uploadSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    content: Uint8Array,
    options?: BetaAgentsUploadSessionFileOptionalParams,
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
    options?: BetaAgentsGetSessionLogStreamOptionalParams,
  ) => Promise<SessionLogEvent>;
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
    deleteSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: BetaAgentsDeleteSessionFileOptionalParams,
    ) => deleteSessionFile(context, agentName, agentSessionId, path, options),
    getSessionFiles: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: BetaAgentsGetSessionFilesOptionalParams,
    ) => getSessionFiles(context, agentName, agentSessionId, path, options),
    downloadSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: BetaAgentsDownloadSessionFileOptionalParams,
    ) => downloadSessionFile(context, agentName, agentSessionId, path, options),
    uploadSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      content: Uint8Array,
      options?: BetaAgentsUploadSessionFileOptionalParams,
    ) => uploadSessionFile(context, agentName, agentSessionId, path, content, options),
    getSessionLogStream: (
      agentName: string,
      agentVersion: string,
      sessionId: string,
      options?: BetaAgentsGetSessionLogStreamOptionalParams,
    ) => getSessionLogStream(context, agentName, agentVersion, sessionId, options),
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
