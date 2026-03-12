// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  StorageClassification,
  _StorageClassificationCollection,
} from "../../models/models.js";
import {
  storageClassificationDeserializer,
  _storageClassificationCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationStorageClassificationsListOptionalParams,
  ReplicationStorageClassificationsListByReplicationFabricsOptionalParams,
  ReplicationStorageClassificationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationStorageClassificationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationStorageClassifications{?api%2Dversion}",
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
): Promise<_StorageClassificationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _storageClassificationCollectionDeserializer(result.body);
}

/** Lists the storage classifications in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationStorageClassificationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageClassification> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _listByReplicationFabricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationStorageClassificationsListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
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

export async function _listByReplicationFabricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageClassificationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _storageClassificationCollectionDeserializer(result.body);
}

/** Lists the storage classifications available in the specified fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationStorageClassificationsListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StorageClassification> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationFabricsSend(context, resourceGroupName, resourceName, fabricName, options),
    _listByReplicationFabricsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  options: ReplicationStorageClassificationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return storageClassificationDeserializer(result.body);
}

/** Gets the details of the specified storage classification. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  storageClassificationName: string,
  options: ReplicationStorageClassificationsGetOptionalParams = { requestOptions: {} },
): Promise<StorageClassification> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    storageClassificationName,
    options,
  );
  return _getDeserialize(result);
}
