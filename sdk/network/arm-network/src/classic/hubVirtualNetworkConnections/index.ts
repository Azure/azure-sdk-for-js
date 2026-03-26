// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  get,
  $delete,
  createOrUpdate,
} from "../../api/hubVirtualNetworkConnections/operations.js";
import type {
  HubVirtualNetworkConnectionsListOptionalParams,
  HubVirtualNetworkConnectionsGetOptionalParams,
  HubVirtualNetworkConnectionsDeleteOptionalParams,
  HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
} from "../../api/hubVirtualNetworkConnections/options.js";
import type { HubVirtualNetworkConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HubVirtualNetworkConnections operations. */
export interface HubVirtualNetworkConnectionsOperations {
  /** Retrieves the details of all HubVirtualNetworkConnections. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: HubVirtualNetworkConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<HubVirtualNetworkConnection>;
  /** Retrieves the details of a HubVirtualNetworkConnection. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: HubVirtualNetworkConnectionsGetOptionalParams,
  ) => Promise<HubVirtualNetworkConnection>;
  /** Deletes a HubVirtualNetworkConnection. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a hub virtual network connection if it doesn't exist else updates the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
    options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HubVirtualNetworkConnection>, HubVirtualNetworkConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
    options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<HubVirtualNetworkConnection>, HubVirtualNetworkConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
    options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<HubVirtualNetworkConnection>;
}

function _getHubVirtualNetworkConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: HubVirtualNetworkConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: HubVirtualNetworkConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, connectionName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, connectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: HubVirtualNetworkConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, connectionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
      options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        hubVirtualNetworkConnectionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
      options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        hubVirtualNetworkConnectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection,
      options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        hubVirtualNetworkConnectionParameters,
        options,
      );
    },
  };
}

export function _getHubVirtualNetworkConnectionsOperations(
  context: NetworkManagementContext,
): HubVirtualNetworkConnectionsOperations {
  return {
    ..._getHubVirtualNetworkConnections(context),
  };
}
