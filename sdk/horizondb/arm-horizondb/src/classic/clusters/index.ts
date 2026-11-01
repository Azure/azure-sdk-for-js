// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  failover,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersFailoverOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrReplaceOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  Cluster,
  ClusterCreateOrUpdate,
  ClusterForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Triggers failover within the cluster's designated read-write pool. HorizonDB selects the replacement node using the same eligibility and node-selection rules as automatic failover. The request fails with 409 Conflict when the designated pool is not eligible for failover or another conflicting operation is in progress. */
  failover: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersFailoverOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersFailoverOptionalParams,
  ) => Promise<Cluster>;
  /** Lists all HorizonDB clusters in a subscription. */
  listBySubscription: (
    options?: ClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Lists all HorizonDB clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes a HorizonDB cluster, its Cluster-scoped Endpoint, and all remaining child resources. For an accepted deletion, the long-running operation remains nonterminal until physical deletion completes and point GET returns 404 Not Found. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDB cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: ClusterForPatchUpdateUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    properties: ClusterForPatchUpdateUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    properties: ClusterForPatchUpdateUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Creates a new HorizonDB cluster or replaces an existing cluster. PointInTimeRestore creates the new Cluster resource and hydrates its service-owned database storage from an available source backup. It does not clone source pools, Pool-scoped endpoints, firewall rules, parameter-group associations, or other child resources. The new Cluster receives its service-generated Cluster-scoped Endpoint named cluster. For restore, postgreSqlVersion must be omitted because the service obtains it from backup metadata; all other new-cluster configuration comes from the request or service defaults. Same-location restore requires and honors pointInTimeUtc and allows creationSourceClusterLocation to be omitted. Cross-location restore requires creationSourceClusterLocation to identify the source cluster's Azure location and requires pointInTimeUtc, but ignores the supplied timestamp and restores the latest available backup. Cross-location responses omit pointInTimeUtc. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: ClusterCreateOrUpdate,
    options?: ClustersCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: ClusterCreateOrUpdate,
    options?: ClustersCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: ClusterCreateOrUpdate,
    options?: ClustersCreateOrReplaceOptionalParams,
  ) => Promise<Cluster>;
  /** Gets information about a HorizonDB cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: HorizonDbContext) {
  return {
    failover: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersFailoverOptionalParams,
    ) => failover(context, resourceGroupName, clusterName, options),
    beginFailover: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, clusterName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: ClusterForPatchUpdateUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      properties: ClusterForPatchUpdateUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      properties: ClusterForPatchUpdateUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      resource: ClusterCreateOrUpdate,
      options?: ClustersCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      resource: ClusterCreateOrUpdate,
      options?: ClustersCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: ClusterCreateOrUpdate,
      options?: ClustersCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(context, resourceGroupName, clusterName, resource, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: HorizonDbContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
