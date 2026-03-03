// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  stopResize,
  disableAutoScale,
  listByBatchAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/pool/operations.js";
import type {
  PoolStopResizeOptionalParams,
  PoolDisableAutoScaleOptionalParams,
  PoolListByBatchAccountOptionalParams,
  PoolDeleteOptionalParams,
  PoolUpdateOptionalParams,
  PoolCreateOptionalParams,
  PoolGetOptionalParams,
} from "../../api/pool/options.js";
import type { Pool } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pool operations. */
export interface PoolOperations {
  /** This does not restore the pool to its previous state before the resize operation: it only stops any further changes being made, and the pool maintains its current state. After stopping, the pool stabilizes at the number of nodes it was at when the stop operation was done. During the stop operation, the pool allocation state changes first to stopping and then to steady. A resize operation need not be an explicit resize pool request; this API can also be used to halt the initial sizing of the pool when it is created. */
  stopResize: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolStopResizeOptionalParams,
  ) => Promise<Pool>;
  /** Disables automatic scaling for a pool. */
  disableAutoScale: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolDisableAutoScaleOptionalParams,
  ) => Promise<Pool>;
  /** Lists all of the pools in the specified account. */
  listByBatchAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PoolListByBatchAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** Deletes the specified pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the properties of an existing pool. */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    parameters: Pool,
    options?: PoolUpdateOptionalParams,
  ) => Promise<Pool>;
  /** Creates a new pool inside the specified account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    parameters: Pool,
    options?: PoolCreateOptionalParams,
  ) => Promise<Pool>;
  /** Gets information about the specified pool. */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: PoolGetOptionalParams,
  ) => Promise<Pool>;
}

function _getPool(context: BatchManagementContext) {
  return {
    stopResize: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolStopResizeOptionalParams,
    ) => stopResize(context, resourceGroupName, accountName, poolName, options),
    disableAutoScale: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolDisableAutoScaleOptionalParams,
    ) => disableAutoScale(context, resourceGroupName, accountName, poolName, options),
    listByBatchAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PoolListByBatchAccountOptionalParams,
    ) => listByBatchAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      parameters: Pool,
      options?: PoolUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, poolName, parameters, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      parameters: Pool,
      options?: PoolCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, poolName, parameters, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: PoolGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, options),
  };
}

export function _getPoolOperations(context: BatchManagementContext): PoolOperations {
  return {
    ..._getPool(context),
  };
}
