// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanManagementContext } from "../../api/elasticSanManagementContext.js";
import { listByVolumeGroup, $delete, create, get } from "../../api/volumeSnapshots/operations.js";
import type {
  VolumeSnapshotsListByVolumeGroupOptionalParams,
  VolumeSnapshotsDeleteOptionalParams,
  VolumeSnapshotsCreateOptionalParams,
  VolumeSnapshotsGetOptionalParams,
} from "../../api/volumeSnapshots/options.js";
import type { Snapshot } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeSnapshots operations. */
export interface VolumeSnapshotsOperations {
  /** List Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter */
  listByVolumeGroup: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeSnapshotsListByVolumeGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Delete a Volume Snapshot. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Volume Snapshot. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    parameters: Snapshot,
    options?: VolumeSnapshotsCreateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    parameters: Snapshot,
    options?: VolumeSnapshotsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Snapshot>, Snapshot>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    parameters: Snapshot,
    options?: VolumeSnapshotsCreateOptionalParams,
  ) => Promise<Snapshot>;
  /** Get a Volume Snapshot. */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getVolumeSnapshots(context: ElasticSanManagementContext) {
  return {
    listByVolumeGroup: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumeSnapshotsListByVolumeGroupOptionalParams,
    ) => listByVolumeGroup(context, resourceGroupName, elasticSanName, volumeGroupName, options),
    delete: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeSnapshotsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, elasticSanName, volumeGroupName, snapshotName, options),
    beginDelete: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeSnapshotsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeSnapshotsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      parameters: Snapshot,
      options?: VolumeSnapshotsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        parameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      parameters: Snapshot,
      options?: VolumeSnapshotsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      parameters: Snapshot,
      options?: VolumeSnapshotsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      snapshotName: string,
      options?: VolumeSnapshotsGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, volumeGroupName, snapshotName, options),
  };
}

export function _getVolumeSnapshotsOperations(
  context: ElasticSanManagementContext,
): VolumeSnapshotsOperations {
  return {
    ..._getVolumeSnapshots(context),
  };
}
