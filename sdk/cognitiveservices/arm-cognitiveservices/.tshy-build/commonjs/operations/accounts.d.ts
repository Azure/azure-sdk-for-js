import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Accounts } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Account, AccountsListByResourceGroupOptionalParams, AccountsListOptionalParams, AccountModel, AccountsListModelsOptionalParams, AccountsCreateOptionalParams, AccountsCreateResponse, AccountsUpdateOptionalParams, AccountsUpdateResponse, AccountsDeleteOptionalParams, AccountsGetOptionalParams, AccountsGetResponse, AccountsListKeysOptionalParams, AccountsListKeysResponse, KeyName, AccountsRegenerateKeyOptionalParams, AccountsRegenerateKeyResponse, AccountsListSkusOptionalParams, AccountsListSkusResponse, AccountsListUsagesOptionalParams, AccountsListUsagesResponse } from "../models/index.js";
/** Class containing Accounts operations. */
export declare class AccountsImpl implements Accounts {
    private readonly client;
    /**
     * Initialize a new instance of the class Accounts class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Returns all the resources of a particular type belonging to a resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: AccountsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Account>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    list(options?: AccountsListOptionalParams): PagedAsyncIterableIterator<Account>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List available Models for the requested Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    listModels(resourceGroupName: string, accountName: string, options?: AccountsListModelsOptionalParams): PagedAsyncIterableIterator<AccountModel>;
    private listModelsPagingPage;
    private listModelsPagingAll;
    /**
     * Create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the
     * keys for developer to access intelligent APIs. It's also the resource type for billing.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param account The parameters to provide for the created account.
     * @param options The options parameters.
     */
    beginCreate(resourceGroupName: string, accountName: string, account: Account, options?: AccountsCreateOptionalParams): Promise<SimplePollerLike<OperationState<AccountsCreateResponse>, AccountsCreateResponse>>;
    /**
     * Create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the
     * keys for developer to access intelligent APIs. It's also the resource type for billing.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param account The parameters to provide for the created account.
     * @param options The options parameters.
     */
    beginCreateAndWait(resourceGroupName: string, accountName: string, account: Account, options?: AccountsCreateOptionalParams): Promise<AccountsCreateResponse>;
    /**
     * Updates a Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param account The parameters to provide for the created account.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, accountName: string, account: Account, options?: AccountsUpdateOptionalParams): Promise<SimplePollerLike<OperationState<AccountsUpdateResponse>, AccountsUpdateResponse>>;
    /**
     * Updates a Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param account The parameters to provide for the created account.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, accountName: string, account: Account, options?: AccountsUpdateOptionalParams): Promise<AccountsUpdateResponse>;
    /**
     * Deletes a Cognitive Services account from the resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, options?: AccountsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a Cognitive Services account from the resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, options?: AccountsDeleteOptionalParams): Promise<void>;
    /**
     * Returns a Cognitive Services account specified by the parameters.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams): Promise<AccountsGetResponse>;
    /**
     * Returns all the resources of a particular type belonging to a resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Lists the account keys for the specified Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    listKeys(resourceGroupName: string, accountName: string, options?: AccountsListKeysOptionalParams): Promise<AccountsListKeysResponse>;
    /**
     * Regenerates the specified account key for the specified Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param keyName key name to generate (Key1|Key2)
     * @param options The options parameters.
     */
    regenerateKey(resourceGroupName: string, accountName: string, keyName: KeyName, options?: AccountsRegenerateKeyOptionalParams): Promise<AccountsRegenerateKeyResponse>;
    /**
     * List available SKUs for the requested Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    listSkus(resourceGroupName: string, accountName: string, options?: AccountsListSkusOptionalParams): Promise<AccountsListSkusResponse>;
    /**
     * Get usages for the requested Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    listUsages(resourceGroupName: string, accountName: string, options?: AccountsListUsagesOptionalParams): Promise<AccountsListUsagesResponse>;
    /**
     * List available Models for the requested Cognitive Services account
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _listModels;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListModelsNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the ListModels method.
     * @param options The options parameters.
     */
    private _listModelsNext;
}
//# sourceMappingURL=accounts.d.ts.map