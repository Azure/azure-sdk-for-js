import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageTaskAssignmentInstancesReport } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { StorageTaskReportInstance, StorageTaskAssignmentInstancesReportListOptionalParams } from "../models/index.js";
/** Class containing StorageTaskAssignmentInstancesReport operations. */
export declare class StorageTaskAssignmentInstancesReportImpl implements StorageTaskAssignmentInstancesReport {
    private readonly client;
    /**
     * Initialize a new instance of the class StorageTaskAssignmentInstancesReport class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
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
    private listPagingPage;
    private listPagingAll;
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
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param storageTaskAssignmentName The name of the storage task assignment within the specified
     *                                  resource group. Storage task assignment names must be between 3 and 24 characters in length and use
     *                                  numbers and lower-case letters only.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=storageTaskAssignmentInstancesReport.d.ts.map