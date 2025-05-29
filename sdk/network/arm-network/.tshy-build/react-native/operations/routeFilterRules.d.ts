import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RouteFilterRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RouteFilterRule, RouteFilterRulesListByRouteFilterOptionalParams, RouteFilterRulesDeleteOptionalParams, RouteFilterRulesGetOptionalParams, RouteFilterRulesGetResponse, RouteFilterRulesCreateOrUpdateOptionalParams, RouteFilterRulesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing RouteFilterRules operations. */
export declare class RouteFilterRulesImpl implements RouteFilterRules {
    private readonly client;
    /**
     * Initialize a new instance of the class RouteFilterRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all RouteFilterRules in a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param options The options parameters.
     */
    listByRouteFilter(resourceGroupName: string, routeFilterName: string, options?: RouteFilterRulesListByRouteFilterOptionalParams): PagedAsyncIterableIterator<RouteFilterRule>;
    private listByRouteFilterPagingPage;
    private listByRouteFilterPagingAll;
    /**
     * Deletes the specified rule from a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, routeFilterName: string, ruleName: string, options?: RouteFilterRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified rule from a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, routeFilterName: string, ruleName: string, options?: RouteFilterRulesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified rule from a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, routeFilterName: string, ruleName: string, options?: RouteFilterRulesGetOptionalParams): Promise<RouteFilterRulesGetResponse>;
    /**
     * Creates or updates a route in the specified route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param ruleName The name of the route filter rule.
     * @param routeFilterRuleParameters Parameters supplied to the create or update route filter rule
     *                                  operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, routeFilterName: string, ruleName: string, routeFilterRuleParameters: RouteFilterRule, options?: RouteFilterRulesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RouteFilterRulesCreateOrUpdateResponse>, RouteFilterRulesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a route in the specified route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param ruleName The name of the route filter rule.
     * @param routeFilterRuleParameters Parameters supplied to the create or update route filter rule
     *                                  operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, routeFilterName: string, ruleName: string, routeFilterRuleParameters: RouteFilterRule, options?: RouteFilterRulesCreateOrUpdateOptionalParams): Promise<RouteFilterRulesCreateOrUpdateResponse>;
    /**
     * Gets all RouteFilterRules in a route filter.
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param options The options parameters.
     */
    private _listByRouteFilter;
    /**
     * ListByRouteFilterNext
     * @param resourceGroupName The name of the resource group.
     * @param routeFilterName The name of the route filter.
     * @param nextLink The nextLink from the previous successful call to the ListByRouteFilter method.
     * @param options The options parameters.
     */
    private _listByRouteFilterNext;
}
//# sourceMappingURL=routeFilterRules.d.ts.map