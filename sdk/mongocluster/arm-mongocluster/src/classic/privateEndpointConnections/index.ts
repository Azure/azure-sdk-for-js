// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { PrivateEndpointConnectionResource } from "../../models/models.js";
import {
  privateEndpointConnectionsListByMongoCluster,
  privateEndpointConnectionsGet,
  privateEndpointConnectionsCreate,
  privateEndpointConnectionsDelete,
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
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  create: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  delete: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

export function getPrivateEndpointConnections(context: DocumentDBContext) {
  return {
    listByMongoCluster: (
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateEndpointConnectionsListByMongoClusterOptionalParams,
    ) =>
      privateEndpointConnectionsListByMongoCluster(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      privateEndpointConnectionsGet(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        options,
      ),
    create: (
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      privateEndpointConnectionsCreate(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    delete: (
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      privateEndpointConnectionsDelete(
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
): PrivateEndpointConnectionsOperations {
  return {
    ...getPrivateEndpointConnections(context),
  };
}
