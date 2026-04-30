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
} from "../../api/snapshots/operations.js";
import type {
  SnapshotsListOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateTagsOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import type { TagsObject, Snapshot } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Gets a list of snapshots in the specified subscription. */
  list: (options?: SnapshotsListOptionalParams) => PagedAsyncIterableIterator<Snapshot>;
  /** Lists snapshots in the specified subscription and resource group. */
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
    resourceName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a snapshot. */
  updateTags: (
    resourceGroupName: string,
    resourceName: string,
    parameters: TagsObject,
    options?: SnapshotsUpdateTagsOptionalParams,
  ) => Promise<Snapshot>;
  /** Creates or updates a snapshot. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<Snapshot>;
  /** Gets a snapshot. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: ContainerServiceContext) {
  return {
    list: (options?: SnapshotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SnapshotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    updateTags: (
      resourceGroupName: string,
      resourceName: string,
      parameters: TagsObject,
      options?: SnapshotsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (resourceGroupName: string, resourceName: string, options?: SnapshotsGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getSnapshotsOperations(context: ContainerServiceContext): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
