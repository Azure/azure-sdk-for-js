// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import {
  deleteResources,
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/pools/operations.js";
import {
  PoolsDeleteResourcesOptionalParams,
  PoolsCheckNameAvailabilityOptionalParams,
  PoolsListBySubscriptionOptionalParams,
  PoolsListByResourceGroupOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsGetOptionalParams,
} from "../../api/pools/options.js";
import {
  Pool,
  PoolUpdate,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  DeleteResourcesDetails,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** A synchronous resource action. */
  deleteResources: (
    resourceGroupName: string,
    poolName: string,
    body: DeleteResourcesDetails,
    options?: PoolsDeleteResourcesOptionalParams,
  ) => Promise<void>;
  /** Checks that the pool name is valid and is not already in use. */
  checkNameAvailability: (
    body: CheckNameAvailability,
    options?: PoolsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** List Pool resources by subscription ID */
  listBySubscription: (
    options?: PoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** List Pool resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** Delete a Pool */
  delete: (
    resourceGroupName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Pool */
  update: (
    resourceGroupName: string,
    poolName: string,
    properties: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Create a Pool */
  createOrUpdate: (
    resourceGroupName: string,
    poolName: string,
    resource: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Get a Pool */
  get: (
    resourceGroupName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<Pool>;
}

function _getPools(context: DevOpsInfrastructureContext) {
  return {
    deleteResources: (
      resourceGroupName: string,
      poolName: string,
      body: DeleteResourcesDetails,
      options?: PoolsDeleteResourcesOptionalParams,
    ) => deleteResources(context, resourceGroupName, poolName, body, options),
    checkNameAvailability: (
      body: CheckNameAvailability,
      options?: PoolsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listBySubscription: (options?: PoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, poolName: string, options?: PoolsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, poolName, options),
    update: (
      resourceGroupName: string,
      poolName: string,
      properties: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, poolName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      poolName: string,
      resource: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, poolName, resource, options),
    get: (resourceGroupName: string, poolName: string, options?: PoolsGetOptionalParams) =>
      get(context, resourceGroupName, poolName, options),
  };
}

export function _getPoolsOperations(context: DevOpsInfrastructureContext): PoolsOperations {
  return {
    ..._getPools(context),
  };
}
