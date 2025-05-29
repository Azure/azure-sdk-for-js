import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeletedAccounts } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { DeletedAccount, DeletedAccountsListOptionalParams, DeletedAccountsGetOptionalParams, DeletedAccountsGetResponse } from "../models/index.js";
/** Class containing DeletedAccounts operations. */
export declare class DeletedAccountsImpl implements DeletedAccounts {
    private readonly client;
    /**
     * Initialize a new instance of the class DeletedAccounts class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Lists deleted accounts under the subscription.
     * @param options The options parameters.
     */
    list(options?: DeletedAccountsListOptionalParams): PagedAsyncIterableIterator<DeletedAccount>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists deleted accounts under the subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get properties of specified deleted account resource.
     * @param deletedAccountName Name of the deleted storage account.
     * @param location The location of the deleted storage account.
     * @param options The options parameters.
     */
    get(deletedAccountName: string, location: string, options?: DeletedAccountsGetOptionalParams): Promise<DeletedAccountsGetResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=deletedAccounts.d.ts.map