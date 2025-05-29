import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RaiBlocklistItems } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RaiBlocklistItem, RaiBlocklistItemsListOptionalParams, RaiBlocklistItemsGetOptionalParams, RaiBlocklistItemsGetResponse, RaiBlocklistItemsCreateOrUpdateOptionalParams, RaiBlocklistItemsCreateOrUpdateResponse, RaiBlocklistItemsDeleteOptionalParams, RaiBlocklistItemsDeleteResponse, RaiBlocklistItemBulkRequest, RaiBlocklistItemsBatchAddOptionalParams, RaiBlocklistItemsBatchAddResponse, RaiBlocklistItemsBatchDeleteOptionalParams } from "../models/index.js";
/** Class containing RaiBlocklistItems operations. */
export declare class RaiBlocklistItemsImpl implements RaiBlocklistItems {
    private readonly client;
    /**
     * Initialize a new instance of the class RaiBlocklistItems class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the blocklist items associated with the custom blocklist.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, raiBlocklistName: string, options?: RaiBlocklistItemsListOptionalParams): PagedAsyncIterableIterator<RaiBlocklistItem>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the blocklist items associated with the custom blocklist.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified custom blocklist Item associated with the custom blocklist.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItemName The name of the RaiBlocklist Item associated with the custom blocklist
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItemName: string, options?: RaiBlocklistItemsGetOptionalParams): Promise<RaiBlocklistItemsGetResponse>;
    /**
     * Update the state of specified blocklist item associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItemName The name of the RaiBlocklist Item associated with the custom blocklist
     * @param raiBlocklistItem Properties describing the custom blocklist.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItemName: string, raiBlocklistItem: RaiBlocklistItem, options?: RaiBlocklistItemsCreateOrUpdateOptionalParams): Promise<RaiBlocklistItemsCreateOrUpdateResponse>;
    /**
     * Deletes the specified blocklist Item associated with the custom blocklist.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItemName The name of the RaiBlocklist Item associated with the custom blocklist
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItemName: string, options?: RaiBlocklistItemsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<RaiBlocklistItemsDeleteResponse>, RaiBlocklistItemsDeleteResponse>>;
    /**
     * Deletes the specified blocklist Item associated with the custom blocklist.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItemName The name of the RaiBlocklist Item associated with the custom blocklist
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItemName: string, options?: RaiBlocklistItemsDeleteOptionalParams): Promise<RaiBlocklistItemsDeleteResponse>;
    /**
     * Batch operation to add blocklist items.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItems Properties describing the custom blocklist items.
     * @param options The options parameters.
     */
    batchAdd(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItems: RaiBlocklistItemBulkRequest[], options?: RaiBlocklistItemsBatchAddOptionalParams): Promise<RaiBlocklistItemsBatchAddResponse>;
    /**
     * Batch operation to delete blocklist items.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklistItemsNames List of RAI Blocklist Items Names.
     * @param options The options parameters.
     */
    batchDelete(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklistItemsNames: string[], options?: RaiBlocklistItemsBatchDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=raiBlocklistItems.d.ts.map