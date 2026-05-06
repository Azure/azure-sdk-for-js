// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  updateRelayPrivateEndpointConnection,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusterManagers/operations.js";
import {
  ClusterManagersUpdateRelayPrivateEndpointConnectionOptionalParams,
  ClusterManagersListBySubscriptionOptionalParams,
  ClusterManagersListByResourceGroupOptionalParams,
  ClusterManagersDeleteOptionalParams,
  ClusterManagersUpdateOptionalParams,
  ClusterManagersCreateOrUpdateOptionalParams,
  ClusterManagersGetOptionalParams,
} from "../../api/clusterManagers/options.js";
import { OperationStatusResult, ClusterManager } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClusterManagers operations. */
export interface ClusterManagersOperations {
  /** Update the private endpoint connection for the Azure Relay namespace managed by the specified cluster manager. Use this operation to approve or reject a pending private endpoint connection request for the relay namespace managed by the cluster manager. */
  updateRelayPrivateEndpointConnection: (
    resourceGroupName: string,
    clusterManagerName: string,
    options?: ClusterManagersUpdateRelayPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Get a list of cluster managers in the provided subscription. */
  listBySubscription: (
    options?: ClusterManagersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterManager>;
  /** Get a list of cluster managers in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClusterManagersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterManager>;
  /** Delete the provided cluster manager. */
  delete: (
    resourceGroupName: string,
    clusterManagerName: string,
    options?: ClusterManagersDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    clusterManagerName: string,
    options?: ClusterManagersUpdateOptionalParams,
  ) => Promise<ClusterManager>;
  /** Create a new cluster manager or update properties of the cluster manager if it exists. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterManagerName: string,
    clusterManagerParameters: ClusterManager,
    options?: ClusterManagersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterManager>, ClusterManager>;
  /** Get the properties of the provided cluster manager. */
  get: (
    resourceGroupName: string,
    clusterManagerName: string,
    options?: ClusterManagersGetOptionalParams,
  ) => Promise<ClusterManager>;
}

function _getClusterManagers(context: NetworkCloudContext) {
  return {
    updateRelayPrivateEndpointConnection: (
      resourceGroupName: string,
      clusterManagerName: string,
      options?: ClusterManagersUpdateRelayPrivateEndpointConnectionOptionalParams,
    ) =>
      updateRelayPrivateEndpointConnection(context, resourceGroupName, clusterManagerName, options),
    listBySubscription: (options?: ClusterManagersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClusterManagersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterManagerName: string,
      options?: ClusterManagersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterManagerName, options),
    update: (
      resourceGroupName: string,
      clusterManagerName: string,
      options?: ClusterManagersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterManagerName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterManagerName: string,
      clusterManagerParameters: ClusterManager,
      options?: ClusterManagersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterManagerName,
        clusterManagerParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterManagerName: string,
      options?: ClusterManagersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterManagerName, options),
  };
}

export function _getClusterManagersOperations(
  context: NetworkCloudContext,
): ClusterManagersOperations {
  return {
    ..._getClusterManagers(context),
  };
}
