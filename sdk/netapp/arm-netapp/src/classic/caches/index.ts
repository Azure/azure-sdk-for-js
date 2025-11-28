// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  poolChange,
  listPeeringPassphrases,
  listByCapacityPools,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/caches/operations.js";
import type {
  CachesPoolChangeOptionalParams,
  CachesListPeeringPassphrasesOptionalParams,
  CachesListByCapacityPoolsOptionalParams,
  CachesDeleteOptionalParams,
  CachesUpdateOptionalParams,
  CachesCreateOrUpdateOptionalParams,
  CachesGetOptionalParams,
} from "../../api/caches/options.js";
import type {
  PoolChangeRequest,
  Cache,
  CacheUpdate,
  PeeringPassphrases,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Caches operations. */
export interface CachesOperations {
  /** Moves Cache  to another Capacity Pool */
  poolChange: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    body: PoolChangeRequest,
    options?: CachesPoolChangeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will list the cluster peering command, cluster peering passphrase and the vserver peering command */
  listPeeringPassphrases: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    options?: CachesListPeeringPassphrasesOptionalParams,
  ) => Promise<PeeringPassphrases>;
  /** List all Caches within the Capacity Pool */
  listByCapacityPools: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: CachesListByCapacityPoolsOptionalParams,
  ) => PagedAsyncIterableIterator<Cache>;
  /** Delete the specified cache */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    options?: CachesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified Cache */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    body: CacheUpdate,
    options?: CachesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update the specified Cache within the Capacity Pool */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    body: Cache,
    options?: CachesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cache>, Cache>;
  /** Get the details of the specified Cache */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    cacheName: string,
    options?: CachesGetOptionalParams,
  ) => Promise<Cache>;
}

function _getCaches(context: NetAppManagementContext) {
  return {
    poolChange: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      body: PoolChangeRequest,
      options?: CachesPoolChangeOptionalParams,
    ) => poolChange(context, resourceGroupName, accountName, poolName, cacheName, body, options),
    listPeeringPassphrases: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      options?: CachesListPeeringPassphrasesOptionalParams,
    ) =>
      listPeeringPassphrases(context, resourceGroupName, accountName, poolName, cacheName, options),
    listByCapacityPools: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: CachesListByCapacityPoolsOptionalParams,
    ) => listByCapacityPools(context, resourceGroupName, accountName, poolName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      options?: CachesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, cacheName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      body: CacheUpdate,
      options?: CachesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, poolName, cacheName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      body: Cache,
      options?: CachesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, poolName, cacheName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      cacheName: string,
      options?: CachesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, cacheName, options),
  };
}

export function _getCachesOperations(context: NetAppManagementContext): CachesOperations {
  return {
    ..._getCaches(context),
  };
}
