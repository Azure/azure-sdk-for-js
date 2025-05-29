import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RouteFilters } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RouteFilter, RouteFiltersListByResourceGroupOptionalParams, RouteFiltersListOptionalParams, RouteFiltersDeleteOptionalParams, RouteFiltersGetOptionalParams, RouteFiltersGetResponse, RouteFiltersCreateOrUpdateOptionalParams, RouteFiltersCreateOrUpdateResponse, TagsObject, RouteFiltersUpdateTagsOptionalParams, RouteFiltersUpdateTagsResponse } from "../models/index.js";
/** Class containing RouteFilters operations. */
export declare class RouteFiltersImpl implements RouteFilters {
    private readonly client;
    /**
     * Initialize a new instance of the class RouteFilters class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all route filters in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: RouteFiltersListByResourceGroupOptionalParams): PagedAsyncIterableIterator<RouteFilter>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all route filters in a subscription.
     * @param options The options parameters.
     */
    list(options?: RouteFiltersListOptionalParams): PagedAsyncIterableIterator<RouteFilter>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, routeFilterName: string, options?: RouteFiltersDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, routeFilterName: string, options?: RouteFiltersDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, routeFilterName: string, options?: RouteFiltersGetOptionalParams): Promise<RouteFiltersGetResponse>;
    /**
     * Creates or updates a route filter in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param routeFilterParameters Parameters supplied to the create or update route filter operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, routeFilterName: string, routeFilterParameters: RouteFilter, options?: RouteFiltersCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RouteFiltersCreateOrUpdateResponse>, RouteFiltersCreateOrUpdateResponse>>;
    /**
     * Creates or updates a route filter in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param routeFilterParameters Parameters supplied to the create or update route filter operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, routeFilterName: string, routeFilterParameters: RouteFilter, options?: RouteFiltersCreateOrUpdateOptionalParams): Promise<RouteFiltersCreateOrUpdateResponse>;
    /**
     * Updates tags of a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param parameters Parameters supplied to update route filter tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, routeFilterName: string, parameters: TagsObject, options?: RouteFiltersUpdateTagsOptionalParams): Promise<RouteFiltersUpdateTagsResponse>;
    /**
     * Gets all route filters in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets all route filters in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routeFilters.d.ts.map