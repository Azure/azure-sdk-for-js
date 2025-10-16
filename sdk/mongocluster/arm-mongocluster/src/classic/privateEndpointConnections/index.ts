// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import {
  $delete,
  create,
  get,
  listByMongoCluster,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsListByMongoClusterOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Delete the private endpoint connection */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Private endpoint connection */
  create: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
  /** Get a specific private connection */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  /** List existing private connections */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnections(context: MongoClusterManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, mongoClusterName, privateEndpointConnectionName, options),
    create: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, mongoClusterName, privateEndpointConnectionName, options),
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
    ) => listByMongoCluster(context, resourceGroupName, mongoClusterName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: MongoClusterManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
