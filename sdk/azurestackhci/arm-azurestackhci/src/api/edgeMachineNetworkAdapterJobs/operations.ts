// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EdgeMachineNetworkAdapterJob,
  edgeMachineNetworkAdapterJobSerializer,
  edgeMachineNetworkAdapterJobDeserializer,
  _EdgeMachineNetworkAdapterJobListResult,
  _edgeMachineNetworkAdapterJobListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EdgeMachineNetworkAdapterJobsDeleteOptionalParams,
  EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams,
  EdgeMachineNetworkAdapterJobsListOptionalParams,
  EdgeMachineNetworkAdapterJobsGetOptionalParams,
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
  networkAdapterName: string,
  jobName: string,
  options: EdgeMachineNetworkAdapterJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/networkAdapters/{networkAdapterName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      networkAdapterName: networkAdapterName,
      jobName: jobName,
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

/** Delete a network adapter job. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  networkAdapterName: string,
  jobName: string,
  options: EdgeMachineNetworkAdapterJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
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
  networkAdapterName: string,
  jobName: string,
  resource: EdgeMachineNetworkAdapterJob,
  options: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/networkAdapters/{networkAdapterName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      networkAdapterName: networkAdapterName,
      jobName: jobName,
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
      body: edgeMachineNetworkAdapterJobSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineNetworkAdapterJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineNetworkAdapterJobDeserializer(result.body);
}

/** Create or update a network adapter job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  networkAdapterName: string,
  jobName: string,
  resource: EdgeMachineNetworkAdapterJob,
  options: EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeMachineNetworkAdapterJob>, EdgeMachineNetworkAdapterJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        edgeMachineName,
        networkAdapterName,
        jobName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<EdgeMachineNetworkAdapterJob>, EdgeMachineNetworkAdapterJob>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  networkAdapterName: string,
  options: EdgeMachineNetworkAdapterJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/networkAdapters/{networkAdapterName}/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      networkAdapterName: networkAdapterName,
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
): Promise<_EdgeMachineNetworkAdapterJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _edgeMachineNetworkAdapterJobListResultDeserializer(result.body);
}

/** List all jobs for a network adapter. */
export function list(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  networkAdapterName: string,
  options: EdgeMachineNetworkAdapterJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeMachineNetworkAdapterJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, edgeMachineName, networkAdapterName, options),
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
  networkAdapterName: string,
  jobName: string,
  options: EdgeMachineNetworkAdapterJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/networkAdapters/{networkAdapterName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      networkAdapterName: networkAdapterName,
      jobName: jobName,
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
): Promise<EdgeMachineNetworkAdapterJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineNetworkAdapterJobDeserializer(result.body);
}

/** Get a specific network adapter job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  networkAdapterName: string,
  jobName: string,
  options: EdgeMachineNetworkAdapterJobsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeMachineNetworkAdapterJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    edgeMachineName,
    networkAdapterName,
    jobName,
    options,
  );
  return _getDeserialize(result);
}
