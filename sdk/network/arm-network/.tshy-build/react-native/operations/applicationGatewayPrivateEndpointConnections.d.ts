import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationGatewayPrivateEndpointConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ApplicationGatewayPrivateEndpointConnection, ApplicationGatewayPrivateEndpointConnectionsListOptionalParams, ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams, ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams, ApplicationGatewayPrivateEndpointConnectionsUpdateResponse, ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams, ApplicationGatewayPrivateEndpointConnectionsGetResponse } from "../models/index.js";
/** Class containing ApplicationGatewayPrivateEndpointConnections operations. */
export declare class ApplicationGatewayPrivateEndpointConnectionsImpl implements ApplicationGatewayPrivateEndpointConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class ApplicationGatewayPrivateEndpointConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all private endpoint connections on an application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, applicationGatewayName: string, options?: ApplicationGatewayPrivateEndpointConnectionsListOptionalParams): PagedAsyncIterableIterator<ApplicationGatewayPrivateEndpointConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified private endpoint connection on application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param connectionName The name of the application gateway private endpoint connection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, applicationGatewayName: string, connectionName: string, options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified private endpoint connection on application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param connectionName The name of the application gateway private endpoint connection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, applicationGatewayName: string, connectionName: string, options?: ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * Updates the specified private endpoint connection on application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param connectionName The name of the application gateway private endpoint connection.
     * @param parameters Parameters supplied to update application gateway private endpoint connection
     *                   operation.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, applicationGatewayName: string, connectionName: string, parameters: ApplicationGatewayPrivateEndpointConnection, options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ApplicationGatewayPrivateEndpointConnectionsUpdateResponse>, ApplicationGatewayPrivateEndpointConnectionsUpdateResponse>>;
    /**
     * Updates the specified private endpoint connection on application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param connectionName The name of the application gateway private endpoint connection.
     * @param parameters Parameters supplied to update application gateway private endpoint connection
     *                   operation.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, applicationGatewayName: string, connectionName: string, parameters: ApplicationGatewayPrivateEndpointConnection, options?: ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams): Promise<ApplicationGatewayPrivateEndpointConnectionsUpdateResponse>;
    /**
     * Gets the specified private endpoint connection on application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param connectionName The name of the application gateway private endpoint connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, applicationGatewayName: string, connectionName: string, options?: ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams): Promise<ApplicationGatewayPrivateEndpointConnectionsGetResponse>;
    /**
     * Lists all private endpoint connections on an application gateway.
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
//# sourceMappingURL=applicationGatewayPrivateEndpointConnections.d.ts.map