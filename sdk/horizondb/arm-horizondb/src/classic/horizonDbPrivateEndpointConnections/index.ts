// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  $delete,
  updateStatus,
  list,
  get,
} from "../../api/horizonDbPrivateEndpointConnections/operations.js";
import type {
  HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams,
  HorizonDbPrivateEndpointConnectionsListOptionalParams,
  HorizonDbPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/horizonDbPrivateEndpointConnections/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbPrivateEndpointConnections operations. */
export interface HorizonDbPrivateEndpointConnectionsOperations {
  /** Deletes a private endpoint connection. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approves or rejects a private endpoint connection. */
  updateStatus: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResource,
    options?: HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
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
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        options,
      );
    },
    updateStatus: (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams,
    ) =>
      updateStatus(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
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
