import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageTaskAssignmentsInstancesReport } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { StorageTaskReportInstance, StorageTaskAssignmentsInstancesReportListOptionalParams } from "../models/index.js";
/** Class containing StorageTaskAssignmentsInstancesReport operations. */
export declare class StorageTaskAssignmentsInstancesReportImpl implements StorageTaskAssignmentsInstancesReport {
    private readonly client;
    /**
     * Initialize a new instance of the class StorageTaskAssignmentsInstancesReport class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Fetch the report summary of all the storage task assignments and instances in an account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: StorageTaskAssignmentsInstancesReportListOptionalParams): PagedAsyncIterableIterator<StorageTaskReportInstance>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Fetch the report summary of all the storage task assignments and instances in an account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=storageTaskAssignmentsInstancesReport.d.ts.map