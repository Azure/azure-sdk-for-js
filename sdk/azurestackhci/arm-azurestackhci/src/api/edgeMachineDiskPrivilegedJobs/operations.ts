// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EdgeMachineDiskPrivilegedJob,
  edgeMachineDiskPrivilegedJobSerializer,
  edgeMachineDiskPrivilegedJobDeserializer,
  _EdgeMachineDiskPrivilegedJobListResult,
  _edgeMachineDiskPrivilegedJobListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EdgeMachineDiskPrivilegedJobsDeleteOptionalParams,
  EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams,
  EdgeMachineDiskPrivilegedJobsListOptionalParams,
  EdgeMachineDiskPrivilegedJobsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  options: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/disks/{diskName}/privilegedJobs/{privilegedJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      diskName: diskName,
      privilegedJobName: privilegedJobName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a privileged job. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  options: EdgeMachineDiskPrivilegedJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  resource: EdgeMachineDiskPrivilegedJob,
  options: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/disks/{diskName}/privilegedJobs/{privilegedJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      diskName: diskName,
      privilegedJobName: privilegedJobName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: edgeMachineDiskPrivilegedJobSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineDiskPrivilegedJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineDiskPrivilegedJobDeserializer(result.body);
}

/** Create or update a privileged job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  resource: EdgeMachineDiskPrivilegedJob,
  options: EdgeMachineDiskPrivilegedJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeMachineDiskPrivilegedJob>, EdgeMachineDiskPrivilegedJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        privilegedJobName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<EdgeMachineDiskPrivilegedJob>, EdgeMachineDiskPrivilegedJob>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  options: EdgeMachineDiskPrivilegedJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/disks/{diskName}/privilegedJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      diskName: diskName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_EdgeMachineDiskPrivilegedJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _edgeMachineDiskPrivilegedJobListResultDeserializer(result.body);
}

/** List all privileged jobs for a disk. */
export function list(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  options: EdgeMachineDiskPrivilegedJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeMachineDiskPrivilegedJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, edgeMachineName, diskName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  options: EdgeMachineDiskPrivilegedJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/disks/{diskName}/privilegedJobs/{privilegedJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      diskName: diskName,
      privilegedJobName: privilegedJobName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineDiskPrivilegedJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineDiskPrivilegedJobDeserializer(result.body);
}

/** Get a specific privileged job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  diskName: string,
  privilegedJobName: string,
  options: EdgeMachineDiskPrivilegedJobsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeMachineDiskPrivilegedJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    edgeMachineName,
    diskName,
    privilegedJobName,
    options,
  );
  return _getDeserialize(result);
}
