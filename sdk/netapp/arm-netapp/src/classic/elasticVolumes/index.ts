// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  revert,
  listByElasticPool,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticVolumes/operations.js";
import type {
  ElasticVolumesRevertOptionalParams,
  ElasticVolumesListByElasticPoolOptionalParams,
  ElasticVolumesDeleteOptionalParams,
  ElasticVolumesUpdateOptionalParams,
  ElasticVolumesCreateOrUpdateOptionalParams,
  ElasticVolumesGetOptionalParams,
} from "../../api/elasticVolumes/options.js";
import type {
  ElasticVolume,
  ElasticVolumeUpdate,
  ElasticVolumeRevert,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticVolumes operations. */
export interface ElasticVolumesOperations {
  /** Revert an Elastic Volume to the snapshot specified in the body */
  revert: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: ElasticVolumeRevert,
    options?: ElasticVolumesRevertOptionalParams,
  ) => PollerLike<OperationState<ElasticVolume>, ElasticVolume>;
  /** List all Elastic Volumes within the Elastic Capacity Pool */
  listByElasticPool: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: ElasticVolumesListByElasticPoolOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticVolume>;
  /** Delete the specified Elastic Volume */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: ElasticVolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified elastic volume */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: ElasticVolumeUpdate,
    options?: ElasticVolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticVolume>, ElasticVolume>;
  /** Create or update the specified volume within the capacity pool */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: ElasticVolume,
    options?: ElasticVolumesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticVolume>, ElasticVolume>;
  /** Get the details of the specified volume */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: ElasticVolumesGetOptionalParams,
  ) => Promise<ElasticVolume>;
}

function _getElasticVolumes(context: NetAppManagementContext) {
  return {
    revert: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: ElasticVolumeRevert,
      options?: ElasticVolumesRevertOptionalParams,
    ) => revert(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    listByElasticPool: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: ElasticVolumesListByElasticPoolOptionalParams,
    ) => listByElasticPool(context, resourceGroupName, accountName, poolName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: ElasticVolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, volumeName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: ElasticVolumeUpdate,
      options?: ElasticVolumesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: ElasticVolume,
      options?: ElasticVolumesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: ElasticVolumesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, volumeName, options),
  };
}

export function _getElasticVolumesOperations(
  context: NetAppManagementContext,
): ElasticVolumesOperations {
  return {
    ..._getElasticVolumes(context),
  };
}
