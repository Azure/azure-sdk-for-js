// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, $delete, put, get } from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all the private endpoint connections associated with the storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the storage account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the storage account. */
  put: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the storage account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, privateEndpointConnectionName, options),
    put: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsPutOptionalParams,
    ) =>
      put(
        context,
        resourceGroupName,
        accountName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: StorageManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
