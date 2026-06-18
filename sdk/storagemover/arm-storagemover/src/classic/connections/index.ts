// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import { $delete, list, get, createOrUpdate } from "../../api/connections/operations.js";
import {
  ConnectionsDeleteOptionalParams,
  ConnectionsListOptionalParams,
  ConnectionsGetOptionalParams,
  ConnectionsCreateOrUpdateOptionalParams,
} from "../../api/connections/options.js";
import { Connection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /**
   * Deletes a Connection resource.
   * Returns 409 if there are active jobs using this connection.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    connectionName: string,
    options?: ConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all Connections in a Storage Mover. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: ConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Gets a Connection resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    connectionName: string,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
  /** Creates or updates a Connection resource. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    connectionName: string,
    connection: Connection,
    options?: ConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<Connection>;
}

function _getConnections(context: StorageMoverContext) {
  return {
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      connectionName: string,
      options?: ConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageMoverName, connectionName, options),
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: ConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, storageMoverName, options),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      connectionName: string,
      options?: ConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, connectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      connectionName: string,
      connection: Connection,
      options?: ConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageMoverName,
        connectionName,
        connection,
        options,
      ),
  };
}

export function _getConnectionsOperations(context: StorageMoverContext): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
