import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubCustomDomains } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { CustomDomain, WebPubSubCustomDomainsListOptionalParams, WebPubSubCustomDomainsGetOptionalParams, WebPubSubCustomDomainsGetResponse, WebPubSubCustomDomainsCreateOrUpdateOptionalParams, WebPubSubCustomDomainsCreateOrUpdateResponse, WebPubSubCustomDomainsDeleteOptionalParams } from "../models/index.js";
/** Class containing WebPubSubCustomDomains operations. */
export declare class WebPubSubCustomDomainsImpl implements WebPubSubCustomDomains {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubCustomDomains class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List all custom domains.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubCustomDomainsListOptionalParams): PagedAsyncIterableIterator<CustomDomain>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all custom domains.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a custom domain.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param name Custom domain name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, resourceName: string, name: string, options?: WebPubSubCustomDomainsGetOptionalParams): Promise<WebPubSubCustomDomainsGetResponse>;
    /**
     * Create or update a custom domain.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param name Custom domain name.
     * @param parameters A custom domain
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, resourceName: string, name: string, parameters: CustomDomain, options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubCustomDomainsCreateOrUpdateResponse>, WebPubSubCustomDomainsCreateOrUpdateResponse>>;
    /**
     * Create or update a custom domain.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param name Custom domain name.
     * @param parameters A custom domain
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, resourceName: string, name: string, parameters: CustomDomain, options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams): Promise<WebPubSubCustomDomainsCreateOrUpdateResponse>;
    /**
     * Delete a custom domain.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param name Custom domain name.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, resourceName: string, name: string, options?: WebPubSubCustomDomainsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete a custom domain.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param name Custom domain name.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, resourceName: string, name: string, options?: WebPubSubCustomDomainsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubCustomDomains.d.ts.map