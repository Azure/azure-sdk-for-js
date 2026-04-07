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
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobTargetExecutionsListByJobExecutionOptionalParams,
  JobTargetExecutionsListByStepOptionalParams,
  JobTargetExecutionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByJobExecutionSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobTargetExecutionsListByJobExecutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/targets{?api%2Dversion,createTimeMin,createTimeMax,endTimeMin,endTimeMax,isActive,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
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

export async function _listByJobExecutionDeserialize(
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

/** Lists target executions for all steps of a job execution. */
export function listByJobExecution(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  options: JobTargetExecutionsListByJobExecutionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobExecution> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByJobExecutionSend(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    _listByJobExecutionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByStepSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  stepName: string,
  options: JobTargetExecutionsListByStepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps/{stepName}/targets{?api%2Dversion,createTimeMin,createTimeMax,endTimeMin,endTimeMax,isActive,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
      stepName: stepName,
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

export async function _listByStepDeserialize(
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

/** Lists the target executions of a job step execution. */
export function listByStep(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  stepName: string,
  options: JobTargetExecutionsListByStepOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobExecution> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStepSend(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        stepName,
        options,
      ),
    _listByStepDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  stepName: string,
  targetId: string,
  options: JobTargetExecutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps/{stepName}/targets/{targetId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobExecutionId: jobExecutionId,
      stepName: stepName,
      targetId: targetId,
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

/** Gets a target execution. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobExecutionId: string,
  stepName: string,
  targetId: string,
  options: JobTargetExecutionsGetOptionalParams = { requestOptions: {} },
): Promise<JobExecution> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobExecutionId,
    stepName,
    targetId,
    options,
  );
  return _getDeserialize(result);
}
