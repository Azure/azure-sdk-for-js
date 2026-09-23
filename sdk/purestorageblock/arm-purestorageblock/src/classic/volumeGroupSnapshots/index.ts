// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import {
  listSnapshots,
  listByVolumeGroup,
  $delete,
  create,
  get,
} from "../../api/volumeGroupSnapshots/operations.js";
import type {
  VolumeGroupSnapshotsListSnapshotsOptionalParams,
  VolumeGroupSnapshotsListByVolumeGroupOptionalParams,
  VolumeGroupSnapshotsDeleteOptionalParams,
  VolumeGroupSnapshotsCreateOptionalParams,
  VolumeGroupSnapshotsGetOptionalParams,
} from "../../api/volumeGroupSnapshots/options.js";
import type {
  VolumeGroupSnapshot,
  VolumeGroupSnapshotListRequest,
  VolumeGroupSnapshotPostListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeGroupSnapshots operations. */
export interface VolumeGroupSnapshotsOperations {
  /** List all snapshots for a given volume group using POST with the same request and response contract */
  listSnapshots: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    properties: VolumeGroupSnapshotListRequest,
    options?: VolumeGroupSnapshotsListSnapshotsOptionalParams,
  ) => Promise<VolumeGroupSnapshotPostListResult>;
  /** List all snapshots for a given volume group */
  listByVolumeGroup: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumeGroupSnapshotsListByVolumeGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VolumeGroupSnapshot>;
  /** Delete a volume group snapshot */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeGroupSnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a manual snapshot of a volume group, or recover from an existing snapshot by providing sourceSnapshotResourceId */
  create: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    snapshotName: string,
    resource: VolumeGroupSnapshot,
    options?: VolumeGroupSnapshotsCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroupSnapshot>, VolumeGroupSnapshot>;
  /** Get a volume group snapshot */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeGroupSnapshotsGetOptionalParams,
  ) => Promise<VolumeGroupSnapshot>;
}
function _getVolumeGroupSnapshots(context: BlockContext) {
  return {
    listSnapshots: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      properties: VolumeGroupSnapshotListRequest,
      options?: VolumeGroupSnapshotsListSnapshotsOptionalParams,
    ) =>
      listSnapshots(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        properties,
        options,
      ),
    listByVolumeGroup: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumeGroupSnapshotsListByVolumeGroupOptionalParams,
    ) => listByVolumeGroup(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeGroupSnapshotsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, storagePoolName, volumeGroupName, snapshotName, options),
    create: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      snapshotName: string,
      resource: VolumeGroupSnapshot,
      options?: VolumeGroupSnapshotsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        snapshotName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeGroupSnapshotsGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, volumeGroupName, snapshotName, options),
  };
}
export function _getVolumeGroupSnapshotsOperations(
  context: BlockContext,
): VolumeGroupSnapshotsOperations {
  return {
    ..._getVolumeGroupSnapshots(context),
  };
}
