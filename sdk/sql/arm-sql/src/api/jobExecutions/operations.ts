// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { JobExecution, _JobExecutionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobExecutionDeserializer,
  _jobExecutionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobExecutionsCreateOptionalParams,
  JobExecutionsListByAgentOptionalParams,
  JobExecutionsListByJobOptionalParams,
  JobExecutionsCancelOptionalParams,
  JobExecutionsCreateOrUpdateOptionalParams,
  JobExecutionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobExecutionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<JobExecution> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobExecutionDeserializer(result.body);
}

/** Starts an elastic job execution. */
export function create(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobExecutionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JobExecution>, JobExecution> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<JobExecution>, JobExecution>;
}

export function _listByAgentSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobExecutionsListByAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/executions{?api%2Dversion,createTimeMin,createTimeMax,endTimeMin,endTimeMax,isActive,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      createTimeMin: !options?.createTimeMin
        ? options?.createTimeMin
        : options?.createTimeMin.toISOString(),
      createTimeMax: !options?.createTimeMax
        ? options?.createTimeMax
        : options?.createTimeMax.toISOString(),
      endTimeMin: !options?.endTimeMin ? options?.endTimeMin : options?.endTimeMin.toISOString(),
      endTimeMax: !options?.endTimeMax ? options?.endTimeMax : options?.endTimeMax.toISOString(),
      isActive: options?.isActive,
      "%24skip": options?.skip,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobExecutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobExecutionListResultDeserializer(result.body);
}

/** Lists all executions in a job agent. */
export function listByAgent(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobExecutionsListByAgentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobExecution> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAgentSend(context, resourceGroupName, serverName, jobAgentName, options),
    _listByAgentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByJobSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobExecutionsListByJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions{?api%2Dversion,createTimeMin,createTimeMax,endTimeMin,endTimeMax,isActive,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      createTimeMin: !options?.createTimeMin
        ? options?.createTimeMin
        : options?.createTimeMin.toISOString(),
      createTimeMax: !options?.createTimeMax
        ? options?.createTimeMax
        : options?.createTimeMax.toISOString(),
      endTimeMin: !options?.endTimeMin ? options?.endTimeMin : options?.endTimeMin.toISOString(),
      endTimeMax: !options?.endTimeMax ? options?.endTimeMax : options?.endTimeMax.toISOString(),
      isActive: options?.isActive,
      "%24skip": options?.skip,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByJobDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobExecutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobExecutionListResultDeserializer(result.body);
}

/** Lists a job's executions. */
export function listByJob(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobExecutionsListByJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobExecution> {
  return buildPagedAsyncIterator(
    context,
    () => _listByJobSend(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    _listByJobDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests cancellation of a job execution. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobExecutionId,
    options,
  );
  return _cancelDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<JobExecution> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobExecutionDeserializer(result.body);
}

/** Creates or updates a job execution. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JobExecution>, JobExecution> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<JobExecution>, JobExecution>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobExecution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobExecutionDeserializer(result.body);
}

/** Gets a job execution. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobExecutionsGetOptionalParams = { requestOptions: {} },
): Promise<JobExecution> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobExecutionId,
    options,
  );
  return _getDeserialize(result);
}
