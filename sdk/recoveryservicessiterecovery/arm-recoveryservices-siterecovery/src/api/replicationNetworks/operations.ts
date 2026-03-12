// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type { Network, _NetworkCollection } from "../../models/models.js";
import { networkDeserializer, _networkCollectionDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationNetworksListOptionalParams,
  ReplicationNetworksListByReplicationFabricsOptionalParams,
  ReplicationNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationNetworksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationNetworks{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_NetworkCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _networkCollectionDeserializer(result.body);
}

/** Lists the networks available in a vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationNetworksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Network> {
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
  options: ReplicationNetworksListByReplicationFabricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks{?api%2Dversion}",
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
): Promise<_NetworkCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _networkCollectionDeserializer(result.body);
}

/** Lists the networks available for a fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationNetworksListByReplicationFabricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Network> {
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
  networkName: string,
  options: ReplicationNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      networkName: networkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Network> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return networkDeserializer(result.body);
}

/** Gets the details of a network. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  networkName: string,
  options: ReplicationNetworksGetOptionalParams = { requestOptions: {} },
): Promise<Network> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    networkName,
    options,
  );
  return _getDeserialize(result);
}
