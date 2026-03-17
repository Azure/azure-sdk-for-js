// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  checkVolumeFilePathAvailability,
  changeZone,
  listByElasticAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticCapacityPools/operations.js";
import type {
  ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams,
  ElasticCapacityPoolsChangeZoneOptionalParams,
  ElasticCapacityPoolsListByElasticAccountOptionalParams,
  ElasticCapacityPoolsDeleteOptionalParams,
  ElasticCapacityPoolsUpdateOptionalParams,
  ElasticCapacityPoolsCreateOrUpdateOptionalParams,
  ElasticCapacityPoolsGetOptionalParams,
} from "../../api/elasticCapacityPools/options.js";
import type {
  ElasticCapacityPool,
  ElasticCapacityPoolUpdate,
  ChangeZoneRequest,
  CheckElasticVolumeFilePathAvailabilityRequest,
  CheckElasticResourceAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticCapacityPools operations. */
export interface ElasticCapacityPoolsOperations {
  /** Check if an Elastic Volume file path is available within the given Elastic Capacity Pool. */
  checkVolumeFilePathAvailability: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: CheckElasticVolumeFilePathAvailabilityRequest,
    options?: ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams,
  ) => Promise<CheckElasticResourceAvailabilityResponse>;
  /** Moves pool to another zone */
  changeZone: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: ChangeZoneRequest,
    options?: ElasticCapacityPoolsChangeZoneOptionalParams,
  ) => PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
  /** List and describe all NetApp Elastic Capacity Pools in the Elastic NetApp Account. */
  listByElasticAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticCapacityPoolsListByElasticAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticCapacityPool>;
  /** Delete the specified NetApp Elastic Capacity Pool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: ElasticCapacityPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified NetApp Elastic Capacity Pool */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: ElasticCapacityPoolUpdate,
    options?: ElasticCapacityPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
  /** Create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    body: ElasticCapacityPool,
    options?: ElasticCapacityPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
  /** Get the NetApp Elastic Capacity Pool */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: ElasticCapacityPoolsGetOptionalParams,
  ) => Promise<ElasticCapacityPool>;
}

function _getElasticCapacityPools(context: NetAppManagementContext) {
  return {
    checkVolumeFilePathAvailability: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: CheckElasticVolumeFilePathAvailabilityRequest,
      options?: ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams,
    ) =>
      checkVolumeFilePathAvailability(
        context,
        resourceGroupName,
        accountName,
        poolName,
        body,
        options,
      ),
    changeZone: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: ChangeZoneRequest,
      options?: ElasticCapacityPoolsChangeZoneOptionalParams,
    ) => changeZone(context, resourceGroupName, accountName, poolName, body, options),
    listByElasticAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticCapacityPoolsListByElasticAccountOptionalParams,
    ) => listByElasticAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: ElasticCapacityPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: ElasticCapacityPoolUpdate,
      options?: ElasticCapacityPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, poolName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      body: ElasticCapacityPool,
      options?: ElasticCapacityPoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, poolName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: ElasticCapacityPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, options),
  };
}

export function _getElasticCapacityPoolsOperations(
  context: NetAppManagementContext,
): ElasticCapacityPoolsOperations {
  return {
    ..._getElasticCapacityPools(context),
  };
}
