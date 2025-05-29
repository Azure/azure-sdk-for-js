import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RaiBlocklists } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RaiBlocklist, RaiBlocklistsListOptionalParams, RaiBlocklistsGetOptionalParams, RaiBlocklistsGetResponse, RaiBlocklistsCreateOrUpdateOptionalParams, RaiBlocklistsCreateOrUpdateResponse, RaiBlocklistsDeleteOptionalParams, RaiBlocklistsDeleteResponse } from "../models/index.js";
/** Class containing RaiBlocklists operations. */
export declare class RaiBlocklistsImpl implements RaiBlocklists {
    private readonly client;
    /**
     * Initialize a new instance of the class RaiBlocklists class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the custom blocklists associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: RaiBlocklistsListOptionalParams): PagedAsyncIterableIterator<RaiBlocklist>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the custom blocklists associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified custom blocklist associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, raiBlocklistName: string, options?: RaiBlocklistsGetOptionalParams): Promise<RaiBlocklistsGetResponse>;
    /**
     * Update the state of specified blocklist associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param raiBlocklist Properties describing the custom blocklist.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, raiBlocklistName: string, raiBlocklist: RaiBlocklist, options?: RaiBlocklistsCreateOrUpdateOptionalParams): Promise<RaiBlocklistsCreateOrUpdateResponse>;
    /**
     * Deletes the specified custom blocklist associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, raiBlocklistName: string, options?: RaiBlocklistsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<RaiBlocklistsDeleteResponse>, RaiBlocklistsDeleteResponse>>;
    /**
     * Deletes the specified custom blocklist associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, raiBlocklistName: string, options?: RaiBlocklistsDeleteOptionalParams): Promise<RaiBlocklistsDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=raiBlocklists.d.ts.map