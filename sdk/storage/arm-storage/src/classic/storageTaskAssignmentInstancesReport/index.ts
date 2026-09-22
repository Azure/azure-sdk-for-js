// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list } from "../../api/storageTaskAssignmentInstancesReport/operations.js";
import type { StorageTaskAssignmentInstancesReportListOptionalParams } from "../../api/storageTaskAssignmentInstancesReport/options.js";
import type { StorageTaskReportInstance } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageTaskAssignmentInstancesReport operations. */
export interface StorageTaskAssignmentInstancesReportOperations {
  /** Fetch the report summary of a single storage task assignment's instances */
  list: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    options?: StorageTaskAssignmentInstancesReportListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskReportInstance>;
}

function _getStorageTaskAssignmentInstancesReport(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      options?: StorageTaskAssignmentInstancesReportListOptionalParams,
    ) => list(context, resourceGroupName, accountName, storageTaskAssignmentName, options),
  };
}

export function _getStorageTaskAssignmentInstancesReportOperations(
  context: StorageManagementContext,
): StorageTaskAssignmentInstancesReportOperations {
  return {
    ..._getStorageTaskAssignmentInstancesReport(context),
  };
}
