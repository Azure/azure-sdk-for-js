// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import {
  bgpPeersGet,
  bgpPeersCreateOrUpdate,
  bgpPeersDelete,
  bgpPeersList,
} from "../../api/bgpPeers/index.js";
import { BgpPeer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  BgpPeersGetOptionalParams,
  BgpPeersCreateOrUpdateOptionalParams,
  BgpPeersDeleteOptionalParams,
  BgpPeersListOptionalParams,
} from "../../api/options.js";

/** Interface representing a BgpPeers operations. */
export interface BgpPeersOperations {
  /** Get a BgpPeer */
  get: (
    resourceUri: string,
    bgpPeerName: string,
    options?: BgpPeersGetOptionalParams,
  ) => Promise<BgpPeer>;
  /** Create a BgpPeer */
  createOrUpdate: (
    resourceUri: string,
    bgpPeerName: string,
    resource: BgpPeer,
    options?: BgpPeersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BgpPeer>, BgpPeer>;
  /** Delete a BgpPeer */
  delete: (
    resourceUri: string,
    bgpPeerName: string,
    options?: BgpPeersDeleteOptionalParams,
  ) => Promise<void>;
  /** List BgpPeer resources by parent */
  list: (
    resourceUri: string,
    options?: BgpPeersListOptionalParams,
  ) => PagedAsyncIterableIterator<BgpPeer>;
}

export function getBgpPeers(context: KubernetesRuntimeContext) {
  return {
    get: (
      resourceUri: string,
      bgpPeerName: string,
      options?: BgpPeersGetOptionalParams,
    ) => bgpPeersGet(context, resourceUri, bgpPeerName, options),
    createOrUpdate: (
      resourceUri: string,
      bgpPeerName: string,
      resource: BgpPeer,
      options?: BgpPeersCreateOrUpdateOptionalParams,
    ) =>
      bgpPeersCreateOrUpdate(
        context,
        resourceUri,
        bgpPeerName,
        resource,
        options,
      ),
    delete: (
      resourceUri: string,
      bgpPeerName: string,
      options?: BgpPeersDeleteOptionalParams,
    ) => bgpPeersDelete(context, resourceUri, bgpPeerName, options),
    list: (resourceUri: string, options?: BgpPeersListOptionalParams) =>
      bgpPeersList(context, resourceUri, options),
  };
}

export function getBgpPeersOperations(
  context: KubernetesRuntimeContext,
): BgpPeersOperations {
  return {
    ...getBgpPeers(context),
  };
}
