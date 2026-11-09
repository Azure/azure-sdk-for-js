// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/externalClusters/operations.js";
import type {
  ExternalClustersListBySubscriptionOptionalParams,
  ExternalClustersListByResourceGroupOptionalParams,
  ExternalClustersDeleteOptionalParams,
  ExternalClustersUpdateOptionalParams,
  ExternalClustersCreateOrUpdateOptionalParams,
  ExternalClustersGetOptionalParams,
} from "../../api/externalClusters/options.js";
import type { ExternalCluster, ExternalClusterUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalClusters operations. */
export interface ExternalClustersOperations {
  /** List all External Clusters in the subscription */
  listBySubscription: (
    options?: ExternalClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalCluster>;
  /** List all External Clusters in the resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExternalClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalCluster>;
  /** Delete the specified External Cluster */
  delete: (
    resourceGroupName: string,
    externalClusterName: string,
    options?: ExternalClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified External Cluster */
  update: (
    resourceGroupName: string,
    externalClusterName: string,
    properties: ExternalClusterUpdate,
    options?: ExternalClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalCluster>, ExternalCluster>;
  /** Create or update the specified External Cluster */
  createOrUpdate: (
    resourceGroupName: string,
    externalClusterName: string,
    resource: ExternalCluster,
    options?: ExternalClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalCluster>, ExternalCluster>;
  /** Get the External Cluster */
  get: (
    resourceGroupName: string,
    externalClusterName: string,
    options?: ExternalClustersGetOptionalParams,
  ) => Promise<ExternalCluster>;
}

function _getExternalClusters(context: NetAppManagementContext) {
  return {
    listBySubscription: (options?: ExternalClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExternalClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      externalClusterName: string,
      options?: ExternalClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, externalClusterName, options),
    update: (
      resourceGroupName: string,
      externalClusterName: string,
      properties: ExternalClusterUpdate,
      options?: ExternalClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, externalClusterName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      externalClusterName: string,
      resource: ExternalCluster,
      options?: ExternalClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, externalClusterName, resource, options),
    get: (
      resourceGroupName: string,
      externalClusterName: string,
      options?: ExternalClustersGetOptionalParams,
    ) => get(context, resourceGroupName, externalClusterName, options),
  };
}

export function _getExternalClustersOperations(
  context: NetAppManagementContext,
): ExternalClustersOperations {
  return {
    ..._getExternalClusters(context),
  };
}
