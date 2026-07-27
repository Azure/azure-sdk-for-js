// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import {
  listSkusForScaling,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/redisEnterprise/operations.js";
import type {
  RedisEnterpriseListSkusForScalingOptionalParams,
  RedisEnterpriseListOptionalParams,
  RedisEnterpriseListByResourceGroupOptionalParams,
  RedisEnterpriseDeleteOptionalParams,
  RedisEnterpriseUpdateOptionalParams,
  RedisEnterpriseCreateOptionalParams,
  RedisEnterpriseGetOptionalParams,
} from "../../api/redisEnterprise/options.js";
import type { Cluster, ClusterUpdate, SkuDetailsList } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RedisEnterprise operations. */
export interface RedisEnterpriseOperations {
  /** Lists the available SKUs for scaling the Redis Enterprise cluster. */
  listSkusForScaling: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseListSkusForScalingOptionalParams,
  ) => Promise<SkuDetailsList>;
  /** Lists all Redis Enterprise clusters in the specified subscription. */
  list: (options?: RedisEnterpriseListOptionalParams) => PagedAsyncIterableIterator<Cluster>;
  /** Lists all Redis Enterprise clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RedisEnterpriseListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes a Redis Enterprise cache cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing Redis Enterprise cluster */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: RedisEnterpriseUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: RedisEnterpriseUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: RedisEnterpriseUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster */
  create: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: RedisEnterpriseCreateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: RedisEnterpriseCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: RedisEnterpriseCreateOptionalParams,
  ) => Promise<Cluster>;
  /** Gets information about a Redis Enterprise cluster */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getRedisEnterprise(context: RedisEnterpriseManagementContext) {
  return {
    listSkusForScaling: (
      resourceGroupName: string,
      clusterName: string,
      options?: RedisEnterpriseListSkusForScalingOptionalParams,
    ) => listSkusForScaling(context, resourceGroupName, clusterName, options),
    list: (options?: RedisEnterpriseListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RedisEnterpriseListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: RedisEnterpriseDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: RedisEnterpriseDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: RedisEnterpriseDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: RedisEnterpriseUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: RedisEnterpriseUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: RedisEnterpriseUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, parameters, options);
    },
    create: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: RedisEnterpriseCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: RedisEnterpriseCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: RedisEnterpriseCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: RedisEnterpriseGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getRedisEnterpriseOperations(
  context: RedisEnterpriseManagementContext,
): RedisEnterpriseOperations {
  return {
    ..._getRedisEnterprise(context),
  };
}
