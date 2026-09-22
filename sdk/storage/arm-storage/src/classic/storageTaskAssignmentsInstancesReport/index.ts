// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list } from "../../api/storageTaskAssignmentsInstancesReport/operations.js";
import type { StorageTaskAssignmentsInstancesReportListOptionalParams } from "../../api/storageTaskAssignmentsInstancesReport/options.js";
import type { StorageTaskReportInstance } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageTaskAssignmentsInstancesReport operations. */
export interface StorageTaskAssignmentsInstancesReportOperations {
  /** Fetch the report summary of all the storage task assignments and instances in an account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageTaskAssignmentsInstancesReportListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskReportInstance>;
}

function _getStorageTaskAssignmentsInstancesReport(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageTaskAssignmentsInstancesReportListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
  };
}

export function _getStorageTaskAssignmentsInstancesReportOperations(
  context: StorageManagementContext,
): StorageTaskAssignmentsInstancesReportOperations {
  return {
    ..._getStorageTaskAssignmentsInstancesReport(context),
  };
}
