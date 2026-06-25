// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EdgeMachineGpuJob,
  edgeMachineGpuJobSerializer,
  edgeMachineGpuJobDeserializer,
  _EdgeMachineGpuJobListResult,
  _edgeMachineGpuJobListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EdgeMachineGpuJobsListOptionalParams,
  EdgeMachineGpuJobsDeleteOptionalParams,
  EdgeMachineGpuJobsCreateOrUpdateOptionalParams,
  EdgeMachineGpuJobsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  options: EdgeMachineGpuJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/gpus/{gpuName}/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      gpuName: gpuName,
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
): Promise<_EdgeMachineGpuJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _edgeMachineGpuJobListResultDeserializer(result.body);
}

/** List EdgeMachineGpuJob resources by EdgeMachineGpu. */
export function list(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  options: EdgeMachineGpuJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeMachineGpuJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, edgeMachineName, gpuName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  options: EdgeMachineGpuJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/gpus/{gpuName}/jobs/{jobsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      gpuName: gpuName,
      jobsName: jobsName,
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

/** Delete a specific GPU Job on an Edge Machine GPU. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  options: EdgeMachineGpuJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, edgeMachineName, gpuName, jobsName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  resource: EdgeMachineGpuJob,
  options: EdgeMachineGpuJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/gpus/{gpuName}/jobs/{jobsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      gpuName: gpuName,
      jobsName: jobsName,
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
      body: edgeMachineGpuJobSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineGpuJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineGpuJobDeserializer(result.body);
}

/** Create or update a GPU Job on an Edge Machine GPU. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  resource: EdgeMachineGpuJob,
  options: EdgeMachineGpuJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeMachineGpuJob>, EdgeMachineGpuJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        jobsName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<EdgeMachineGpuJob>, EdgeMachineGpuJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  options: EdgeMachineGpuJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/gpus/{gpuName}/jobs/{jobsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      gpuName: gpuName,
      jobsName: jobsName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EdgeMachineGpuJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineGpuJobDeserializer(result.body);
}

/** Get a specific GPU Job on an Edge Machine GPU. */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  gpuName: string,
  jobsName: string,
  options: EdgeMachineGpuJobsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeMachineGpuJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    edgeMachineName,
    gpuName,
    jobsName,
    options,
  );
  return _getDeserialize(result);
}
