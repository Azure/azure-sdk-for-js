// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ExternalCacheConnection,
  ExternalCacheConnectionTagsUpdate,
  _ExternalCacheConnectionList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  externalCacheConnectionSerializer,
  externalCacheConnectionDeserializer,
  externalCacheConnectionTagsUpdateSerializer,
  _externalCacheConnectionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalCacheConnectionsListBySubscriptionOptionalParams,
  ExternalCacheConnectionsListByResourceGroupOptionalParams,
  ExternalCacheConnectionsDeleteOptionalParams,
  ExternalCacheConnectionsUpdateOptionalParams,
  ExternalCacheConnectionsCreateOrUpdateOptionalParams,
  ExternalCacheConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ExternalCacheConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/externalCacheConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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
): Promise<_ExternalCacheConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalCacheConnectionListDeserializer(result.body);
}

/** List all External Cache Connections in the subscription */
export function listBySubscription(
  context: Client,
  options: ExternalCacheConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalCacheConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExternalCacheConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalCacheConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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
): Promise<_ExternalCacheConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalCacheConnectionListDeserializer(result.body);
}

/** List all External Cache Connections in the resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExternalCacheConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalCacheConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  options: ExternalCacheConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalCacheConnections/{externalCacheConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalCacheConnectionName: externalCacheConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

/** Delete the specified External Cache Connection */
export function $delete(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  options: ExternalCacheConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, externalCacheConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  properties: ExternalCacheConnectionTagsUpdate,
  options: ExternalCacheConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalCacheConnections/{externalCacheConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalCacheConnectionName: externalCacheConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalCacheConnectionTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalCacheConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalCacheConnectionDeserializer(result.body);
}

/** Patch the specified External Cache Connection */
export function update(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  properties: ExternalCacheConnectionTagsUpdate,
  options: ExternalCacheConnectionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, externalCacheConnectionName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  resource: ExternalCacheConnection,
  options: ExternalCacheConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalCacheConnections/{externalCacheConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalCacheConnectionName: externalCacheConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalCacheConnectionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalCacheConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalCacheConnectionDeserializer(result.body);
}

/** Create or update the specified External Cache Connection */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  resource: ExternalCacheConnection,
  options: ExternalCacheConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        externalCacheConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalCacheConnection>, ExternalCacheConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  options: ExternalCacheConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalCacheConnections/{externalCacheConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalCacheConnectionName: externalCacheConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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
): Promise<ExternalCacheConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalCacheConnectionDeserializer(result.body);
}

/** Get the External Cache Connection */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalCacheConnectionName: string,
  options: ExternalCacheConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ExternalCacheConnection> {
  const result = await _getSend(context, resourceGroupName, externalCacheConnectionName, options);
  return _getDeserialize(result);
}
