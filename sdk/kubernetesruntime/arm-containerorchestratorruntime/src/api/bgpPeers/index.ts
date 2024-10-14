// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { bgpPeerPropertiesSerializer, BgpPeer, _BgpPeerListResult } from "../../models/models.js";
import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  BgpPeersGetOptionalParams,
  BgpPeersCreateOrUpdateOptionalParams,
  BgpPeersDeleteOptionalParams,
  BgpPeersListOptionalParams,
} from "../../models/options.js";

export function _bgpPeersGetSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
      resourceUri,
      bgpPeerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersGetDeserialize(result: PathUncheckedResponse): Promise<BgpPeer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          myAsn: result.body.properties?.["myAsn"],
          peerAsn: result.body.properties?.["peerAsn"],
          peerAddress: result.body.properties?.["peerAddress"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a BgpPeer */
export async function bgpPeersGet(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): Promise<BgpPeer> {
  const result = await _bgpPeersGetSend(context, resourceUri, bgpPeerName, options);
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
      resourceUri,
      bgpPeerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : bgpPeerPropertiesSerializer(resource.properties),
      },
    });
}

export async function _bgpPeersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BgpPeer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          myAsn: result.body.properties?.["myAsn"],
          peerAsn: result.body.properties?.["peerAsn"],
          peerAddress: result.body.properties?.["peerAddress"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a BgpPeer */
export function bgpPeersCreateOrUpdate(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  resource: BgpPeer,
  options: BgpPeersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BgpPeer>, BgpPeer> {
  return getLongRunningPoller(context, _bgpPeersCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _bgpPeersCreateOrUpdateSend(context, resourceUri, bgpPeerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BgpPeer>, BgpPeer>;
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
      resourceUri,
      bgpPeerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
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
  const result = await _bgpPeersDeleteSend(context, resourceUri, bgpPeerName, options);
  return _bgpPeersDeleteDeserialize(result);
}

export function _bgpPeersListSend(
  context: Client,
  resourceUri: string,
  options: BgpPeersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers", resourceUri)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _bgpPeersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_BgpPeerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              myAsn: p.properties?.["myAsn"],
              peerAsn: p.properties?.["peerAsn"],
              peerAddress: p.properties?.["peerAddress"],
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
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
