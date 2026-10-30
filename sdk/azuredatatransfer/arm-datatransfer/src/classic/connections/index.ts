// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  listPendingFlowsList,
  list,
  link,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connections/operations.js";
import type {
  ConnectionsListPendingFlowsListOptionalParams,
  ConnectionsListOptionalParams,
  ConnectionsLinkOptionalParams,
  ConnectionsListBySubscriptionOptionalParams,
  ConnectionsListByResourceGroupOptionalParams,
  ConnectionsDeleteOptionalParams,
  ConnectionsUpdateOptionalParams,
  ConnectionsCreateOrUpdateOptionalParams,
  ConnectionsGetOptionalParams,
} from "../../api/connections/options.js";
import type {
  ResourceBody,
  Connection,
  ConnectionsPatch,
  PendingConnection,
  PendingFlow,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** Lists all remote flows that have not yet been linked to local flows */
  listPendingFlowsList: (
    resourceGroupName: string,
    connectionName: string,
    options?: ConnectionsListPendingFlowsListOptionalParams,
  ) => PagedAsyncIterableIterator<PendingFlow>;
  /** Lists all pending remote connections that are linkable to this connection. */
  list: (
    resourceGroupName: string,
    connectionName: string,
    options?: ConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PendingConnection>;
  /** Links the connection to its pending connection. */
  link: (
    resourceGroupName: string,
    connectionName: string,
    connection: ResourceBody,
    options?: ConnectionsLinkOptionalParams,
  ) => PollerLike<OperationState<Connection>, Connection>;
  /** Gets connections in a subscription. */
  listBySubscription: (
    options?: ConnectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Gets connections in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Deletes the connection resource. */
  delete: (
    resourceGroupName: string,
    connectionName: string,
    options?: ConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the connection resource. */
  update: (
    resourceGroupName: string,
    connectionName: string,
    connection: ConnectionsPatch,
    options?: ConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates the connection resource. */
  createOrUpdate: (
    resourceGroupName: string,
    connectionName: string,
    connection: Connection,
    options?: ConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Connection>, Connection>;
  /** Gets connection resource. */
  get: (
    resourceGroupName: string,
    connectionName: string,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
}

function _getConnections(context: AzureDataTransferContext) {
  return {
    listPendingFlowsList: (
      resourceGroupName: string,
      connectionName: string,
      options?: ConnectionsListPendingFlowsListOptionalParams,
    ) => listPendingFlowsList(context, resourceGroupName, connectionName, options),
    list: (
      resourceGroupName: string,
      connectionName: string,
      options?: ConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, connectionName, options),
    link: (
      resourceGroupName: string,
      connectionName: string,
      connection: ResourceBody,
      options?: ConnectionsLinkOptionalParams,
    ) => link(context, resourceGroupName, connectionName, connection, options),
    listBySubscription: (options?: ConnectionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      connectionName: string,
      options?: ConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectionName, options),
    update: (
      resourceGroupName: string,
      connectionName: string,
      connection: ConnectionsPatch,
      options?: ConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, connectionName, connection, options),
    createOrUpdate: (
      resourceGroupName: string,
      connectionName: string,
      connection: Connection,
      options?: ConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, connectionName, connection, options),
    get: (
      resourceGroupName: string,
      connectionName: string,
      options?: ConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, connectionName, options),
  };
}

export function _getConnectionsOperations(
  context: AzureDataTransferContext,
): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
