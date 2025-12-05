// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeDiskContext } from "../../api/computeDiskContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use deleteAPrivateEndpointConnection instead */
  beginDeleteAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAPrivateEndpointConnection instead */
  beginDeleteAPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
  updateAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateAPrivateEndpointConnection instead */
  beginUpdateAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateAPrivateEndpointConnection instead */
  beginUpdateAPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Gets information about a private endpoint connection under a disk access resource. */
  getAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: ComputeDiskContext) {
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
    beginDeleteAPrivateEndpointConnection: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
    ) => {
      return await deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      );
    },
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
    beginUpdateAPrivateEndpointConnection: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
    ) => {
      return await updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
    },
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
  context: ComputeDiskContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
