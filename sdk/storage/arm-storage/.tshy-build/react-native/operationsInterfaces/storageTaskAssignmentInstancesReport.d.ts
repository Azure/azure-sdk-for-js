import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageTaskReportInstance, StorageTaskAssignmentInstancesReportListOptionalParams } from "../models/index.js";
/** Interface representing a StorageTaskAssignmentInstancesReport. */
export interface StorageTaskAssignmentInstancesReport {
    /**
     * Fetch the report summary of a single storage task assignment's instances
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param storageTaskAssignmentName The name of the storage task assignment within the specified
     *                                  resource group. Storage task assignment names must be between 3 and 24 characters in length and use
     *                                  numbers and lower-case letters only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, storageTaskAssignmentName: string, options?: StorageTaskAssignmentInstancesReportListOptionalParams): PagedAsyncIterableIterator<StorageTaskReportInstance>;
}
//# sourceMappingURL=storageTaskAssignmentInstancesReport.d.ts.map