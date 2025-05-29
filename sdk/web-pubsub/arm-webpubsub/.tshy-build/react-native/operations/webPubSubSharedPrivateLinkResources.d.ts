import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubSharedPrivateLinkResources } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SharedPrivateLinkResource, WebPubSubSharedPrivateLinkResourcesListOptionalParams, WebPubSubSharedPrivateLinkResourcesGetOptionalParams, WebPubSubSharedPrivateLinkResourcesGetResponse, WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams, WebPubSubSharedPrivateLinkResourcesCreateOrUpdateResponse, WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams } from "../models/index.js";
/** Class containing WebPubSubSharedPrivateLinkResources operations. */
export declare class WebPubSubSharedPrivateLinkResourcesImpl implements WebPubSubSharedPrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubSharedPrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List shared private link resources
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubSharedPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<SharedPrivateLinkResource>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List shared private link resources
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the specified shared private link resource
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    get(sharedPrivateLinkResourceName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubSharedPrivateLinkResourcesGetOptionalParams): Promise<WebPubSubSharedPrivateLinkResourcesGetResponse>;
    /**
     * Create or update a shared private link resource
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters The shared private link resource
     * @param options The options parameters.
     */
    beginCreateOrUpdate(sharedPrivateLinkResourceName: string, resourceGroupName: string, resourceName: string, parameters: SharedPrivateLinkResource, options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubSharedPrivateLinkResourcesCreateOrUpdateResponse>, WebPubSubSharedPrivateLinkResourcesCreateOrUpdateResponse>>;
    /**
     * Create or update a shared private link resource
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters The shared private link resource
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(sharedPrivateLinkResourceName: string, resourceGroupName: string, resourceName: string, parameters: SharedPrivateLinkResource, options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams): Promise<WebPubSubSharedPrivateLinkResourcesCreateOrUpdateResponse>;
    /**
     * Delete the specified shared private link resource
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDelete(sharedPrivateLinkResourceName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete the specified shared private link resource
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(sharedPrivateLinkResourceName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubSharedPrivateLinkResources.d.ts.map