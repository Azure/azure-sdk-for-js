// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  StorageClassificationMapping,
  StorageClassificationMappingInput,
  _StorageClassificationMappingCollection,
} from "../../models/models.js";
import {
  storageClassificationMappingDeserializer,
  storageClassificationMappingInputSerializer,
  _storageClassificationMappingCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationStorageClassificationMappingsListOptionalParams,
  ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams,
  ReplicationStorageClassificationMappingsDeleteOptionalParams,
  ReplicationStorageClassificationMappingsCreateOptionalParams,
  ReplicationStorageClassificationMappingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationStorageClassificationMappingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationStorageClassificationMappings{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageClassificationMappingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _storageClassificationMappingCollectionDeserializer(result.body);
}

/** Lists the storage classification mappings in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationStorageClassificationMappingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageClassificationMapping> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _listByReplicationStorageClassificationsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  options: ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      storageClassificationName: storageClassificationName,
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

export async function _listByReplicationStorageClassificationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageClassificationMappingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _storageClassificationMappingCollectionDeserializer(result.body);
}

/** Lists the storage classification mappings for the fabric. */
export function listByReplicationStorageClassifications(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  options: ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StorageClassificationMapping> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationStorageClassificationsSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        options,
      ),
    _listByReplicationStorageClassificationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  options: ReplicationStorageClassificationMappingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      storageClassificationName: storageClassificationName,
      storageClassificationMappingName: storageClassificationMappingName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
    throw createRestError(result);
  }

  return;
}

/** The operation to delete a storage classification mapping. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  options: ReplicationStorageClassificationMappingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  pairingInput: StorageClassificationMappingInput,
  options: ReplicationStorageClassificationMappingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      storageClassificationName: storageClassificationName,
      storageClassificationMappingName: storageClassificationMappingName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageClassificationMappingInputSerializer(pairingInput),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassificationMapping> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return storageClassificationMappingDeserializer(result.body);
}

/** The operation to create a storage classification mapping. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  pairingInput: StorageClassificationMappingInput,
  options: ReplicationStorageClassificationMappingsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageClassificationMapping>, StorageClassificationMapping> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        pairingInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<StorageClassificationMapping>, StorageClassificationMapping>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  options: ReplicationStorageClassificationMappingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      storageClassificationName: storageClassificationName,
      storageClassificationMappingName: storageClassificationMappingName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassificationMapping> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return storageClassificationMappingDeserializer(result.body);
}

/** Gets the details of the specified storage classification mapping. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  storageClassificationMappingName: string,
  options: ReplicationStorageClassificationMappingsGetOptionalParams = { requestOptions: {} },
): Promise<StorageClassificationMapping> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    storageClassificationName,
    storageClassificationMappingName,
    options,
  );
  return _getDeserialize(result);
}
