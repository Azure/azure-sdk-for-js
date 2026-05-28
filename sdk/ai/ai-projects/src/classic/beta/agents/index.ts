// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  promoteCandidate,
  getCandidateFile,
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
  stopSession,
  deleteSession,
  getSession,
  createSession,
  downloadAgentCode,
  createAgentVersionFromCode,
  updateAgentObject,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsPromoteCandidateOptionalParams,
  BetaAgentsGetCandidateFileOptionalParams,
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
  BetaAgentsStopSessionOptionalParams,
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
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  OptimizationJobInputs,
  OptimizationJob,
  AgentsPagedResultOptimizationCandidate,
  CandidateMetadata,
  CandidateDeployConfig,
  CandidateResults,
  PromoteCandidateRequest,
  PromoteCandidateResponse,
  BetaAgentsGetCandidateFileResponse,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Promotes a candidate, recording the deployment timestamp and target agent version. */
  promoteCandidate: (
    jobId: string,
    candidateId: string,
    candidateRequest: PromoteCandidateRequest,
    options?: BetaAgentsPromoteCandidateOptionalParams,
  ) => Promise<PromoteCandidateResponse>;
  /** Stream a specific file from the candidate's blob directory. */
  getCandidateFile: (
    jobId: string,
    candidateId: string,
    path: string,
    options?: BetaAgentsGetCandidateFileOptionalParams,
  ) => Promise<BetaAgentsGetCandidateFileResponse>;
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
  /** Get a single candidate's metadata, manifest, and promotion info. */
  getOptimizationCandidate: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentsGetOptimizationCandidateOptionalParams,
  ) => Promise<CandidateMetadata>;
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
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<OptimizationJob>;
  /** Get an optimization job by id. Returns 202 while in progress, 200 when terminal. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: OptimizationJobInputs,
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
  ) => Promise<BetaAgentsDownloadSessionFileResponse>;
  /** Returns a list of sessions for the specified agent. */
  listSessions: (
    agentName: string,
    options?: BetaAgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /**
   * Stops a session.
   * Returns 204 No Content when the stop succeeds.
   */
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
  /**
   * Creates a new agent version from code content and makes it available for hosting.
   * Returns the created version, which may be in `provisioning` state — clients should poll `getVersion` until the status is `active` before creating sessions or downloading code.
   */
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
    promoteCandidate: (
      jobId: string,
      candidateId: string,
      candidateRequest: PromoteCandidateRequest,
      options?: BetaAgentsPromoteCandidateOptionalParams,
    ) => promoteCandidate(context, jobId, candidateId, candidateRequest, options),
    getCandidateFile: (
      jobId: string,
      candidateId: string,
      path: string,
      options?: BetaAgentsGetCandidateFileOptionalParams,
    ) => getCandidateFile(context, jobId, candidateId, path, options),
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
      job: OptimizationJobInputs,
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
