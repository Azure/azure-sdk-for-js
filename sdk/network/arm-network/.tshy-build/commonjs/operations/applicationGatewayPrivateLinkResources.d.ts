import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationGatewayPrivateLinkResources } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ApplicationGatewayPrivateLinkResource, ApplicationGatewayPrivateLinkResourcesListOptionalParams } from "../models/index.js";
/** Class containing ApplicationGatewayPrivateLinkResources operations. */
export declare class ApplicationGatewayPrivateLinkResourcesImpl implements ApplicationGatewayPrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class ApplicationGatewayPrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all private link resources on an application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, applicationGatewayName: string, options?: ApplicationGatewayPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<ApplicationGatewayPrivateLinkResource>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all private link resources on an application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=applicationGatewayPrivateLinkResources.d.ts.map