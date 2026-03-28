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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: RedisEnterpriseDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing Redis Enterprise cluster */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: RedisEnterpriseUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster */
  create: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: RedisEnterpriseCreateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
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
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: RedisEnterpriseUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: RedisEnterpriseCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, parameters, options),
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
