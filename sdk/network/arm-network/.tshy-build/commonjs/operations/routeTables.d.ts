import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RouteTables } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RouteTable, RouteTablesListOptionalParams, RouteTablesListAllOptionalParams, RouteTablesDeleteOptionalParams, RouteTablesGetOptionalParams, RouteTablesGetResponse, RouteTablesCreateOrUpdateOptionalParams, RouteTablesCreateOrUpdateResponse, TagsObject, RouteTablesUpdateTagsOptionalParams, RouteTablesUpdateTagsResponse } from "../models/index.js";
/** Class containing RouteTables operations. */
export declare class RouteTablesImpl implements RouteTables {
    private readonly client;
    /**
     * Initialize a new instance of the class RouteTables class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all route tables in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: RouteTablesListOptionalParams): PagedAsyncIterableIterator<RouteTable>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all route tables in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: RouteTablesListAllOptionalParams): PagedAsyncIterableIterator<RouteTable>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Deletes the specified route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, routeTableName: string, options?: RouteTablesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, routeTableName: string, options?: RouteTablesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified route table.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, routeTableName: string, options?: RouteTablesGetOptionalParams): Promise<RouteTablesGetResponse>;
    /**
     * Create or updates a route table in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param parameters Parameters supplied to the create or update route table operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, routeTableName: string, parameters: RouteTable, options?: RouteTablesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RouteTablesCreateOrUpdateResponse>, RouteTablesCreateOrUpdateResponse>>;
    /**
     * Create or updates a route table in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param parameters Parameters supplied to the create or update route table operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, routeTableName: string, parameters: RouteTable, options?: RouteTablesCreateOrUpdateOptionalParams): Promise<RouteTablesCreateOrUpdateResponse>;
    /**
     * Updates a route table tags.
     * @param resourceGroupName The name of the resource group.
     * @param routeTableName The name of the route table.
     * @param parameters Parameters supplied to update route table tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, routeTableName: string, parameters: TagsObject, options?: RouteTablesUpdateTagsOptionalParams): Promise<RouteTablesUpdateTagsResponse>;
    /**
     * Gets all route tables in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all route tables in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
}
//# sourceMappingURL=routeTables.d.ts.map