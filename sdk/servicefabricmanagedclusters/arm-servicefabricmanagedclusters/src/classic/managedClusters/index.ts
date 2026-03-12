// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedClusters/operations.js";
import type {
  ManagedClustersListBySubscriptionOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "../../api/managedClusters/options.js";
import type { ManagedCluster, ManagedClusterUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedClusters operations. */
export interface ManagedClustersOperations {
  /** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
  listBySubscription: (
    options?: ManagedClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Delete a Service Fabric managed cluster resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the tags of of a Service Fabric managed cluster resource with the specified name. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ManagedClusterUpdateParameters,
    options?: ManagedClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
  /** Create or update a Service Fabric managed cluster resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ManagedCluster,
    options?: ManagedClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
  /** Get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedClustersGetOptionalParams,
  ) => Promise<ManagedCluster>;
}

function _getManagedClusters(context: ServiceFabricManagedClustersManagementContext) {
  return {
    listBySubscription: (options?: ManagedClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ManagedClusterUpdateParameters,
      options?: ManagedClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ManagedCluster,
      options?: ManagedClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedClustersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedClustersOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ManagedClustersOperations {
  return {
    ..._getManagedClusters(context),
  };
}
