import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeletedAccount, DeletedAccountsListOptionalParams, DeletedAccountsGetOptionalParams, DeletedAccountsGetResponse } from "../models/index.js";
/** Interface representing a DeletedAccounts. */
export interface DeletedAccounts {
    /**
     * Lists deleted accounts under the subscription.
     * @param options The options parameters.
     */
    list(options?: DeletedAccountsListOptionalParams): PagedAsyncIterableIterator<DeletedAccount>;
    /**
     * Get properties of specified deleted account resource.
     * @param deletedAccountName Name of the deleted storage account.
     * @param location The location of the deleted storage account.
     * @param options The options parameters.
     */
    get(deletedAccountName: string, location: string, options?: DeletedAccountsGetOptionalParams): Promise<DeletedAccountsGetResponse>;
}
//# sourceMappingURL=deletedAccounts.d.ts.map