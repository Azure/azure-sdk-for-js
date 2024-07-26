// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { PrivateEndpointConnectionResource } from "../../models/models.js";
import {
  privateEndpointConnectionsListConnections,
  privateEndpointConnectionsGet,
  privateEndpointConnectionsCreate,
  privateEndpointConnectionsDelete,
} from "../../api/privateEndpointConnections/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  PrivateEndpointConnectionsListConnectionsOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
} from "../../models/options.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List existing private connections */
  listConnections: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateEndpointConnectionsListConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  /** Get a specific private connection */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
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
  /** Delete the private endpoint connection */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

export function getPrivateEndpointConnections(context: DocumentDBContext, subscriptionId: string) {
  return {
    listConnections: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateEndpointConnectionsListConnectionsOptionalParams,
    ) =>
      privateEndpointConnectionsListConnections(
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
      privateEndpointConnectionsGet(
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
  subscriptionId: string,
): PrivateEndpointConnectionsOperations {
  return {
    ...getPrivateEndpointConnections(context, subscriptionId),
  };
}
