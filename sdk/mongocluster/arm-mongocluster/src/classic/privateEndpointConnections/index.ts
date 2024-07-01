// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { PrivateEndpointConnectionResource } from "../../models/models.js";
import {
  listByMongoCluster,
  get,
  create,
  $delete,
} from "../../api/privateEndpointConnections/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  PrivateEndpointConnectionsListByMongoClusterOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
} from "../../models/options.js";

export interface PrivateEndpointConnectionsOperations {
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
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
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

export function getPrivateEndpointConnections(
  context: DocumentDBContext,
  subscriptionId: string,
) {
  return {
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
    ) =>
      listByMongoCluster(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        options,
      ),
    create: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function getPrivateEndpointConnectionsOperations(
  context: DocumentDBContext,
  subscriptionId: string,
): PrivateEndpointConnectionsOperations {
  return {
    ...getPrivateEndpointConnections(context, subscriptionId),
  };
}
