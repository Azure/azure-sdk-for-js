import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageTaskReportInstance, StorageTaskAssignmentsInstancesReportListOptionalParams } from "../models/index.js";
/** Interface representing a StorageTaskAssignmentsInstancesReport. */
export interface StorageTaskAssignmentsInstancesReport {
    /**
     * Fetch the report summary of all the storage task assignments and instances in an account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: StorageTaskAssignmentsInstancesReportListOptionalParams): PagedAsyncIterableIterator<StorageTaskReportInstance>;
}
//# sourceMappingURL=storageTaskAssignmentsInstancesReport.d.ts.map