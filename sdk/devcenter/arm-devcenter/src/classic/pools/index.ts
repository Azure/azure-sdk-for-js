// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  runHealthChecks,
  listByProject,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/pools/operations.js";
import type {
  PoolsRunHealthChecksOptionalParams,
  PoolsListByProjectOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsGetOptionalParams,
} from "../../api/pools/options.js";
import type { Pool, PoolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** Triggers a refresh of the pool status. */
  runHealthChecks: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsRunHealthChecksOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists pools for a project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: PoolsListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** Deletes a machine pool. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a machine pool. */
  update: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Creates or updates a machine pool. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** Gets a machine pool. */
  get: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<Pool>;
}

function _getPools(context: DevCenterContext) {
  return {
    runHealthChecks: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsRunHealthChecksOptionalParams,
    ) => runHealthChecks(context, resourceGroupName, projectName, poolName, options),
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: PoolsListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, poolName, options),
    update: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, poolName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, poolName, body, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, poolName, options),
  };
}

export function _getPoolsOperations(context: DevCenterContext): PoolsOperations {
  return {
    ..._getPools(context),
  };
}
