// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementContext } from "../../api/storageActionsManagementContext.js";
import { StorageTaskReportInstance } from "../../models/models.js";
import { StorageTasksReportListOptionalParams } from "../../api/storageTasksReport/options.js";
import { list } from "../../api/storageTasksReport/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageTasksReport operations. */
export interface StorageTasksReportOperations {
  /** Fetch the storage tasks run report summary for each assignment. */
  list: (
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksReportListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskReportInstance>;
}

function _getStorageTasksReport(context: StorageActionsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      storageTaskName: string,
      options?: StorageTasksReportListOptionalParams,
    ) => list(context, resourceGroupName, storageTaskName, options),
  };
}

export function _getStorageTasksReportOperations(
  context: StorageActionsManagementContext,
): StorageTasksReportOperations {
  return {
    ..._getStorageTasksReport(context),
  };
}
