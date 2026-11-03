// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  $delete,
  approveOrReject,
  list,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsApproveOrRejectOptionalParams,
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type {
  PrivateEndpointConnectionResource,
  PrivateEndpointConnectionResourceCreateOrUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Deletes a private endpoint connection. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approves or rejects an existing private endpoint connection. Approval requires the parent Cluster to contain at least one Pool. An approval attempt when the Cluster has no Pools fails with 409 Conflict and the stable error code PrivateEndpointRequiresPool. Rejection remains allowed when the Cluster has no Pools so that existing connections can be cleaned up. */
  approveOrReject: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResourceCreateOrUpdate,
    options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
  /** @deprecated use approveOrReject instead */
  beginApproveOrReject: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResourceCreateOrUpdate,
    options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionResource>,
      PrivateEndpointConnectionResource
    >
  >;
  /** @deprecated use approveOrReject instead */
  beginApproveOrRejectAndWait: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResourceCreateOrUpdate,
    options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  /** Lists private endpoint connections in a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnections(context: HorizonDbContext) {
  return {
    delete: (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
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
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        options,
      );
    },
    approveOrReject: (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResourceCreateOrUpdate,
      options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
    ) =>
      approveOrReject(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    beginApproveOrReject: async (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResourceCreateOrUpdate,
      options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
    ) => {
      const poller = approveOrReject(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveOrRejectAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResourceCreateOrUpdate,
      options?: PrivateEndpointConnectionsApproveOrRejectOptionalParams,
    ) => {
      return await approveOrReject(
        context,
        resourceGroupName,
        clusterName,
        privateEndpointConnectionName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: HorizonDbContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
