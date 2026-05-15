// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
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
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams,
  BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams,
  BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsListOptimizationJobsOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams,
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
  options: BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams = {
    requestOptions: {},
  },
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
  options: BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams = {
    requestOptions: {},
  },
): Promise<CandidateResults> {
  const result = await _getOptimizationCandidateResultsSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateResultsDeserialize(result);
}

export function _getOptimizationCandidateConfigSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams = {
    requestOptions: {},
  },
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
  options: BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams = {
    requestOptions: {},
  },
): Promise<CandidateDeployConfig> {
  const result = await _getOptimizationCandidateConfigSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateConfigDeserialize(result);
}

export function _getOptimizationCandidateSend(
  context: Client,
  jobId: string,
  candidateId: string,
  options: BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams = { requestOptions: {} },
): Promise<OptimizationCandidate> {
  const result = await _getOptimizationCandidateSend(context, jobId, candidateId, options);
  return _getOptimizationCandidateDeserialize(result);
}

export function _listOptimizationCandidatesSend(
  context: Client,
  jobId: string,
  options: BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams = {
    requestOptions: {},
  },
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
  options: BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentsPagedResultOptimizationCandidate> {
  const result = await _listOptimizationCandidatesSend(context, jobId, options);
  return _listOptimizationCandidatesDeserialize(result);
}

export function _deleteOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteOptimizationJobSend(context, jobId, options);
  return _deleteOptimizationJobDeserialize(result);
}

export function _cancelOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _cancelOptimizationJobSend(context, jobId, options);
  return _cancelOptimizationJobDeserialize(result);
}

export function _listOptimizationJobsSend(
  context: Client,
  options: BetaAgentOptimizationJobsListOptimizationJobsOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsListOptimizationJobsOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsGetOptimizationJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsGetOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _getOptimizationJobSend(context, jobId, options);
  return _getOptimizationJobDeserialize(result);
}

export function _createOptimizationJobSend(
  context: Client,
  job: OptimizationJob,
  options: BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<OptimizationJob> {
  const result = await _createOptimizationJobSend(context, job, options);
  return _createOptimizationJobDeserialize(result);
}
