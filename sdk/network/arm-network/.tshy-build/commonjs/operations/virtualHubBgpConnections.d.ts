import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualHubBgpConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { BgpConnection, VirtualHubBgpConnectionsListOptionalParams, VirtualHubBgpConnectionsListLearnedRoutesOptionalParams, VirtualHubBgpConnectionsListLearnedRoutesResponse, VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams, VirtualHubBgpConnectionsListAdvertisedRoutesResponse } from "../models/index.js";
/** Class containing VirtualHubBgpConnections operations. */
export declare class VirtualHubBgpConnectionsImpl implements VirtualHubBgpConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualHubBgpConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all VirtualHubBgpConnections.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: VirtualHubBgpConnectionsListOptionalParams): PagedAsyncIterableIterator<BgpConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of all VirtualHubBgpConnections.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a list of routes the virtual hub bgp connection has learned.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the virtual hub.
     * @param connectionName The name of the virtual hub bgp connection.
     * @param options The options parameters.
     */
    beginListLearnedRoutes(resourceGroupName: string, hubName: string, connectionName: string, options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubBgpConnectionsListLearnedRoutesResponse>, VirtualHubBgpConnectionsListLearnedRoutesResponse>>;
    /**
     * Retrieves a list of routes the virtual hub bgp connection has learned.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the virtual hub.
     * @param connectionName The name of the virtual hub bgp connection.
     * @param options The options parameters.
     */
    beginListLearnedRoutesAndWait(resourceGroupName: string, hubName: string, connectionName: string, options?: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams): Promise<VirtualHubBgpConnectionsListLearnedRoutesResponse>;
    /**
     * Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the virtual hub.
     * @param connectionName The name of the virtual hub bgp connection.
     * @param options The options parameters.
     */
    beginListAdvertisedRoutes(resourceGroupName: string, hubName: string, connectionName: string, options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubBgpConnectionsListAdvertisedRoutesResponse>, VirtualHubBgpConnectionsListAdvertisedRoutesResponse>>;
    /**
     * Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the virtual hub.
     * @param connectionName The name of the virtual hub bgp connection.
     * @param options The options parameters.
     */
    beginListAdvertisedRoutesAndWait(resourceGroupName: string, hubName: string, connectionName: string, options?: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams): Promise<VirtualHubBgpConnectionsListAdvertisedRoutesResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualHubBgpConnections.d.ts.map