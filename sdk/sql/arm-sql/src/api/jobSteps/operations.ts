// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { JobStep, _JobStepListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobStepSerializer,
  jobStepDeserializer,
  _jobStepListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobStepsListByVersionOptionalParams,
  JobStepsGetByVersionOptionalParams,
  JobStepsListByJobOptionalParams,
  JobStepsDeleteOptionalParams,
  JobStepsCreateOrUpdateOptionalParams,
  JobStepsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByVersionSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  options: JobStepsListByVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}/steps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobVersion: jobVersion,
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

export async function _listByVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobStepListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobStepListResultDeserializer(result.body);
}

/** Gets all job steps in the specified job version. */
export function listByVersion(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  options: JobStepsListByVersionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobStep> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVersionSend(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobVersion,
        options,
      ),
    _listByVersionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getByVersionSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  stepName: string,
  options: JobStepsGetByVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}/steps/{stepName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobVersion: jobVersion,
      stepName: stepName,
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

export async function _getByVersionDeserialize(result: PathUncheckedResponse): Promise<JobStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobStepDeserializer(result.body);
}

/** Gets the specified version of a job step. */
export async function getByVersion(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  stepName: string,
  options: JobStepsGetByVersionOptionalParams = { requestOptions: {} },
): Promise<JobStep> {
  const result = await _getByVersionSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobVersion,
    stepName,
    options,
  );
  return _getByVersionDeserialize(result);
}

export function _listByJobSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobStepsListByJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByJobDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobStepListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobStepListResultDeserializer(result.body);
}

/** Gets all job steps for a job's current version. */
export function listByJob(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobStepsListByJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobStep> {
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

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  options: JobStepsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      stepName: stepName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a job step. This will implicitly create a new job version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  options: JobStepsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    stepName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  parameters: JobStep,
  options: JobStepsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      stepName: stepName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: jobStepSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<JobStep> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobStepDeserializer(result.body);
}

/** Creates or updates a job step. This will implicitly create a new job version. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  parameters: JobStep,
  options: JobStepsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<JobStep> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    stepName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  options: JobStepsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      stepName: stepName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobStepDeserializer(result.body);
}

/** Gets a job step in a job's current version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  stepName: string,
  options: JobStepsGetOptionalParams = { requestOptions: {} },
): Promise<JobStep> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    stepName,
    options,
  );
  return _getDeserialize(result);
}
