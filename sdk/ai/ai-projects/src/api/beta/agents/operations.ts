// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Agent,
  AgentVersion,
  CandidateResults,
  OptimizationJob,
  _AgentsPagedResultOptimizationJob,
  AgentsPagedResultOptimizationCandidate,
  CandidateDeployConfig,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  _AgentsPagedResultAgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  OptimizationJobInputs,
  CandidateMetadata,
  PromoteCandidateRequest,
  PromoteCandidateResponse,
  BetaAgentsGetCandidateFileResponse,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsDownloadAgentCodeResponse,
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
  optimizationJobInputsSerializer,
  optimizationJobDeserializer,
  _agentsPagedResultOptimizationJobDeserializer,
  agentsPagedResultOptimizationCandidateDeserializer,
  candidateMetadataDeserializer,
  candidateDeployConfigDeserializer,
  candidateResultsDeserializer,
  promoteCandidateRequestSerializer,
  promoteCandidateResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _promoteCandidateSend(
  context: Client,
  jobId: string,
  candidateId: string,
  candidateRequest: PromoteCandidateRequest,
  options: BetaAgentsPromoteCandidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}:promote{?api-version}",
    {
      jobId: jobId,
      candidateId: candidateId,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: promoteCandidateRequestSerializer(candidateRequest),
  });
}

export async function _promoteCandidateDeserialize(
  result: PathUncheckedResponse,
): Promise<PromoteCandidateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return promoteCandidateResponseDeserializer(result.body);
}

/** Promotes a candidate, recording the deployment timestamp and target agent version. */
export async function promoteCandidate(
  context: Client,
  jobId: string,
  candidateId: string,
  candidateRequest: PromoteCandidateRequest,
  options: BetaAgentsPromoteCandidateOptionalParams = { requestOptions: {} },
): Promise<PromoteCandidateResponse> {
  const result = await _promoteCandidateSend(
    context,
    jobId,
    candidateId,
    candidateRequest,
    options,
  );
  return _promoteCandidateDeserialize(result);
}

export function _getCandidateFileSend(
  context: Client,
  jobId: string,
  candidateId: string,
  path: string,
  options: BetaAgentsGetCandidateFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}/files{?path,api-version}",
    {
      jobId: jobId,
      candidateId: candidateId,
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
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCandidateFileDeserialize(
  result: PathUncheckedResponse & BetaAgentsGetCandidateFileResponse,
): Promise<BetaAgentsGetCandidateFileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Stream a specific file from the candidate's blob directory. */
export async function getCandidateFile(
  context: Client,
  jobId: string,
  candidateId: string,
  path: string,
  options: BetaAgentsGetCandidateFileOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsGetCandidateFileResponse> {
  const result = await _getCandidateFileSend(context, jobId, candidateId, path, options);
  return _getCandidateFileDeserialize(result);
}

export function _getOptimizationCandidateResultsSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}/results{?api-version}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
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
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}/config{?api-version}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
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
    "/agent_optimization_jobs/{jobId}/candidates/{candidateId}{?api-version}",
    {
      jobId: jobId,
      candidateId: candidateId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOptimizationCandidateDeserialize(
  result: PathUncheckedResponse,
): Promise<CandidateMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return candidateMetadataDeserializer(result.body);
}

/** Get a single candidate's metadata, manifest, and promotion info. */
export async function getOptimizationCandidate(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentsGetOptimizationCandidateOptionalParams = { requestOptions: {} },
): Promise<CandidateMetadata> {
  const result = await _getOptimizationCandidateSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateDeserialize(result);
}

export function _listOptimizationCandidatesSend(
  context: Client,
  jobId: string,
  options: BetaAgentsListOptimizationCandidatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}/candidates{?limit,order,after,before,api-version}",
    {
      jobId: jobId,
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
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
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
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agent_optimization_jobs/{jobId}{?force,api-version}",
    {
      jobId: jobId,
      force: options?.force,
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
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
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
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
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

/** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
export function listOptimizationJobs(
  context: Client,
  options: BetaAgentsListOptimizationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OptimizationJob> {
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
      "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<OptimizationJob> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return optimizationJobDeserializer(result.body);
}

/** Get an optimization job by id. Returns 202 while in progress, 200 when terminal. */
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
  inputs: OptimizationJobInputs,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
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
    body: optimizationJobInputsSerializer(inputs),
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
  inputs: OptimizationJobInputs,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _createOptimizationJobSend(context, inputs, options);
  return _createOptimizationJobDeserialize(result);
}

export function _deleteSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
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

export function _listSessionFilesSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,api-version}",
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionDirectoryListResponseDeserializer(result.body);
}

/**
 * List files and directories at a given path in the session sandbox.
 * Returns only the immediate children of the specified directory (non-recursive).
 */
export async function listSessionFiles(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): Promise<SessionDirectoryListResponse> {
  const result = await _listSessionFilesSend(context, agentName, agentSessionId, path, options);
  return _listSessionFilesDeserialize(result);
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Stops a session.
 * Returns 204 No Content when the stop succeeds.
 */
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

export function _createAgentVersionFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateAgentVersionFromCodeOptionalParams = { requestOptions: {} },
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

export async function _createAgentVersionFromCodeDeserialize(
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

export async function createAgentVersionFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateAgentVersionFromCodeOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createAgentVersionFromCodeSend(
    context,
    agentName,
    codeZipSha256,
    content,
    options,
  );
  return _createAgentVersionFromCodeDeserialize(result);
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Updates an agent endpoint. */
export async function updateAgentObject(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _patchAgentObjectSend(context, agentName, options);
  return _patchAgentObjectDeserialize(result);
}
