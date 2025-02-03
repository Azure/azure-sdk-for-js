// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import {
  PoolsGetOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsListByResourceGroupOptionalParams,
  PoolsListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  poolsGet,
  poolsCreateOrUpdate,
  poolsUpdate,
  poolsDelete,
  poolsListByResourceGroup,
  poolsListBySubscription,
} from "../../api/pools/index.js";
import { Pool, PoolUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** Get a Pool */
  get: (
    resourceGroupName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<Pool>;
  /** Create a Pool */
  createOrUpdate: (
    resourceGroupName: string,
    poolName: string,
    resource: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Update a Pool */
  update: (
    resourceGroupName: string,
    poolName: string,
    properties: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Delete a Pool */
  delete: (
    resourceGroupName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Pool resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** List Pool resources by subscription ID */
  listBySubscription: (
    options?: PoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
}

export function getPools(context: DevOpsInfrastructureContext, subscriptionId: string) {
  return {
    get: (resourceGroupName: string, poolName: string, options?: PoolsGetOptionalParams) =>
      poolsGet(context, subscriptionId, resourceGroupName, poolName, options),
    createOrUpdate: (
      resourceGroupName: string,
      poolName: string,
      resource: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) =>
      poolsCreateOrUpdate(context, subscriptionId, resourceGroupName, poolName, resource, options),
    update: (
      resourceGroupName: string,
      poolName: string,
      properties: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => poolsUpdate(context, subscriptionId, resourceGroupName, poolName, properties, options),
    delete: (resourceGroupName: string, poolName: string, options?: PoolsDeleteOptionalParams) =>
      poolsDelete(context, subscriptionId, resourceGroupName, poolName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PoolsListByResourceGroupOptionalParams,
    ) => poolsListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: PoolsListBySubscriptionOptionalParams) =>
      poolsListBySubscription(context, subscriptionId, options),
  };
}

export function getPoolsOperations(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
): PoolsOperations {
  return {
    ...getPools(context, subscriptionId),
  };
}
