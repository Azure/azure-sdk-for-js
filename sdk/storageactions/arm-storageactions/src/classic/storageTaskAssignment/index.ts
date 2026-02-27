// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageActionsManagementContext } from "../../api/storageActionsManagementContext.js";
import type { StorageTaskAssignment } from "../../models/models.js";
import type { StorageTaskAssignmentListOptionalParams } from "../../api/storageTaskAssignment/options.js";
import { list } from "../../api/storageTaskAssignment/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageTaskAssignment operations. */
export interface StorageTaskAssignmentOperations {
  /** Lists Resource IDs of the Storage Task Assignments associated with this Storage Task. */
  list: (
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTaskAssignmentListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskAssignment>;
}

function _getStorageTaskAssignment(context: StorageActionsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      storageTaskName: string,
      options?: StorageTaskAssignmentListOptionalParams,
    ) => list(context, resourceGroupName, storageTaskName, options),
  };
}

export function _getStorageTaskAssignmentOperations(
  context: StorageActionsManagementContext,
): StorageTaskAssignmentOperations {
  return {
    ..._getStorageTaskAssignment(context),
  };
}
