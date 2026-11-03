// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/snapshots/operations.js";
import type {
  SnapshotsListAllOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import type { Snapshot, SnapshotTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Lists all of the snapshots in the specified subscription. Use the nextLink property in the response to get the next page of snapshots. */
  listAll: (options?: SnapshotsListAllOptionalParams) => PagedAsyncIterableIterator<Snapshot>;
  /** Lists all of the snapshots in the specified resource group. Use the nextLink property in the response to get the next page of snapshots. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SnapshotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** The operation to delete a snapshot. */
  delete: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a snapshot. */
  update: (
    resourceGroupName: string,
    snapshotName: string,
    properties: SnapshotTagsUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** The operation to create or update a snapshot. Please note some properties can be set only during snapshot creation. */
  createOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    resource: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Gets a snapshot */
  get: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: SnapshotsListAllOptionalParams) => listAll(context, options),
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
      properties: SnapshotTagsUpdate,
      options?: SnapshotsUpdateOptionalParams,
    ) => update(context, resourceGroupName, snapshotName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      snapshotName: string,
      resource: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, snapshotName, resource, options),
    get: (resourceGroupName: string, snapshotName: string, options?: SnapshotsGetOptionalParams) =>
      get(context, resourceGroupName, snapshotName, options),
  };
}

export function _getSnapshotsOperations(
  context: AzureStackHCIVMManagementContext,
): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
