import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubHubs } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { WebPubSubHub, WebPubSubHubsListOptionalParams, WebPubSubHubsGetOptionalParams, WebPubSubHubsGetResponse, WebPubSubHubsCreateOrUpdateOptionalParams, WebPubSubHubsCreateOrUpdateResponse, WebPubSubHubsDeleteOptionalParams } from "../models/index.js";
/** Class containing WebPubSubHubs operations. */
export declare class WebPubSubHubsImpl implements WebPubSubHubs {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubHubs class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List hub settings.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubHubsListOptionalParams): PagedAsyncIterableIterator<WebPubSubHub>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List hub settings.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a hub setting.
     * @param hubName The hub name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    get(hubName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubHubsGetOptionalParams): Promise<WebPubSubHubsGetResponse>;
    /**
     * Create or update a hub setting.
     * @param hubName The hub name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters The resource of WebPubSubHub and its properties
     * @param options The options parameters.
     */
    beginCreateOrUpdate(hubName: string, resourceGroupName: string, resourceName: string, parameters: WebPubSubHub, options?: WebPubSubHubsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubHubsCreateOrUpdateResponse>, WebPubSubHubsCreateOrUpdateResponse>>;
    /**
     * Create or update a hub setting.
     * @param hubName The hub name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters The resource of WebPubSubHub and its properties
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(hubName: string, resourceGroupName: string, resourceName: string, parameters: WebPubSubHub, options?: WebPubSubHubsCreateOrUpdateOptionalParams): Promise<WebPubSubHubsCreateOrUpdateResponse>;
    /**
     * Delete a hub setting.
     * @param hubName The hub name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDelete(hubName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubHubsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete a hub setting.
     * @param hubName The hub name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(hubName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubHubsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubHubs.d.ts.map