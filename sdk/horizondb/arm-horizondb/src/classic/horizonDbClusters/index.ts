// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/horizonDbClusters/operations.js";
import type {
  HorizonDbClustersListBySubscriptionOptionalParams,
  HorizonDbClustersListByResourceGroupOptionalParams,
  HorizonDbClustersDeleteOptionalParams,
  HorizonDbClustersUpdateOptionalParams,
  HorizonDbClustersCreateOrUpdateOptionalParams,
  HorizonDbClustersGetOptionalParams,
} from "../../api/horizonDbClusters/options.js";
import type { HorizonDbCluster, HorizonDbClusterForPatchUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbClusters operations. */
export interface HorizonDbClustersOperations {
  /** Lists all HorizonDb clusters in a subscription. */
  listBySubscription: (
    options?: HorizonDbClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbCluster>;
  /** Lists all HorizonDb clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: HorizonDbClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbCluster>;
  /** Deletes a HorizonDb cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDb cluster (e.g., tags, virtual cores, replica count). */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: HorizonDbClusterForPatchUpdate,
    options?: HorizonDbClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbCluster>, HorizonDbCluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    properties: HorizonDbClusterForPatchUpdate,
    options?: HorizonDbClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbCluster>, HorizonDbCluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    properties: HorizonDbClusterForPatchUpdate,
    options?: HorizonDbClustersUpdateOptionalParams,
  ) => Promise<HorizonDbCluster>;
  /** Creates a new HorizonDb cluster or updates an existing cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    resource: HorizonDbCluster,
    options?: HorizonDbClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbCluster>, HorizonDbCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    resource: HorizonDbCluster,
    options?: HorizonDbClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbCluster>, HorizonDbCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: HorizonDbCluster,
    options?: HorizonDbClustersCreateOrUpdateOptionalParams,
  ) => Promise<HorizonDbCluster>;
  /** Gets information about a HorizonDb cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersGetOptionalParams,
  ) => Promise<HorizonDbCluster>;
}

function _getHorizonDbClusters(context: HorizonDbContext) {
  return {
    listBySubscription: (options?: HorizonDbClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: HorizonDbClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: HorizonDbClusterForPatchUpdate,
      options?: HorizonDbClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      properties: HorizonDbClusterForPatchUpdate,
      options?: HorizonDbClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      properties: HorizonDbClusterForPatchUpdate,
      options?: HorizonDbClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      resource: HorizonDbCluster,
      options?: HorizonDbClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      resource: HorizonDbCluster,
      options?: HorizonDbClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: HorizonDbCluster,
      options?: HorizonDbClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, clusterName, resource, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getHorizonDbClustersOperations(
  context: HorizonDbContext,
): HorizonDbClustersOperations {
  return {
    ..._getHorizonDbClusters(context),
  };
}
