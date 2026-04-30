// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext as Client } from "../index.js";
import type {
  StorageAsset,
  StorageAssetUpdate,
  _StorageAssetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  storageAssetSerializer,
  storageAssetDeserializer,
  storageAssetUpdateSerializer,
  _storageAssetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StorageAssetsListByStorageContainerOptionalParams,
  StorageAssetsDeleteOptionalParams,
  StorageAssetsUpdateOptionalParams,
  StorageAssetsCreateOrUpdateOptionalParams,
  StorageAssetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByStorageContainerSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  options: StorageAssetsListByStorageContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/storageContainers/{storageContainerName}/storageAssets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _listByStorageContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageAssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _storageAssetListResultDeserializer(result.body);
}

/** List StorageAsset resources by StorageContainer */
export function listByStorageContainer(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  options: StorageAssetsListByStorageContainerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAsset> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStorageContainerSend(context, resourceGroupName, storageContainerName, options),
    _listByStorageContainerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  options: StorageAssetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/storageContainers/{storageContainerName}/storageAssets/{storageAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
      storageAssetName: storageAssetName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

/** Delete a StorageAsset */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  options: StorageAssetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageContainerName, storageAssetName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  properties: StorageAssetUpdate,
  options: StorageAssetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/storageContainers/{storageContainerName}/storageAssets/{storageAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
      storageAssetName: storageAssetName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAssetUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<StorageAsset> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAssetDeserializer(result.body);
}

/** Update a StorageAsset */
export function update(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  properties: StorageAssetUpdate,
  options: StorageAssetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAsset>, StorageAsset> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storageContainerName,
        storageAssetName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<StorageAsset>, StorageAsset>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  resource: StorageAsset,
  options: StorageAssetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/storageContainers/{storageContainerName}/storageAssets/{storageAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
      storageAssetName: storageAssetName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAssetSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAsset> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAssetDeserializer(result.body);
}

/** Create a StorageAsset */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  resource: StorageAsset,
  options: StorageAssetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAsset>, StorageAsset> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        storageContainerName,
        storageAssetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<StorageAsset>, StorageAsset>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  options: StorageAssetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/storageContainers/{storageContainerName}/storageAssets/{storageAssetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
      storageAssetName: storageAssetName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageAsset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAssetDeserializer(result.body);
}

/** Get a StorageAsset */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  storageAssetName: string,
  options: StorageAssetsGetOptionalParams = { requestOptions: {} },
): Promise<StorageAsset> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageContainerName,
    storageAssetName,
    options,
  );
  return _getDeserialize(result);
}
