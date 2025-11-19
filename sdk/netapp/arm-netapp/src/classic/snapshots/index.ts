// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  restoreFiles,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/snapshots/operations.js";
import {
  SnapshotsRestoreFilesOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import {
  Snapshot,
  SnapshotPatch,
  SnapshotRestoreFiles,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Restore the specified files from the specified snapshot to the active filesystem */
  restoreFiles: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    body: SnapshotRestoreFiles,
    options?: SnapshotsRestoreFilesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all snapshots associated with the volume */
  list: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: SnapshotsListOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Delete snapshot */
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
    options?: SnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a snapshot */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    body: SnapshotPatch,
    options?: SnapshotsUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Create the specified snapshot within the given volume */
  create: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    body: Snapshot,
    options?: SnapshotsCreateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Get details of the specified snapshot */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: NetAppManagementContext) {
  return {
    restoreFiles: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      body: SnapshotRestoreFiles,
      options?: SnapshotsRestoreFilesOptionalParams,
    ) =>
      restoreFiles(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: SnapshotsListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      body: SnapshotPatch,
      options?: SnapshotsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      snapshotName: string,
      body: Snapshot,
      options?: SnapshotsCreateOptionalParams,
    ) =>
      create(
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
      options?: SnapshotsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        options,
      ),
  };
}

export function _getSnapshotsOperations(
  context: NetAppManagementContext,
): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
