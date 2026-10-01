// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, put, get } from "../../api/privateEndpointConnections/operations.js";
import {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all the private endpoint connections associated with the redis cache. */
  list: (
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the redis cache. */
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
  /** @deprecated use put instead */
  beginPut: (
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use put instead */
  beginPutAndWait: (
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
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
    beginPut: async (
      resourceGroupName: string,
      cacheName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsPutOptionalParams,
    ) => {
      const poller = put(
        context,
        resourceGroupName,
        cacheName,
        privateEndpointConnectionName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPutAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsPutOptionalParams,
    ) => {
      return await put(
        context,
        resourceGroupName,
        cacheName,
        privateEndpointConnectionName,
        properties,
        options,
      );
    },
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
