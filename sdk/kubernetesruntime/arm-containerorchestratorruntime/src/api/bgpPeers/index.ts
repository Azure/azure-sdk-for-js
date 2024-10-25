// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BgpPeersCreateOrUpdateOptionalParams,
  BgpPeersDeleteOptionalParams,
  BgpPeersGetOptionalParams,
  BgpPeersListOptionalParams,
  KubernetesRuntimeContext as Client,
} from "../index.js";
import {
  BgpPeer,
  bgpPeerSerializer,
  bgpPeerDeserializer,
  _BgpPeerListResult,
  _bgpPeerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _bgpPeersGetSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
      { value: resourceUri, allowReserved: true },
      bgpPeerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BgpPeer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return bgpPeerDeserializer(result.body);
}

/** Get a BgpPeer */
export async function bgpPeersGet(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): Promise<BgpPeer> {
  const result = await _bgpPeersGetSend(
    context,
    resourceUri,
    bgpPeerName,
    options,
  );
  return _bgpPeersGetDeserialize(result);
}

export function _bgpPeersCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  resource: BgpPeer,
  options: BgpPeersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
      { value: resourceUri, allowReserved: true },
      bgpPeerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: bgpPeerSerializer(resource),
    });
}

export async function _bgpPeersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BgpPeer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return bgpPeerDeserializer(result.body);
}

/** Create a BgpPeer */
export function bgpPeersCreateOrUpdate(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  resource: BgpPeer,
  options: BgpPeersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BgpPeer>, BgpPeer> {
  return getLongRunningPoller(
    context,
    _bgpPeersCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _bgpPeersCreateOrUpdateSend(
          context,
          resourceUri,
          bgpPeerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<BgpPeer>, BgpPeer>;
}

export function _bgpPeersDeleteSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
      { value: resourceUri, allowReserved: true },
      bgpPeerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a BgpPeer */
export async function bgpPeersDelete(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _bgpPeersDeleteSend(
    context,
    resourceUri,
    bgpPeerName,
    options,
  );
  return _bgpPeersDeleteDeserialize(result);
}

export function _bgpPeersListSend(
  context: Client,
  resourceUri: string,
  options: BgpPeersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers", {
      value: resourceUri,
      allowReserved: true,
    })
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_BgpPeerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _bgpPeerListResultDeserializer(result.body);
}

/** List BgpPeer resources by parent */
export function bgpPeersList(
  context: Client,
  resourceUri: string,
  options: BgpPeersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BgpPeer> {
  return buildPagedAsyncIterator(
    context,
    () => _bgpPeersListSend(context, resourceUri, options),
    _bgpPeersListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
