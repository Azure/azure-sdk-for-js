// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AzureMonitorWorkspaceResource,
  azureMonitorWorkspaceResourceSerializer,
  azureMonitorWorkspaceResourceDeserializer,
  AzureMonitorWorkspaceResourceUpdate,
  azureMonitorWorkspaceResourceUpdateSerializer,
  _AzureMonitorWorkspaceResourceListResult,
  _azureMonitorWorkspaceResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AzureMonitorWorkspacesListBySubscriptionOptionalParams,
  AzureMonitorWorkspacesListByResourceGroupOptionalParams,
  AzureMonitorWorkspacesDeleteOptionalParams,
  AzureMonitorWorkspacesUpdateOptionalParams,
  AzureMonitorWorkspacesCreateOrUpdateOptionalParams,
  AzureMonitorWorkspacesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: AzureMonitorWorkspacesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Monitor/accounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureMonitorWorkspaceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _azureMonitorWorkspaceResourceListResultDeserializer(result.body);
}

/** Lists all Azure Monitor Workspaces in the specified subscription */
export function listBySubscription(
  context: Client,
  options: AzureMonitorWorkspacesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureMonitorWorkspaceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-03" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AzureMonitorWorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureMonitorWorkspaceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _azureMonitorWorkspaceResourceListResultDeserializer(result.body);
}

/** Lists all Azure Monitor Workspaces in the specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AzureMonitorWorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureMonitorWorkspaceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-03" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: AzureMonitorWorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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

/** Deletes an Azure Monitor Workspace */
export function $delete(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: AzureMonitorWorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, azureMonitorWorkspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-03",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  properties: AzureMonitorWorkspaceResourceUpdate,
  options: AzureMonitorWorkspacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: azureMonitorWorkspaceResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureMonitorWorkspaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureMonitorWorkspaceResourceDeserializer(result.body);
}

/** Updates part of an Azure Monitor Workspace */
export async function update(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  properties: AzureMonitorWorkspaceResourceUpdate,
  options: AzureMonitorWorkspacesUpdateOptionalParams = { requestOptions: {} },
): Promise<AzureMonitorWorkspaceResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  resource: AzureMonitorWorkspaceResource,
  options: AzureMonitorWorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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
      body: azureMonitorWorkspaceResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureMonitorWorkspaceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureMonitorWorkspaceResourceDeserializer(result.body);
}

/** Creates or updates an Azure Monitor Workspace */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  resource: AzureMonitorWorkspaceResource,
  options: AzureMonitorWorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AzureMonitorWorkspaceResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: AzureMonitorWorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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
): Promise<AzureMonitorWorkspaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureMonitorWorkspaceResourceDeserializer(result.body);
}

/** Returns the specified Azure Monitor Workspace */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: AzureMonitorWorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<AzureMonitorWorkspaceResource> {
  const result = await _getSend(context, resourceGroupName, azureMonitorWorkspaceName, options);
  return _getDeserialize(result);
}
