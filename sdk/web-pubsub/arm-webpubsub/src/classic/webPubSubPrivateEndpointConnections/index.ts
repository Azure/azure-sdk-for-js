// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  $delete,
  update,
  get,
} from "../../api/webPubSubPrivateEndpointConnections/operations.js";
import {
  WebPubSubPrivateEndpointConnectionsListOptionalParams,
  WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
  WebPubSubPrivateEndpointConnectionsUpdateOptionalParams,
  WebPubSubPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/webPubSubPrivateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubPrivateEndpointConnections operations. */
export interface WebPubSubPrivateEndpointConnectionsOperations {
  /** List private endpoint connections */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete the specified private endpoint connection */
  delete: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection */
  update: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: PrivateEndpointConnection,
    options?: WebPubSubPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Get the specified private endpoint connection */
  get: (
    privateEndpointConnectionName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getWebPubSubPrivateEndpointConnections(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, privateEndpointConnectionName, resourceGroupName, resourceName, options),
    beginDelete: async (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        privateEndpointConnectionName,
        resourceGroupName,
        resourceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        privateEndpointConnectionName,
        resourceGroupName,
        resourceName,
        options,
      );
    },
    update: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: PrivateEndpointConnection,
      options?: WebPubSubPrivateEndpointConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        privateEndpointConnectionName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      ),
    get: (
      privateEndpointConnectionName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, privateEndpointConnectionName, resourceGroupName, resourceName, options),
  };
}

export function _getWebPubSubPrivateEndpointConnectionsOperations(
  context: WebPubSubManagementContext,
): WebPubSubPrivateEndpointConnectionsOperations {
  return {
    ..._getWebPubSubPrivateEndpointConnections(context),
  };
}
