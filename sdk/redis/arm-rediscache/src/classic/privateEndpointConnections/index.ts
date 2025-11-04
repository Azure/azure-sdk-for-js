// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, put, get } from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all the private endpoint connections associated with the redis cache. */
  list: (
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the redis cache. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the redis cache. */
  put: (
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the redis cache. */
  get: (
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: RedisManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      cacheName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      cacheName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cacheName, privateEndpointConnectionName, options),
    put: (
      resourceGroupName: string,
      cacheName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsPutOptionalParams,
    ) =>
      put(
        context,
        resourceGroupName,
        cacheName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      cacheName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, cacheName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: RedisManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
