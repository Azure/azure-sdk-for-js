// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { ClusterPeer, _ClusterPeerListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  clusterPeerDeserializer,
  _clusterPeerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClusterPeersListByParentOptionalParams,
  ClusterPeersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ClusterPeersListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/clusterPeers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterPeerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterPeerListResultDeserializer(result.body);
}

/** List all Cluster Peers under an External Cluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ClusterPeersListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterPeer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, externalClusterName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  peerId: string,
  options: ClusterPeersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/clusterPeers/{peerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      peerId: peerId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ClusterPeer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterPeerDeserializer(result.body);
}

/** Get the Cluster Peer */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  peerId: string,
  options: ClusterPeersGetOptionalParams = { requestOptions: {} },
): Promise<ClusterPeer> {
  const result = await _getSend(context, resourceGroupName, externalClusterName, peerId, options);
  return _getDeserialize(result);
}
