import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Routes } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Route, RoutesListOptionalParams, RoutesDeleteOptionalParams, RoutesGetOptionalParams, RoutesGetResponse, RoutesCreateOrUpdateOptionalParams, RoutesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing Routes operations. */
export declare class RoutesImpl implements Routes {
    private readonly client;
    /**
     * Initialize a new instance of the class Routes class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all routes in a route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, routeTableName: string, options?: RoutesListOptionalParams): PagedAsyncIterableIterator<Route>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified route from a route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param routeName The name of the route.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, routeTableName: string, routeName: string, options?: RoutesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified route from a route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param routeName The name of the route.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, routeTableName: string, routeName: string, options?: RoutesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified route from a route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param routeName The name of the route.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, routeTableName: string, routeName: string, options?: RoutesGetOptionalParams): Promise<RoutesGetResponse>;
    /**
     * Creates or updates a route in the specified route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param routeName The name of the route.
     * @param routeParameters Parameters supplied to the create or update route operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, routeTableName: string, routeName: string, routeParameters: Route, options?: RoutesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RoutesCreateOrUpdateResponse>, RoutesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a route in the specified route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param routeName The name of the route.
     * @param routeParameters Parameters supplied to the create or update route operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, routeTableName: string, routeName: string, routeParameters: Route, options?: RoutesCreateOrUpdateOptionalParams): Promise<RoutesCreateOrUpdateResponse>;
    /**
     * Gets all routes in a route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routes.d.ts.map