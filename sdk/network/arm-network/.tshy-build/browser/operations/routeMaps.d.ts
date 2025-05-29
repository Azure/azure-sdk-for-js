import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RouteMaps } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RouteMap, RouteMapsListOptionalParams, RouteMapsGetOptionalParams, RouteMapsGetResponse, RouteMapsCreateOrUpdateOptionalParams, RouteMapsCreateOrUpdateResponse, RouteMapsDeleteOptionalParams } from "../models/index.js";
/** Class containing RouteMaps operations. */
export declare class RouteMapsImpl implements RouteMaps {
    private readonly client;
    /**
     * Initialize a new instance of the class RouteMaps class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all RouteMaps.
     * @param resourceGroupName The resource group name of the RouteMap's resource group'.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: RouteMapsListOptionalParams): PagedAsyncIterableIterator<RouteMap>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a RouteMap.
     * @param resourceGroupName The resource group name of the RouteMap's resource group.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param routeMapName The name of the RouteMap.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, routeMapName: string, options?: RouteMapsGetOptionalParams): Promise<RouteMapsGetResponse>;
    /**
     * Creates a RouteMap if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the RouteMap's resource group.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param routeMapName The name of the RouteMap.
     * @param routeMapParameters Parameters supplied to create or update a RouteMap.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, routeMapName: string, routeMapParameters: RouteMap, options?: RouteMapsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RouteMapsCreateOrUpdateResponse>, RouteMapsCreateOrUpdateResponse>>;
    /**
     * Creates a RouteMap if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the RouteMap's resource group.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param routeMapName The name of the RouteMap.
     * @param routeMapParameters Parameters supplied to create or update a RouteMap.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, routeMapName: string, routeMapParameters: RouteMap, options?: RouteMapsCreateOrUpdateOptionalParams): Promise<RouteMapsCreateOrUpdateResponse>;
    /**
     * Deletes a RouteMap.
     * @param resourceGroupName The resource group name of the RouteMap's resource group.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param routeMapName The name of the RouteMap.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, routeMapName: string, options?: RouteMapsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a RouteMap.
     * @param resourceGroupName The resource group name of the RouteMap's resource group.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param routeMapName The name of the RouteMap.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, routeMapName: string, options?: RouteMapsDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of all RouteMaps.
     * @param resourceGroupName The resource group name of the RouteMap's resource group'.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the RouteMap's resource group'.
     * @param virtualHubName The name of the VirtualHub containing the RouteMap.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routeMaps.d.ts.map