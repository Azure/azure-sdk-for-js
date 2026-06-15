// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
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
  downloadAgentCode,
  createVersionFromCode,
  updateAgentObject,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
  BetaAgentsDeleteSessionFileOptionalParams,
  BetaAgentsListSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsGetSessionLogStreamOptionalParams,
  BetaAgentsListSessionsOptionalParams,
  BetaAgentsStopSessionOptionalParams,
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsDownloadAgentCodeOptionalParams,
  BetaAgentsCreateVersionFromCodeOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
} from "../../../api/beta/agents/options.js";
import type {
  Agent,
  AgentVersion,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryEntry,
  OptimizationJob,
  OptimizationJobListItem,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Request cancellation of a running or queued job. Returns an error if the job is already in a terminal state. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentsCancelOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<OptimizationJobListItem>;
  /** Get an optimization job by id. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: OptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /**
   * Deletes the specified file or directory from the session sandbox.
   * When `recursive` is false, deleting a non-empty directory returns 409 Conflict.
   */
  deleteSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: BetaAgentsDeleteSessionFileOptionalParams,
  ) => Promise<void>;
  /**
   * Returns files and directories at the specified path in the session sandbox.
   * The response includes only the immediate children of the target directory and defaults to the session home directory when no path is supplied.
   */
  listSessionFiles: (
    agentName: string,
    agentSessionId: string,
    options?: BetaAgentsListSessionFilesOptionalParams,
  ) => PagedAsyncIterableIterator<SessionDirectoryEntry>;
  /**
   * Downloads the file at the specified sandbox path as a binary stream.
   * The path is resolved relative to the session home directory.
   */
  downloadSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: BetaAgentsDownloadSessionFileOptionalParams,
  ) => Promise<BetaAgentsDownloadSessionFileResponse>;
  /**
   * Uploads binary file content to the specified path in the session sandbox.
   * The service stores the file relative to the session home directory and rejects payloads larger than 50 MB.
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
  ) => Promise<BetaAgentsDownloadSessionFileResponse>;
  /** Returns a paged collection of sessions associated with the specified agent endpoint. */
  listSessions: (
    agentName: string,
    options?: BetaAgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /** Terminates the specified hosted agent session and returns 204 No Content when the request succeeds. */
  stopSession: (
    agentName: string,
    sessionId: string,
    options?: BetaAgentsStopSessionOptionalParams,
  ) => Promise<void>;
  /**
   * Deletes a session synchronously.
   * Returns 204 No Content when the session is deleted or does not exist.
   */
  deleteSession: (
    agentName: string,
    sessionId: string,
    options?: BetaAgentsDeleteSessionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the details of a hosted agent session by agent name and session identifier. */
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
    versionIndicator: VersionIndicatorUnion,
    options?: BetaAgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
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
    options?: BetaAgentsDownloadAgentCodeOptionalParams,
  ) => Promise<BetaAgentsDownloadAgentCodeResponse>;
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
    options?: BetaAgentsCreateVersionFromCodeOptionalParams,
  ) => Promise<AgentVersion>;
  /** Applies a merge-patch update to the specified agent endpoint configuration. */
  updateAgent: (
    agentName: string,
    options?: BetaAgentsPatchAgentObjectOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    deleteOptimizationJob: (
      jobId: string,
      options?: BetaAgentsDeleteOptimizationJobOptionalParams,
    ) => deleteOptimizationJob(context, jobId, options),
    cancelOptimizationJob: (
      jobId: string,
      options?: BetaAgentsCancelOptimizationJobOptionalParams,
    ) => cancelOptimizationJob(context, jobId, options),
    listOptimizationJobs: (options?: BetaAgentsListOptimizationJobsOptionalParams) =>
      listOptimizationJobs(context, options),
    getOptimizationJob: (jobId: string, options?: BetaAgentsGetOptimizationJobOptionalParams) =>
      getOptimizationJob(context, jobId, options),
    createOptimizationJob: (
      job: OptimizationJob,
      options?: BetaAgentsCreateOptimizationJobOptionalParams,
    ) => createOptimizationJob(context, job, options),
    deleteSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: BetaAgentsDeleteSessionFileOptionalParams,
    ) => deleteSessionFile(context, agentName, agentSessionId, path, options),
    listSessionFiles: (
      agentName: string,
      agentSessionId: string,
      options?: BetaAgentsListSessionFilesOptionalParams,
    ) => listSessionFiles(context, agentName, agentSessionId, options),
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
    stopSession: (
      agentName: string,
      sessionId: string,
      options?: BetaAgentsStopSessionOptionalParams,
    ) => stopSession(context, agentName, sessionId, options),
    deleteSession: (
      agentName: string,
      sessionId: string,
      options?: BetaAgentsDeleteSessionOptionalParams,
    ) => deleteSession(context, agentName, sessionId, options),
    getSession: (
      agentName: string,
      sessionId: string,
      options?: BetaAgentsGetSessionOptionalParams,
    ) => getSession(context, agentName, sessionId, options),
    createSession: (
      agentName: string,
      versionIndicator: VersionIndicatorUnion,
      options?: BetaAgentsCreateSessionOptionalParams,
    ) => createSession(context, agentName, versionIndicator, options),
    downloadAgentCode: (agentName: string, options?: BetaAgentsDownloadAgentCodeOptionalParams) =>
      downloadAgentCode(context, agentName, options),
    createVersionFromCode: (
      agentName: string,
      codeZipSha256: string,
      content: CreateAgentVersionFromCodeContent,
      options?: BetaAgentsCreateVersionFromCodeOptionalParams,
    ) => createVersionFromCode(context, agentName, codeZipSha256, content, options),
    updateAgent: (agentName: string, options?: BetaAgentsPatchAgentObjectOptionalParams) =>
      updateAgentObject(context, agentName, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
