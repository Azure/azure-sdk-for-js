// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import {
  listByService,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets a list of all private endpoint connections in the given service. */
  listByService: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateEndpointConnectionsListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Disconnects the private endpoint connection and deletes it from the search service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Updates a private endpoint connection to the search service in the given resource group. */
  update: (
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the details of the private endpoint connection to the search service in the given resource group. */
  get: (
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: SearchManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: PrivateEndpointConnectionsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, searchServiceName, options),
    delete: (
      resourceGroupName: string,
      searchServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        searchServiceName,
        privateEndpointConnectionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      searchServiceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        searchServiceName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    get: (
      resourceGroupName: string,
      searchServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, searchServiceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: SearchManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
