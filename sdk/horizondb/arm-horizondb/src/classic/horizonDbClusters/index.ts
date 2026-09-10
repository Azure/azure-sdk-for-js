// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  restart,
  stop,
  start,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/horizonDbClusters/operations.js";
import type {
  HorizonDbClustersRestartOptionalParams,
  HorizonDbClustersStopOptionalParams,
  HorizonDbClustersStartOptionalParams,
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
  /** Restarts a HorizonDB cluster. */
  restart: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersRestartOptionalParams,
  ) => Promise<void>;
  /** Stops a running HorizonDB cluster. */
  stop: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStopOptionalParams,
  ) => Promise<void>;
  /** Starts a stopped HorizonDB cluster. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersStartOptionalParams,
  ) => Promise<void>;
  /** Lists all HorizonDB clusters in a subscription. */
  listBySubscription: (
    options?: HorizonDbClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbCluster>;
  /** Lists all HorizonDB clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: HorizonDbClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbCluster>;
  /** Deletes a HorizonDB cluster. */
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
  /** Updates an existing HorizonDB cluster (e.g., tags, virtual cores, replica count). */
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
  /** Creates a new HorizonDB cluster or updates an existing cluster. */
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
  /** Gets information about a HorizonDB cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbClustersGetOptionalParams,
  ) => Promise<HorizonDbCluster>;
}

function _getHorizonDbClusters(context: HorizonDbContext) {
  return {
    restart: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersRestartOptionalParams,
    ) => restart(context, resourceGroupName, clusterName, options),
    beginRestart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, clusterName, options);
    },
    stop: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStopOptionalParams,
    ) => stop(context, resourceGroupName, clusterName, options),
    beginStop: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, clusterName, options);
    },
    start: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbClustersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, options);
    },
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
