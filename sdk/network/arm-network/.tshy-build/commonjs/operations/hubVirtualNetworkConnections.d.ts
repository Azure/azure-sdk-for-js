import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { HubVirtualNetworkConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { HubVirtualNetworkConnection, HubVirtualNetworkConnectionsListOptionalParams, HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams, HubVirtualNetworkConnectionsCreateOrUpdateResponse, HubVirtualNetworkConnectionsDeleteOptionalParams, HubVirtualNetworkConnectionsGetOptionalParams, HubVirtualNetworkConnectionsGetResponse } from "../models/index.js";
/** Class containing HubVirtualNetworkConnections operations. */
export declare class HubVirtualNetworkConnectionsImpl implements HubVirtualNetworkConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class HubVirtualNetworkConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all HubVirtualNetworkConnections.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: HubVirtualNetworkConnectionsListOptionalParams): PagedAsyncIterableIterator<HubVirtualNetworkConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates a hub virtual network connection if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the HubVirtualNetworkConnection.
     * @param virtualHubName The name of the VirtualHub.
     * @param connectionName The name of the HubVirtualNetworkConnection.
     * @param hubVirtualNetworkConnectionParameters Parameters supplied to create or update a hub virtual
     *                                              network connection.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, connectionName: string, hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection, options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<HubVirtualNetworkConnectionsCreateOrUpdateResponse>, HubVirtualNetworkConnectionsCreateOrUpdateResponse>>;
    /**
     * Creates a hub virtual network connection if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the HubVirtualNetworkConnection.
     * @param virtualHubName The name of the VirtualHub.
     * @param connectionName The name of the HubVirtualNetworkConnection.
     * @param hubVirtualNetworkConnectionParameters Parameters supplied to create or update a hub virtual
     *                                              network connection.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, connectionName: string, hubVirtualNetworkConnectionParameters: HubVirtualNetworkConnection, options?: HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams): Promise<HubVirtualNetworkConnectionsCreateOrUpdateResponse>;
    /**
     * Deletes a HubVirtualNetworkConnection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param connectionName The name of the HubVirtualNetworkConnection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, connectionName: string, options?: HubVirtualNetworkConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a HubVirtualNetworkConnection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param connectionName The name of the HubVirtualNetworkConnection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, connectionName: string, options?: HubVirtualNetworkConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of a HubVirtualNetworkConnection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param connectionName The name of the vpn connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, connectionName: string, options?: HubVirtualNetworkConnectionsGetOptionalParams): Promise<HubVirtualNetworkConnectionsGetResponse>;
    /**
     * Retrieves the details of all HubVirtualNetworkConnections.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=hubVirtualNetworkConnections.d.ts.map