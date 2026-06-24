// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQLContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ClusterServer,
  clusterServerDeserializer,
  _ClusterServerListResult,
  _clusterServerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ServersListByClusterOptionalParams, ServersGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ServersListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/servers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterServerListResultDeserializer(result.body);
}

/** Lists servers of a cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ServersListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterServer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-03-02-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/servers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ClusterServer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterServerDeserializer(result.body);
}

/** Gets information about a server in cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): Promise<ClusterServer> {
  const result = await _getSend(context, resourceGroupName, clusterName, serverName, options);
  return _getDeserialize(result);
}
