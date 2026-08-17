// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  OptimizationJob,
  OptimizationJobListItem,
  OptimizationJobResult,
  _AgentsPagedResultOptimizationJobListItem,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/beta/agents/operations.ts
  AgentOptimizationJob,
  agentOptimizationJobSerializer,
  agentOptimizationJobDeserializer,
  AgentOptimizationJobResult,
  agentOptimizationJobResultDeserializer,
  _AgentsPagedResultAgentOptimizationJobListItem,
  _agentsPagedResultAgentOptimizationJobListItemDeserializer,
  AgentOptimizationJobListItem,
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/beta/agents/operations.ts
  OptimizationJob,
  optimizationJobSerializer,
  optimizationJobDeserializer,
  OptimizationJobResult,
  optimizationJobResultDeserializer,
  _AgentsPagedResultOptimizationJobListItem,
  _agentsPagedResultOptimizationJobListItemDeserializer,
  OptimizationJobListItem,
=======
  optimizationJobSerializer,
  optimizationJobDeserializer,
  optimizationJobResultDeserializer,
  _agentsPagedResultOptimizationJobListItemDeserializer,
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/beta/agents/operations.ts
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";
import { getJobPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteOptimizationJobSend(
  context: Client,
  jobId: string,
  options: BetaAgentsDeleteOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentsOptimization=V2Preview";
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
      "foundry-features": "AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentOptimizationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentOptimizationJobDeserializer(result.body);
}

/** Request cancellation of a running or queued job. Returns an error if the job is already in a terminal state. */
export async function cancelOptimizationJob(
  context: Client,
  jobId: string,
  options: BetaAgentsCancelOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<AgentOptimizationJob> {
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
      "foundry-features": "AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listOptimizationJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentOptimizationJobListItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentOptimizationJobListItemDeserializer(result.body);
}

/** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
export function listOptimizationJobs(
  context: Client,
  options: BetaAgentsListOptimizationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentOptimizationJobListItem> {
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
      "foundry-features": "AgentsOptimization=V2Preview",
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentOptimizationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentOptimizationJobDeserializer(result.body);
}

/** Get an optimization job by id. */
export async function getOptimizationJob(
  context: Client,
  jobId: string,
  options: BetaAgentsGetOptimizationJobOptionalParams = { requestOptions: {} },
): Promise<AgentOptimizationJob> {
  const result = await _getOptimizationJobSend(context, jobId, options);
  return _getOptimizationJobDeserialize(result);
}

export function _createOptimizationJobSend(
  context: Client,
  job: AgentOptimizationJob,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentsOptimization=V2Preview";
  const path = expandUrlTemplate(
    "/agent_optimization_jobs{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/beta/agents/operations.ts
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
      body: agentOptimizationJobSerializer(job),
    });
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/beta/agents/operations.ts
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
=======
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
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/beta/agents/operations.ts
}

export async function _createOptimizationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentOptimizationJobResult> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return agentOptimizationJobResultDeserializer(result.body.result);
}

/** Create an optimization job. Returns the queued job. Honours `Operation-Id` for idempotent retry. */
export function createOptimizationJob(
  context: Client,
  job: AgentOptimizationJob,
  options: BetaAgentsCreateOptimizationJobOptionalParams = { requestOptions: {} },
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/beta/agents/operations.ts
): PollerLike<OperationState<AgentOptimizationJobResult>, AgentOptimizationJobResult> {
  return getLongRunningPoller(context, _createOptimizationJobDeserialize, ["201", "200", "202"], {
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/beta/agents/operations.ts
): PollerLike<OperationState<OptimizationJobResult>, OptimizationJobResult> {
  return getLongRunningPoller(context, _createOptimizationJobDeserialize, ["201", "200", "202"], {
=======
): JobPoller<OptimizationJobResult> {
  // CUSTOMIZATION: SDK-IMPROVEMENT: `getJobPoller` exposes the queued job id on the poller state.
  return getJobPoller(context, _createOptimizationJobDeserialize, ["201", "200", "202"], {
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/beta/agents/operations.ts
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOptimizationJobSend(context, job, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/beta/agents/operations.ts
  }) as PollerLike<OperationState<AgentOptimizationJobResult>, AgentOptimizationJobResult>;
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/beta/agents/operations.ts
  }) as PollerLike<OperationState<OptimizationJobResult>, OptimizationJobResult>;
=======
    pollHeaders: {
      ...options?.requestOptions?.headers,
      "foundry-features": "AgentsOptimization=V2Preview",
    },
  });
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/beta/agents/operations.ts
}
