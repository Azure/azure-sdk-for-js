// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  ResourceBody,
  Connection,
  ConnectionsPatch,
  _ConnectionListResult,
  _PendingConnectionListResult,
  PendingConnection,
  _PendingFlowListResult,
  PendingFlow,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceBodySerializer,
  connectionSerializer,
  connectionDeserializer,
  connectionsPatchSerializer,
  _connectionListResultDeserializer,
  _pendingConnectionListResultDeserializer,
  _pendingFlowListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionsListPendingFlowsListOptionalParams,
  ConnectionsListOptionalParams,
  ConnectionsLinkOptionalParams,
  ConnectionsListBySubscriptionOptionalParams,
  ConnectionsListByResourceGroupOptionalParams,
  ConnectionsDeleteOptionalParams,
  ConnectionsUpdateOptionalParams,
  ConnectionsCreateOrUpdateOptionalParams,
  ConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPendingFlowsListSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsListPendingFlowsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/listPendingFlows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listPendingFlowsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_PendingFlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pendingFlowListResultDeserializer(result.body);
}

/** Lists all remote flows that have not yet been linked to local flows */
export function listPendingFlowsList(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsListPendingFlowsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PendingFlow> {
  return buildPagedAsyncIterator(
    context,
    () => _listPendingFlowsListSend(context, resourceGroupName, connectionName, options),
    _listPendingFlowsListDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/listPendingConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PendingConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pendingConnectionListResultDeserializer(result.body);
}

/** Lists all pending remote connections that are linkable to this connection. */
export function list(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PendingConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, connectionName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _linkSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: ResourceBody,
  options: ConnectionsLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/link{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceBodySerializer(connection),
  });
}

export async function _linkDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Links the connection to its pending connection. */
export function link(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: ResourceBody,
  options: ConnectionsLinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connection>, Connection> {
  return getLongRunningPoller(context, _linkDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkSend(context, resourceGroupName, connectionName, connection, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Connection>, Connection>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectionListResultDeserializer(result.body);
}

/** Gets connections in a subscription. */
export function listBySubscription(
  context: Client,
  options: ConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connection> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectionListResultDeserializer(result.body);
}

/** Gets connections in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

/** Deletes the connection resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: ConnectionsPatch,
  options: ConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionsPatchSerializer(connection),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the connection resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: ConnectionsPatch,
  options: ConnectionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, connectionName, connection, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: Connection,
  options: ConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionSerializer(connection),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Creates or updates the connection resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  connection: Connection,
  options: ConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connection>, Connection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, connectionName, connection, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Connection>, Connection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Gets connection resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _getSend(context, resourceGroupName, connectionName, options);
  return _getDeserialize(result);
}
