// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  listAvailableClusterRegion,
  listNamespaces,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersListAvailableClusterRegionOptionalParams,
  ClustersListNamespacesOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  Cluster,
  EHNamespaceIdListResult,
  AvailableClustersList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** List the quantity of available pre-provisioned Event Hubs Clusters, indexed by Azure region. */
  listAvailableClusterRegion: (
    options?: ClustersListAvailableClusterRegionOptionalParams,
  ) => Promise<AvailableClustersList>;
  /** List all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster. */
  listNamespaces: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListNamespacesOptionalParams,
  ) => Promise<EHNamespaceIdListResult>;
  /** Lists the available Event Hubs Clusters within an ARM resource group */
  listBySubscription: (
    options?: ClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Lists the available Event Hubs Clusters within an ARM resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes an existing Event Hubs Cluster. This operation is idempotent. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Modifies mutable properties on the Event Hubs Cluster. This operation is idempotent. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Creates or updates an instance of an Event Hubs Cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Gets the resource description of the specified Event Hubs Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: EventHubManagementContext) {
  return {
    listAvailableClusterRegion: (options?: ClustersListAvailableClusterRegionOptionalParams) =>
      listAvailableClusterRegion(context, options),
    listNamespaces: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListNamespacesOptionalParams,
    ) => listNamespaces(context, resourceGroupName, clusterName, options),
    listBySubscription: (options?: ClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, parameters, options),
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: EventHubManagementContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
