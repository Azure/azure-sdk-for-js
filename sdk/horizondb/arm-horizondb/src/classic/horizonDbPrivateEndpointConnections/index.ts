// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  $delete,
  update,
  list,
  get,
} from "../../api/horizonDbPrivateEndpointConnections/operations.js";
import {
  HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
  HorizonDbPrivateEndpointConnectionsListOptionalParams,
  HorizonDbPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/horizonDbPrivateEndpointConnections/options.js";
import {
  PrivateEndpointConnectionResource,
  PrivateEndpointConnectionUpdate,
  PrivateEndpointConnection,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbPrivateEndpointConnections operations. */
export interface HorizonDbPrivateEndpointConnectionsOperations {
  /** Deletes a private endpoint connection. */
  delete: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a private endpoint connection. */
  update: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionUpdate,
    options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionUpdate,
    options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionUpdate,
    options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Lists private endpoint connections in a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getHorizonDbPrivateEndpointConnections(context: HorizonDbContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, privateEndpointConnectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, privateEndpointConnectionName, options);
    },
    update: (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionUpdate,
      options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateEndpointConnectionName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionUpdate,
      options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        privateEndpointConnectionName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionUpdate,
      options?: HorizonDbPrivateEndpointConnectionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        privateEndpointConnectionName,
        properties,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, privateEndpointConnectionName, options),
  };
}

export function _getHorizonDbPrivateEndpointConnectionsOperations(
  context: HorizonDbContext,
): HorizonDbPrivateEndpointConnectionsOperations {
  return {
    ..._getHorizonDbPrivateEndpointConnections(context),
  };
}
