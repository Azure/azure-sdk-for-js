// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  Job,
  _JobCollection,
  ResumeJobParams,
  JobQueryParameter,
} from "../../models/models.js";
import {
  jobDeserializer,
  _jobCollectionDeserializer,
  resumeJobParamsSerializer,
  jobQueryParameterSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationJobsExportOptionalParams,
  ReplicationJobsResumeOptionalParams,
  ReplicationJobsRestartOptionalParams,
  ReplicationJobsCancelOptionalParams,
  ReplicationJobsListOptionalParams,
  ReplicationJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$exportSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobQueryParameter: JobQueryParameter,
  options: ReplicationJobsExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/export{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: jobQueryParameterSerializer(jobQueryParameter),
  });
}

export async function _$exportDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return jobDeserializer(result.body);
}

/** The operation to export the details of the Azure Site Recovery jobs of the vault. */
/**
 *  @fixme export is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $export(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobQueryParameter: JobQueryParameter,
  options: ReplicationJobsExportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _$exportDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$exportSend(context, resourceGroupName, resourceName, jobQueryParameter, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  resumeJobParams: ResumeJobParams,
  options: ReplicationJobsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resumeJobParamsSerializer(resumeJobParams),
  });
}

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return jobDeserializer(result.body);
}

/** The operation to resume an Azure Site Recovery job. */
export function resume(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  resumeJobParams: ResumeJobParams,
  options: ReplicationJobsResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _resumeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(context, resourceGroupName, resourceName, jobName, resumeJobParams, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return jobDeserializer(result.body);
}

/** The operation to restart an Azure Site Recovery job. */
export function restart(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _restartDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, resourceName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return jobDeserializer(result.body);
}

/** The operation to cancel an Azure Site Recovery job. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _cancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(context, resourceGroupName, resourceName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24filter": options?.filter,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _jobCollectionDeserializer(result.body);
}

/** Gets the list of Azure Site Recovery Jobs for the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Job> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return jobDeserializer(result.body);
}

/** Get the details of an Azure Site Recovery job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobName: string,
  options: ReplicationJobsGetOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _getSend(context, resourceGroupName, resourceName, jobName, options);
  return _getDeserialize(result);
}
