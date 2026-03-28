// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type { LogicalNetwork, _LogicalNetworkCollection } from "../../models/models.js";
import {
  logicalNetworkDeserializer,
  _logicalNetworkCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationLogicalNetworksListByReplicationFabricsOptionalParams,
  ReplicationLogicalNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByReplicationFabricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationLogicalNetworksListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationLogicalNetworks{?api%2Dversion}",
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
): Promise<_LogicalNetworkCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _logicalNetworkCollectionDeserializer(result.body);
}

/** Lists all the logical networks of the Azure Site Recovery fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationLogicalNetworksListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LogicalNetwork> {
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
  logicalNetworkName: string,
  options: ReplicationLogicalNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationLogicalNetworks/{logicalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      logicalNetworkName: logicalNetworkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LogicalNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return logicalNetworkDeserializer(result.body);
}

/** Gets the details of a logical network. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  logicalNetworkName: string,
  options: ReplicationLogicalNetworksGetOptionalParams = { requestOptions: {} },
): Promise<LogicalNetwork> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    logicalNetworkName,
    options,
  );
  return _getDeserialize(result);
}
