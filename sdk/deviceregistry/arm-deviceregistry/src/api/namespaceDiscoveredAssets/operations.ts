// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type {
  NamespaceDiscoveredAsset,
  NamespaceDiscoveredAssetUpdate,
  _NamespaceDiscoveredAssetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  namespaceDiscoveredAssetSerializer,
  namespaceDiscoveredAssetDeserializer,
  namespaceDiscoveredAssetUpdateSerializer,
  _namespaceDiscoveredAssetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamespaceDiscoveredAssetsListByResourceGroupOptionalParams,
  NamespaceDiscoveredAssetsDeleteOptionalParams,
  NamespaceDiscoveredAssetsUpdateOptionalParams,
  NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams,
  NamespaceDiscoveredAssetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceDiscoveredAssetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NamespaceDiscoveredAssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _namespaceDiscoveredAssetListResultDeserializer(result.body);
}

/** List NamespaceDiscoveredAsset resources by Namespace */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceDiscoveredAssetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NamespaceDiscoveredAsset> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, namespaceName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  options: NamespaceDiscoveredAssetsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredAssetName: discoveredAssetName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a NamespaceDiscoveredAsset */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  options: NamespaceDiscoveredAssetsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, discoveredAssetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  properties: NamespaceDiscoveredAssetUpdate,
  options: NamespaceDiscoveredAssetsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredAssetName: discoveredAssetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namespaceDiscoveredAssetUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredAsset> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredAssetDeserializer(result.body);
}

/** Update a NamespaceDiscoveredAsset */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  properties: NamespaceDiscoveredAssetUpdate,
  options: NamespaceDiscoveredAssetsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        discoveredAssetName,
        properties,
        options,
      ),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  resource: NamespaceDiscoveredAsset,
  options: NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredAssetName: discoveredAssetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namespaceDiscoveredAssetSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredAsset> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredAssetDeserializer(result.body);
}

/** Create a NamespaceDiscoveredAsset */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  resource: NamespaceDiscoveredAsset,
  options: NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        namespaceName,
        discoveredAssetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  options: NamespaceDiscoveredAssetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredAssetName: discoveredAssetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredAsset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredAssetDeserializer(result.body);
}

/** Get a NamespaceDiscoveredAsset */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredAssetName: string,
  options: NamespaceDiscoveredAssetsGetOptionalParams = { requestOptions: {} },
): Promise<NamespaceDiscoveredAsset> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    discoveredAssetName,
    options,
  );
  return _getDeserialize(result);
}
