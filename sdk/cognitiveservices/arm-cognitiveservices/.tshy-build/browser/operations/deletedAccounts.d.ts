import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeletedAccounts } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Account, DeletedAccountsListOptionalParams, DeletedAccountsGetOptionalParams, DeletedAccountsGetResponse, DeletedAccountsPurgeOptionalParams } from "../models/index.js";
/** Class containing DeletedAccounts operations. */
export declare class DeletedAccountsImpl implements DeletedAccounts {
    private readonly client;
    /**
     * Initialize a new instance of the class DeletedAccounts class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    list(options?: DeletedAccountsListOptionalParams): PagedAsyncIterableIterator<Account>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns a Cognitive Services account specified by the parameters.
     * @param location Resource location.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    get(location: string, resourceGroupName: string, accountName: string, options?: DeletedAccountsGetOptionalParams): Promise<DeletedAccountsGetResponse>;
    /**
     * Deletes a Cognitive Services account from the resource group.
     * @param location Resource location.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    beginPurge(location: string, resourceGroupName: string, accountName: string, options?: DeletedAccountsPurgeOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a Cognitive Services account from the resource group.
     * @param location Resource location.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    beginPurgeAndWait(location: string, resourceGroupName: string, accountName: string, options?: DeletedAccountsPurgeOptionalParams): Promise<void>;
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=deletedAccounts.d.ts.map