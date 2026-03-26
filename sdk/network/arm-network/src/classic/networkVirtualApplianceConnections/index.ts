// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  get,
  createOrUpdate,
} from "../../api/networkVirtualApplianceConnections/operations.js";
import type {
  NetworkVirtualApplianceConnectionsListOptionalParams,
  NetworkVirtualApplianceConnectionsDeleteOptionalParams,
  NetworkVirtualApplianceConnectionsGetOptionalParams,
  NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
} from "../../api/networkVirtualApplianceConnections/options.js";
import type { NetworkVirtualApplianceConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkVirtualApplianceConnections operations. */
export interface NetworkVirtualApplianceConnectionsOperations {
  /** Lists NetworkVirtualApplianceConnections under the NVA. */
  list: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualApplianceConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkVirtualApplianceConnection>;
  /** Deletes a NVA connection. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves the details of specified NVA connection. */
  get: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    options?: NetworkVirtualApplianceConnectionsGetOptionalParams,
  ) => Promise<NetworkVirtualApplianceConnection>;
  /** Creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA connection' */
  createOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
    options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<NetworkVirtualApplianceConnection>,
    NetworkVirtualApplianceConnection
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
    options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkVirtualApplianceConnection>,
      NetworkVirtualApplianceConnection
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    connectionName: string,
    networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
    options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkVirtualApplianceConnection>;
}

function _getNetworkVirtualApplianceConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualApplianceConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, networkVirtualApplianceName, options),
    delete: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkVirtualApplianceName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      options?: NetworkVirtualApplianceConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, networkVirtualApplianceName, connectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
      options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        networkVirtualApplianceConnectionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
      options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        networkVirtualApplianceConnectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      connectionName: string,
      networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
      options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        networkVirtualApplianceConnectionParameters,
        options,
      );
    },
  };
}

export function _getNetworkVirtualApplianceConnectionsOperations(
  context: NetworkManagementContext,
): NetworkVirtualApplianceConnectionsOperations {
  return {
    ..._getNetworkVirtualApplianceConnections(context),
  };
}
