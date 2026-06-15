// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Agent,
  AgentVersion,
  OptimizationJob,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  _AgentsPagedResultAgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  OptimizationJobListItem,
  _AgentsPagedResultOptimizationJobListItem,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
  SessionDirectoryEntry,
} from "../../../models/models.js";
import {
  agentDeserializer,
  agentVersionDeserializer,
  agentEndpointConfigSerializer,
  agentCardSerializer,
  apiErrorResponseDeserializer,
  createAgentVersionFromCodeContentSerializer,
  versionIndicatorUnionSerializer,
  agentSessionResourceDeserializer,
  _agentsPagedResultAgentSessionResourceDeserializer,
  sessionFileWriteResponseDeserializer,
  sessionDirectoryListResponseDeserializer,
  optimizationJobSerializer,
  optimizationJobDeserializer,
  _agentsPagedResultOptimizationJobListItemDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures =
    "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview";
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
export async function deleteOptimizationJob(
  context: Client,
  jobId: string,
  options: BetaAgentsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteOptimizationJobSend(context, jobId, options);
  return _deleteOptimizationJobDeserialize(result);
}

export function _cancelOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsCancelOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}:cancel{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features":
        "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<OptimizationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Request cancellation of a running or queued job. Returns an error if the job is already in a terminal state. */
export async function cancelOptimizationJob(
  context: Client,
  jobId: string,
  options: BetaAgentsCancelOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _cancelOptimizationJobSend(context, jobId, options);
  return _cancelOptimizationJobDeserialize(result);
}

export function _listOptimizationJobsSend(
  context: Client,
  options: BetaAgentsListOptimizationJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs{?limit,order,after,before,status,agent_name,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      agent_name: options?.agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features":
        "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listOptimizationJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultOptimizationJobListItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultOptimizationJobListItemDeserializer(result.body);
}

/** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
export function listOptimizationJobs(
  context: Client,
  options: BetaAgentsListOptimizationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OptimizationJobListItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listOptimizationJobsSend(context, options),
    _listOptimizationJobsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _getOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsGetOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features":
        "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<OptimizationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Get an optimization job by id. */
export async function getOptimizationJob(
  context: Client,
  jobId: string,
  options: BetaAgentsGetOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _getOptimizationJobSend(context, jobId, options);
  return _getOptimizationJobDeserialize(result);
}

export function _createOptimizationJobSend(
  context: Client,
  job: OptimizationJob,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures =
    "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview";
  const path = expandUrlTemplate(
    "/agent_optimization_jobs{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: optimizationJobSerializer(job),
  });
}

export async function _createOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<OptimizationJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
export async function createOptimizationJob(
  context: Client,
  job: OptimizationJob,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _createOptimizationJobSend(context, job, options);
  return _createOptimizationJobDeserialize(result);
}

export function _deleteSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures =
    "HostedAgents=V1Preview,AgentEndpoints=V1Preview,AgentsOptimization=V2Preview";
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,recursive,api-version}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      recursive: options?.recursive,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSessionFileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Deletes the specified file or directory from the session sandbox.
 * When `recursive` is false, deleting a non-empty directory returns 409 Conflict.
 */
export async function deleteSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionFileSend(context, agentName, agentSessionId, path, options);
  return _deleteSessionFileDeserialize(result);
}

export function _listSessionFilesSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: options?.path,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSessionFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionDirectoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sessionDirectoryListResponseDeserializer(result.body);
}

/**
 * Returns files and directories at the specified path in the session sandbox.
 * The response includes only the immediate children of the target directory and defaults to the session home directory when no path is supplied.
 */
export function listSessionFiles(
  context: Client,
  agentName: string,
  agentSessionId: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SessionDirectoryEntry> {
  return buildPagedAsyncIterator(
    context,
    () => _listSessionFilesSend(context, agentName, agentSessionId, options),
    _listSessionFilesDeserialize,
    ["200"],
    {
      itemName: "entries",
      apiVersion: context.apiVersion,
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _downloadSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadSessionFileDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadSessionFileResponse,
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Downloads the file at the specified sandbox path as a binary stream.
 * The path is resolved relative to the session home directory.
 */
export async function downloadSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const streamableMethod = _downloadSessionFileSend(
    context,
    agentName,
    agentSessionId,
    path,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadSessionFileDeserialize(result);
}

export function _uploadSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/octet-stream",
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: content,
  });
}

export async function _uploadSessionFileDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionFileWriteResponse> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sessionFileWriteResponseDeserializer(result.body);
}

/**
 * Uploads binary file content to the specified path in the session sandbox.
 * The service stores the file relative to the session home directory and rejects payloads larger than 50 MB.
 */
export async function uploadSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): Promise<SessionFileWriteResponse> {
  const result = await _uploadSessionFileSend(
    context,
    agentName,
    agentSessionId,
    path,
    content,
    options,
  );
  return _uploadSessionFileDeserialize(result);
}

export function _getSessionLogStreamSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  sessionId: string,
  options: BetaAgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/sessions/{session_id}:logstream{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "text/event-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSessionLogStreamDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadSessionFileResponse,
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

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
export async function getSessionLogStream(
  context: Client,
  agentName: string,
  agentVersion: string,
  sessionId: string,
  options: BetaAgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const streamableMethod = _getSessionLogStreamSend(
    context,
    agentName,
    agentVersion,
    sessionId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSessionLogStreamDeserialize(result);
}

export function _listSessionsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSessionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentSessionResourceDeserializer(result.body);
}

/** Returns a paged collection of sessions associated with the specified agent endpoint. */
export function listSessions(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentSessionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSessionsSend(context, agentName, options),
    _listSessionsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: { "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview" },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _stopSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsStopSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}:stop{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...options.requestOptions?.headers,
    },
  });
}

export async function _stopSessionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Terminates the specified hosted agent session and returns 204 No Content when the request succeeds. */
export async function stopSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsStopSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSessionSend(context, agentName, sessionId, options);
  return _stopSessionDeserialize(result);
}

export function _deleteSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSessionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Deletes a session synchronously.
 * Returns 204 No Content when the session is deleted or does not exist.
 */
export async function deleteSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionSend(context, agentName, sessionId, options);
  return _deleteSessionDeserialize(result);
}

export function _getSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsGetSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/** Retrieves the details of a hosted agent session by agent name and session identifier. */
export async function getSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsGetSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _getSessionSend(context, agentName, sessionId, options);
  return _getSessionDeserialize(result);
}

export function _createSessionSend(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.userIsolationKey !== undefined
        ? { "x-ms-user-isolation-key": options?.userIsolationKey }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      agent_session_id: options?.agentSessionId,
      version_indicator: versionIndicatorUnionSerializer(versionIndicator),
    },
  });
}

export async function _createSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentSessionResource> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/**
 * Creates a new session for an agent endpoint.
 * The endpoint resolves the backing agent version from `version_indicator` and
 * enforces session ownership using the provided isolation key for session-mutating operations.
 */
export async function createSession(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _createSessionSend(context, agentName, versionIndicator, options);
  return _createSessionDeserialize(result);
}

export function _downloadAgentCodeSend(
  context: Client,
  agentName: string,
  options: BetaAgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,CodeAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/code:download{?agent_version,api-version}",
    {
      agent_name: agentName,
      agent_version: options?.agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/zip",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadAgentCodeDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadAgentCodeResponse,
): Promise<BetaAgentsDownloadAgentCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body?.error) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

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
export async function downloadAgentCode(
  context: Client,
  agentName: string,
  options: BetaAgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadAgentCodeResponse> {
  const streamableMethod = _downloadAgentCodeSend(context, agentName, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAgentCodeDeserialize(result);
}

export function _createVersionFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateVersionFromCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,CodeAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      "foundry-features": foundryFeatures,
      "x-ms-code-zip-sha256": codeZipSha256,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createAgentVersionFromCodeContentSerializer(content),
  });
}

export async function _createVersionFromCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

/**
 * Creates a new agent version from code. Uploads the code zip and creates a new version
 * for an existing agent. The SHA-256 hex digest of the zip is provided in the
 * `x-ms-code-zip-sha256` header for integrity and dedup.
 * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
 * Maximum upload size is 250 MB.
 */
export async function createVersionFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateVersionFromCodeOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createVersionFromCodeSend(
    context,
    agentName,
    codeZipSha256,
    content,
    options,
  );
  return _createVersionFromCodeDeserialize(result);
}

export function _patchAgentObjectSend(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      agent_endpoint: !options?.agentEndpoint
        ? options?.agentEndpoint
        : agentEndpointConfigSerializer(options?.agentEndpoint),
      agent_card: !options?.agentCard
        ? options?.agentCard
        : agentCardSerializer(options?.agentCard),
    },
  });
}

export async function _patchAgentObjectDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Applies a merge-patch update to the specified agent endpoint configuration. */
export async function updateAgentObject(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _patchAgentObjectSend(context, agentName, options);
  return _patchAgentObjectDeserialize(result);
}
