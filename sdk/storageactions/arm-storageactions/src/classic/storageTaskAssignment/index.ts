// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementContext } from "../../api/storageActionsManagementContext.js";
import { StorageTaskAssignment } from "../../models/models.js";
import { StorageTaskAssignmentStorageTaskAssignmentListOptionalParams } from "../../api/storageTaskAssignment/options.js";
import { storageTaskAssignmentList } from "../../api/storageTaskAssignment/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageTaskAssignment operations. */
export interface StorageTaskAssignmentOperations {
  /** Lists Resource IDs of the Storage Task Assignments associated with this Storage Task. */
  storageTaskAssignmentList: (
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTaskAssignmentStorageTaskAssignmentListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskAssignment>;
}

function _getStorageTaskAssignment(context: StorageActionsManagementContext) {
  return {
    storageTaskAssignmentList: (
      resourceGroupName: string,
      storageTaskName: string,
      options?: StorageTaskAssignmentStorageTaskAssignmentListOptionalParams,
    ) => storageTaskAssignmentList(context, resourceGroupName, storageTaskName, options),
  };
}

export function _getStorageTaskAssignmentOperations(
  context: StorageActionsManagementContext,
): StorageTaskAssignmentOperations {
  return {
    ..._getStorageTaskAssignment(context),
  };
}
