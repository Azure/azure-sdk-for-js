// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  revokeAccess,
  grantAccess,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/snapshots/operations.js";
import type {
  SnapshotsRevokeAccessOptionalParams,
  SnapshotsGrantAccessOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import type { GrantAccessData, AccessUri, Snapshot, SnapshotUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Revokes access to a snapshot. */
  revokeAccess: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Grants access to a snapshot. */
  grantAccess: (
    resourceGroupName: string,
    snapshotName: string,
    grantAccessData: GrantAccessData,
    options?: SnapshotsGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** Lists snapshots under a subscription. */
  list: (options?: SnapshotsListOptionalParams) => PagedAsyncIterableIterator<Snapshot>;
  /** Lists snapshots under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SnapshotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Deletes a snapshot. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates (patches) a snapshot. */
  update: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Creates or updates a snapshot. */
  createOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Gets information about a snapshot. */
  get: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: ComputeContext) {
  return {
    revokeAccess: (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsRevokeAccessOptionalParams,
    ) => revokeAccess(context, resourceGroupName, snapshotName, options),
    grantAccess: (
      resourceGroupName: string,
      snapshotName: string,
      grantAccessData: GrantAccessData,
      options?: SnapshotsGrantAccessOptionalParams,
    ) => grantAccess(context, resourceGroupName, snapshotName, grantAccessData, options),
    list: (options?: SnapshotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SnapshotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, snapshotName, options),
    update: (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: SnapshotUpdate,
      options?: SnapshotsUpdateOptionalParams,
    ) => update(context, resourceGroupName, snapshotName, snapshot, options),
    createOrUpdate: (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, snapshotName, snapshot, options),
    get: (resourceGroupName: string, snapshotName: string, options?: SnapshotsGetOptionalParams) =>
      get(context, resourceGroupName, snapshotName, options),
  };
}

export function _getSnapshotsOperations(context: ComputeContext): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
