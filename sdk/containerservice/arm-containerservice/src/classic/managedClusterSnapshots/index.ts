// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/managedClusterSnapshots/operations.js";
import type {
  ManagedClusterSnapshotsListOptionalParams,
  ManagedClusterSnapshotsListByResourceGroupOptionalParams,
  ManagedClusterSnapshotsDeleteOptionalParams,
  ManagedClusterSnapshotsUpdateTagsOptionalParams,
  ManagedClusterSnapshotsCreateOrUpdateOptionalParams,
  ManagedClusterSnapshotsGetOptionalParams,
} from "../../api/managedClusterSnapshots/options.js";
import type { TagsObject, ManagedClusterSnapshot } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedClusterSnapshots operations. */
export interface ManagedClusterSnapshotsOperations {
  /** Gets a list of managed cluster snapshots in the specified subscription. */
  list: (
    options?: ManagedClusterSnapshotsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedClusterSnapshot>;
  /** Lists managed cluster snapshots in the specified subscription and resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedClusterSnapshotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedClusterSnapshot>;
  /** Deletes a managed cluster snapshot. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClusterSnapshotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a managed cluster snapshot. */
  updateTags: (
    resourceGroupName: string,
    resourceName: string,
    parameters: TagsObject,
    options?: ManagedClusterSnapshotsUpdateTagsOptionalParams,
  ) => Promise<ManagedClusterSnapshot>;
  /** Creates or updates a managed cluster snapshot. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterSnapshot,
    options?: ManagedClusterSnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedClusterSnapshot>;
  /** Gets a managed cluster snapshot. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClusterSnapshotsGetOptionalParams,
  ) => Promise<ManagedClusterSnapshot>;
}

function _getManagedClusterSnapshots(context: ContainerServiceContext) {
  return {
    list: (options?: ManagedClusterSnapshotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedClusterSnapshotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClusterSnapshotsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    updateTags: (
      resourceGroupName: string,
      resourceName: string,
      parameters: TagsObject,
      options?: ManagedClusterSnapshotsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterSnapshot,
      options?: ManagedClusterSnapshotsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClusterSnapshotsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getManagedClusterSnapshotsOperations(
  context: ContainerServiceContext,
): ManagedClusterSnapshotsOperations {
  return {
    ..._getManagedClusterSnapshots(context),
  };
}
