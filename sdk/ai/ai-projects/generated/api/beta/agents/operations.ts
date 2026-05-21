// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  Agent,
  agentDeserializer,
  AgentVersion,
  agentVersionDeserializer,
  agentEndpointConfigSerializer,
  agentCardSerializer,
  apiErrorResponseDeserializer,
  CreateAgentVersionFromCodeContent,
  createAgentVersionFromCodeContentSerializer,
  versionIndicatorUnionSerializer,
  VersionIndicatorUnion,
  AgentSessionResource,
  agentSessionResourceDeserializer,
  _AgentsPagedResultAgentSessionResource,
  _agentsPagedResultAgentSessionResourceDeserializer,
  SessionLogEvent,
  sessionLogEventDeserializer,
  SessionFileWriteResponse,
  sessionFileWriteResponseDeserializer,
  SessionDirectoryListResponse,
  sessionDirectoryListResponseDeserializer,
  OptimizationJob,
  optimizationJobSerializer,
  optimizationJobDeserializer,
  OptimizationCandidate,
  optimizationCandidateDeserializer,
  _AgentsPagedResultOptimizationJob,
  _agentsPagedResultOptimizationJobDeserializer,
  AgentsPagedResultOptimizationCandidate,
  agentsPagedResultOptimizationCandidateDeserializer,
  CandidateDeployConfig,
  candidateDeployConfigDeserializer,
  CandidateResults,
  candidateResultsDeserializer,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
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
  BetaAgentsGetSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsGetSessionLogStreamOptionalParams,
  BetaAgentsListSessionsOptionalParams,
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsDownloadAgentCodeOptionalParams,
  BetaAgentsCreateVersionFromCodeOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getOptimizationCandidateResultsSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}/results{?api%2Dversion}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOptimizationCandidateResultsDeserialize(
  result: PathUncheckedResponse,
): Promise<CandidateResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return candidateResultsDeserializer(result.body);
}

/** Get full per-task evaluation results for a candidate. */
export async function getOptimizationCandidateResults(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateResultsOptionalParams = { requestOptions: {} },
): Promise<CandidateResults> {
  const result = await _getOptimizationCandidateResultsSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateResultsDeserialize(result);
}

export function _getOptimizationCandidateConfigSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}/config{?api%2Dversion}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOptimizationCandidateConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<CandidateDeployConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return candidateDeployConfigDeserializer(result.body);
}

/** Get the candidate's deploy config JSON. Used to compose `agents.create_version(...)` from a candidate. */
export async function getOptimizationCandidateConfig(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateConfigOptionalParams = { requestOptions: {} },
): Promise<CandidateDeployConfig> {
  const result = await _getOptimizationCandidateConfigSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateConfigDeserialize(result);
}

export function _getOptimizationCandidateSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}{?api%2Dversion}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOptimizationCandidateDeserialize(
  result: PathUncheckedResponse,
): Promise<OptimizationCandidate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return optimizationCandidateDeserializer(result.body);
}

/** Get a single candidate manifest and aggregated evaluation summary. */
export async function getOptimizationCandidate(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateOptionalParams = { requestOptions: {} },
): Promise<OptimizationCandidate> {
  const result = await _getOptimizationCandidateSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateDeserialize(result);
}

export function _listOptimizationCandidatesSend(
  context: Client,
  jobId: string,
  options: BetaAgentsListOptimizationCandidatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates{?limit,order,after,before,api%2Dversion}",
    {
      jobId: jobId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listOptimizationCandidatesDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentsPagedResultOptimizationCandidate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentsPagedResultOptimizationCandidateDeserializer(result.body);
}

/** List candidates produced by a job. */
export async function listOptimizationCandidates(
  context: Client,
  jobId: string,
  options: BetaAgentsListOptimizationCandidatesOptionalParams = { requestOptions: {} },
): Promise<AgentsPagedResultOptimizationCandidate> {
  const result = await _listOptimizationCandidatesSend(context, jobId, options);
  return _listOptimizationCandidatesDeserialize(result);
}

export function _deleteOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

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
    "/agent_optimization_jobs/{jobId}:cancel{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Request cancellation. Idempotent on terminal states. */
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
    "/agent_optimization_jobs{?limit,order,after,before,status,agent_name,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      agent_name: options?.agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listOptimizationJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultOptimizationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultOptimizationJobDeserializer(result.body);
}

/** List optimization jobs. Supports cursor pagination and optional `status` / `agent_name` filters. */
export function listOptimizationJobs(
  context: Client,
  options: BetaAgentsListOptimizationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OptimizationJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listOptimizationJobsSend(context, options),
    _listOptimizationJobsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsGetOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Get an optimization job by id. Emits `Retry-After` while the job is non-terminal. */
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
  const path = expandUrlTemplate(
    "/agent_optimization_jobs{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

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
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,recursive,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      recursive: options?.recursive,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Delete a file or directory from the session sandbox.
 * If `recursive` is false (default) and the target is a non-empty directory, the API returns 409 Conflict.
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

export function _getSessionFilesSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsGetSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        ...(options?.userIsolationKey !== undefined
          ? { "x-ms-user-isolation-key": options?.userIsolationKey }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSessionFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionDirectoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionDirectoryListResponseDeserializer(result.body);
}

/**
 * List files and directories at a given path in the session sandbox.
 * Returns only the immediate children of the specified directory (non-recursive).
 */
export async function getSessionFiles(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsGetSessionFilesOptionalParams = { requestOptions: {} },
): Promise<SessionDirectoryListResponse> {
  const result = await _getSessionFilesSend(context, agentName, agentSessionId, path, options);
  return _getSessionFilesDeserialize(result);
}

export function _downloadSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Download a file from the session sandbox as a binary stream. */
export async function downloadSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const result = await _downloadSessionFileSend(context, agentName, agentSessionId, path, options);
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
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionFileWriteResponseDeserializer(result.body);
}

/**
 * Upload a file to the session sandbox via binary stream.
 * Maximum file size is 50 MB. Uploads exceeding this limit return 413 Payload Too Large.
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
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/sessions/{session_id}:logstream{?api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "text/event-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSessionLogStreamDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionLogEvent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionLogEventDeserializer(result.body);
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
): Promise<SessionLogEvent> {
  const result = await _getSessionLogStreamSend(
    context,
    agentName,
    agentVersion,
    sessionId,
    options,
  );
  return _getSessionLogStreamDeserialize(result);
}

export function _listSessionsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultAgentSessionResourceDeserializer(result.body);
}

/** Returns a list of sessions for the specified agent. */
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
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _deleteSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

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
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/** Retrieves a session by ID. */
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
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

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
  const path = expandUrlTemplate(
    "/agents/{agent_name}/code:download{?agent_version,api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: options?.agentVersion,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

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
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

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
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Updates an agent endpoint. */
export async function patchAgentObject(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _patchAgentObjectSend(context, agentName, options);
  return _patchAgentObjectDeserialize(result);
}
