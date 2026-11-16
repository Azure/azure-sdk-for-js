// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { SvmPeer, _SvmPeerListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  svmPeerDeserializer,
  _svmPeerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SvmPeersListByParentOptionalParams, SvmPeersGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  peerId: string,
  options: SvmPeersListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/clusterPeers/{peerId}/svmPeers{?api%2Dversion}",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_SvmPeerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _svmPeerListResultDeserializer(result.body);
}

/** List and describe all SVM Peers under a Cluster Peer */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  peerId: string,
  options: SvmPeersListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SvmPeer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, externalClusterName, peerId, options),
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
  svmPeerId: string,
  options: SvmPeersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/clusterPeers/{peerId}/svmPeers/{svmPeerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      peerId: peerId,
      svmPeerId: svmPeerId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SvmPeer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return svmPeerDeserializer(result.body);
}

/** Get the SVM Peer */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  peerId: string,
  svmPeerId: string,
  options: SvmPeersGetOptionalParams = { requestOptions: {} },
): Promise<SvmPeer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    externalClusterName,
    peerId,
    svmPeerId,
    options,
  );
  return _getDeserialize(result);
}
