import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubPrivateEndpointConnections } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { PrivateEndpointConnection, WebPubSubPrivateEndpointConnectionsListOptionalParams, WebPubSubPrivateEndpointConnectionsGetOptionalParams, WebPubSubPrivateEndpointConnectionsGetResponse, WebPubSubPrivateEndpointConnectionsUpdateOptionalParams, WebPubSubPrivateEndpointConnectionsUpdateResponse, WebPubSubPrivateEndpointConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing WebPubSubPrivateEndpointConnections operations. */
export declare class WebPubSubPrivateEndpointConnectionsImpl implements WebPubSubPrivateEndpointConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubPrivateEndpointConnections class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List private endpoint connections
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateEndpointConnectionsListOptionalParams): PagedAsyncIterableIterator<PrivateEndpointConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List private endpoint connections
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the specified private endpoint connection
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    get(privateEndpointConnectionName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateEndpointConnectionsGetOptionalParams): Promise<WebPubSubPrivateEndpointConnectionsGetResponse>;
    /**
     * Update the state of specified private endpoint connection
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters The resource of private endpoint and its properties
     * @param options The options parameters.
     */
    update(privateEndpointConnectionName: string, resourceGroupName: string, resourceName: string, parameters: PrivateEndpointConnection, options?: WebPubSubPrivateEndpointConnectionsUpdateOptionalParams): Promise<WebPubSubPrivateEndpointConnectionsUpdateResponse>;
    /**
     * Delete the specified private endpoint connection
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDelete(privateEndpointConnectionName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete the specified private endpoint connection
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(privateEndpointConnectionName: string, resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateEndpointConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubPrivateEndpointConnections.d.ts.map