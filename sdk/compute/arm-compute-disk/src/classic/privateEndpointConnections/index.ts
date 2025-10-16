// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listPrivateEndpointConnections,
  deleteAPrivateEndpointConnection,
  updateAPrivateEndpointConnection,
  getAPrivateEndpointConnection,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams,
  PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
  PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List information about private endpoint connections under a disk access resource */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes a private endpoint connection under a disk access resource. */
  deleteAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
  updateAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets information about a private endpoint connection under a disk access resource. */
  getAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: ComputeManagementContext) {
  return {
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams,
    ) => listPrivateEndpointConnections(context, resourceGroupName, diskAccessName, options),
    deleteAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
    ) =>
      deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      ),
    updateAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
    ) =>
      updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    getAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams,
    ) =>
      getAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: ComputeManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
