// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { listAll, $delete, createOrUpdate, get } from "../../api/connections/operations.js";
import type {
  ConnectionsListAllOptionalParams,
  ConnectionsDeleteOptionalParams,
  ConnectionsCreateOrUpdateOptionalParams,
  ConnectionsGetOptionalParams,
} from "../../api/connections/options.js";
import type { Connection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** Get a list of connections. */
  listAll: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ConnectionsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Delete a connection. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a connection. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    resource: Connection,
    options?: ConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<Connection>;
  /** Get a connection. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
}
function _getConnections(context: ChaosManagementContext) {
  return {
    listAll: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ConnectionsListAllOptionalParams,
    ) => listAll(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, connectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      resource: Connection,
      options?: ConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, connectionName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, connectionName, options),
  };
}
export function _getConnectionsOperations(context: ChaosManagementContext): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
