import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubPrivateLinkResources } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { PrivateLinkResource, WebPubSubPrivateLinkResourcesListOptionalParams } from "../models/index.js";
/** Class containing WebPubSubPrivateLinkResources operations. */
export declare class WebPubSubPrivateLinkResourcesImpl implements WebPubSubPrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubPrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * Get the private link resources that need to be created for a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<PrivateLinkResource>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Get the private link resources that need to be created for a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubPrivateLinkResources.d.ts.map