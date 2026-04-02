// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAdvertisedRoutes,
  listLearnedRoutes,
  list,
} from "../../api/virtualHubBgpConnections/operations.js";
import type {
  VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
  VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
  VirtualHubBgpConnectionsListOptionalParams,
} from "../../api/virtualHubBgpConnections/options.js";
import type { BgpConnection, PeerRoute } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHubBgpConnections operations. */
export interface VirtualHubBgpConnectionsOperations {
  /** Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer. */
  listAdvertisedRoutes: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
  ) => PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>;
  /** @deprecated use listAdvertisedRoutes instead */
  beginListAdvertisedRoutes: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>
  >;
  /** @deprecated use listAdvertisedRoutes instead */
  beginListAdvertisedRoutesAndWait: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
  ) => Promise<Record<string, PeerRoute[]>>;
  /** Retrieves a list of routes the virtual hub bgp connection has learned. */
  listLearnedRoutes: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
  ) => PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>;
  /** @deprecated use listLearnedRoutes instead */
  beginListLearnedRoutes: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>
  >;
  /** @deprecated use listLearnedRoutes instead */
  beginListLearnedRoutesAndWait: (
    resourceGroupName: string,
    hubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
  ) => Promise<Record<string, PeerRoute[]>>;
  /** Retrieves the details of all VirtualHubBgpConnections. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubBgpConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<BgpConnection>;
}

function _getVirtualHubBgpConnections(context: NetworkManagementContext) {
  return {
    listAdvertisedRoutes: (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
    ) => listAdvertisedRoutes(context, resourceGroupName, hubName, connectionName, options),
    beginListAdvertisedRoutes: async (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
    ) => {
      const poller = listAdvertisedRoutes(
        context,
        resourceGroupName,
        hubName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListAdvertisedRoutesAndWait: async (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
    ) => {
      return await listAdvertisedRoutes(
        context,
        resourceGroupName,
        hubName,
        connectionName,
        options,
      );
    },
    listLearnedRoutes: (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
    ) => listLearnedRoutes(context, resourceGroupName, hubName, connectionName, options),
    beginListLearnedRoutes: async (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
    ) => {
      const poller = listLearnedRoutes(
        context,
        resourceGroupName,
        hubName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListLearnedRoutesAndWait: async (
      resourceGroupName: string,
      hubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
    ) => {
      return await listLearnedRoutes(context, resourceGroupName, hubName, connectionName, options);
    },
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubBgpConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
  };
}

export function _getVirtualHubBgpConnectionsOperations(
  context: NetworkManagementContext,
): VirtualHubBgpConnectionsOperations {
  return {
    ..._getVirtualHubBgpConnections(context),
  };
}
