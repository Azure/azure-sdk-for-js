// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getOptimizationCandidateResults,
  getOptimizationCandidateConfig,
  getOptimizationCandidate,
  listOptimizationCandidates,
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
  deleteSession,
  getSession,
  createSession,
  downloadAgentCode,
  createAgentVersionFromCode,
  updateAgentObject,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsGetOptimizationCandidateResultsOptionalParams,
  BetaAgentsGetOptimizationCandidateConfigOptionalParams,
  BetaAgentsGetOptimizationCandidateOptionalParams,
  BetaAgentsListOptimizationCandidatesOptionalParams,
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
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsDownloadAgentCodeOptionalParams,
  BetaAgentsCreateAgentVersionFromCodeOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
} from "../../../api/beta/agents/options.js";
import type {
  Agent,
  AgentVersion,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  SessionLogEvent,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  OptimizationJob,
  OptimizationCandidate,
  AgentsPagedResultOptimizationCandidate,
  CandidateDeployConfig,
  CandidateResults,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Get full per-task evaluation results for a candidate. */
  getOptimizationCandidateResults: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentsGetOptimizationCandidateResultsOptionalParams,
  ) => Promise<CandidateResults>;
  /** Get the candidate's deploy config JSON. Used to compose `agents.create_version(...)` from a candidate. */
  getOptimizationCandidateConfig: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentsGetOptimizationCandidateConfigOptionalParams,
  ) => Promise<CandidateDeployConfig>;
  /** Get a single candidate manifest and aggregated evaluation summary. */
  getOptimizationCandidate: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentsGetOptimizationCandidateOptionalParams,
  ) => Promise<OptimizationCandidate>;
  /** List candidates produced by a job. */
  listOptimizationCandidates: (
    jobId: string,
    options?: BetaAgentsListOptimizationCandidatesOptionalParams,
  ) => Promise<AgentsPagedResultOptimizationCandidate>;
  /** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Request cancellation. Idempotent on terminal states. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentsCancelOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional `status` / `agent_name` filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<OptimizationJob>;
  /** Get an optimization job by id. Emits `Retry-After` while the job is non-terminal. */
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
    versionIndicator: VersionIndicatorUnion,
    options?: BetaAgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /**
   * Download the code zip for a code-based hosted agent.
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
  createVersionFromCode: (
    agentName: string,
    codeZipSha256: string,
    content: CreateAgentVersionFromCodeContent,
    options?: BetaAgentsCreateAgentVersionFromCodeOptionalParams,
  ) => Promise<AgentVersion>;
  /** Updates an agent endpoint. */
  updateAgent: (
    agentName: string,
    options?: BetaAgentsPatchAgentObjectOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    getOptimizationCandidateResults: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentsGetOptimizationCandidateResultsOptionalParams,
    ) => getOptimizationCandidateResults(context, jobId, candidateId, options),
    getOptimizationCandidateConfig: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentsGetOptimizationCandidateConfigOptionalParams,
    ) => getOptimizationCandidateConfig(context, jobId, candidateId, options),
    getOptimizationCandidate: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentsGetOptimizationCandidateOptionalParams,
    ) => getOptimizationCandidate(context, jobId, candidateId, options),
    listOptimizationCandidates: (
      jobId: string,
      options?: BetaAgentsListOptimizationCandidatesOptionalParams,
    ) => listOptimizationCandidates(context, jobId, options),
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
      options?: BetaAgentsCreateAgentVersionFromCodeOptionalParams,
    ) => createAgentVersionFromCode(context, agentName, codeZipSha256, content, options),
    updateAgent: (agentName: string, options?: BetaAgentsPatchAgentObjectOptionalParams) =>
      updateAgentObject(context, agentName, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
