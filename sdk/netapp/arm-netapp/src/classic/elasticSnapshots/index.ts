// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByElasticVolume,
  $delete,
  createOrUpdate,
  get,
} from "../../api/elasticSnapshots/operations.js";
import type {
  ElasticSnapshotsListByElasticVolumeOptionalParams,
  ElasticSnapshotsDeleteOptionalParams,
  ElasticSnapshotsCreateOrUpdateOptionalParams,
  ElasticSnapshotsGetOptionalParams,
} from "../../api/elasticSnapshots/options.js";
import type { ElasticSnapshot } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticSnapshots operations. */
export interface ElasticSnapshotsOperations {
  /** List ElasticSnapshot resources by ElasticVolume */
  listByElasticVolume: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: ElasticSnapshotsListByElasticVolumeOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticSnapshot>;
  /** Delete a ElasticSnapshot */
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
    snapshotName: string,
    options?: ElasticSnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ElasticSnapshot */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    body: ElasticSnapshot,
    options?: ElasticSnapshotsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticSnapshot>, ElasticSnapshot>;
  /** Get a ElasticSnapshot */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    options?: ElasticSnapshotsGetOptionalParams,
  ) => Promise<ElasticSnapshot>;
}

function _getElasticSnapshots(context: NetAppManagementContext) {
  return {
    listByElasticVolume: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: ElasticSnapshotsListByElasticVolumeOptionalParams,
    ) =>
      listByElasticVolume(context, resourceGroupName, accountName, poolName, volumeName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      options?: ElasticSnapshotsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, accountName, poolName, volumeName, snapshotName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      body: ElasticSnapshot,
      options?: ElasticSnapshotsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      options?: ElasticSnapshotsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, volumeName, snapshotName, options),
  };
}

export function _getElasticSnapshotsOperations(
  context: NetAppManagementContext,
): ElasticSnapshotsOperations {
  return {
    ..._getElasticSnapshots(context),
  };
}
