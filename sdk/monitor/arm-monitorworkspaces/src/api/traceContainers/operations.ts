// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  TraceContainerResource,
  _TraceContainerResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  traceContainerResourceSerializer,
  traceContainerResourceDeserializer,
  _traceContainerResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TraceContainersListByAzureMonitorWorkspaceOptionalParams,
  TraceContainersDeleteOptionalParams,
  TraceContainersCreateOrUpdateOptionalParams,
  TraceContainersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAzureMonitorWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersListByAzureMonitorWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/traceContainers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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

export async function _listByAzureMonitorWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TraceContainerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _traceContainerResourceListResultDeserializer(result.body);
}

/** Lists trace containers for an Azure Monitor Workspace. */
export function listByAzureMonitorWorkspace(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersListByAzureMonitorWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TraceContainerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAzureMonitorWorkspaceSend(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        options,
      ),
    _listByAzureMonitorWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/traceContainers/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the trace container for an Azure Monitor Workspace. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, azureMonitorWorkspaceName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  resource: TraceContainerResource,
  options: TraceContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/traceContainers/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: traceContainerResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TraceContainerResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return traceContainerResourceDeserializer(result.body);
}

/** Creates or replaces the trace container for an Azure Monitor Workspace. Modeled as a long-running operation (200 + 201); the service may complete synchronously by returning a terminal provisioningState, or track progress via Azure-AsyncOperation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  resource: TraceContainerResource,
  options: TraceContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TraceContainerResource>, TraceContainerResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, azureMonitorWorkspaceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-03-preview",
  }) as PollerLike<OperationState<TraceContainerResource>, TraceContainerResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/traceContainers/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<TraceContainerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return traceContainerResourceDeserializer(result.body);
}

/** Gets the trace container for an Azure Monitor Workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: TraceContainersGetOptionalParams = { requestOptions: {} },
): Promise<TraceContainerResource> {
  const result = await _getSend(context, resourceGroupName, azureMonitorWorkspaceName, options);
  return _getDeserialize(result);
}
