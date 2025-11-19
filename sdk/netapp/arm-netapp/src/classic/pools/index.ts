// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/pools/operations.js";
import {
  PoolsListOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsGetOptionalParams,
} from "../../api/pools/options.js";
import { CapacityPool, CapacityPoolPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** List all capacity pools in the NetApp Account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: PoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<CapacityPool>;
  /** Delete the specified capacity pool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified capacity pool */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: CapacityPoolPatch,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<CapacityPool>, CapacityPool>;
  /** Create or Update a capacity pool */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: CapacityPool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CapacityPool>, CapacityPool>;
  /** Get details of the specified capacity pool */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<CapacityPool>;
}

function _getPools(context: NetAppManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: PoolsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: CapacityPoolPatch,
      options?: PoolsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, accountName, poolName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: CapacityPool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        poolName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, options),
  };
}

export function _getPoolsOperations(
  context: NetAppManagementContext,
): PoolsOperations {
  return {
    ..._getPools(context),
  };
}
