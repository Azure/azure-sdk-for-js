import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerLoadBalancingRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { LoadBalancingRule, LoadBalancerLoadBalancingRulesListOptionalParams, LoadBalancerLoadBalancingRulesGetOptionalParams, LoadBalancerLoadBalancingRulesGetResponse, LoadBalancerLoadBalancingRulesHealthOptionalParams, LoadBalancerLoadBalancingRulesHealthResponse } from "../models/index.js";
/** Class containing LoadBalancerLoadBalancingRules operations. */
export declare class LoadBalancerLoadBalancingRulesImpl implements LoadBalancerLoadBalancingRules {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancerLoadBalancingRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the load balancing rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancerLoadBalancingRulesListOptionalParams): PagedAsyncIterableIterator<LoadBalancingRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the load balancing rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified load balancer load balancing rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param loadBalancingRuleName The name of the load balancing rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, loadBalancingRuleName: string, options?: LoadBalancerLoadBalancingRulesGetOptionalParams): Promise<LoadBalancerLoadBalancingRulesGetResponse>;
    /**
     * Get health details of a load balancing rule.
     * @param groupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param loadBalancingRuleName The name of the load balancing rule.
     * @param options The options parameters.
     */
    beginHealth(groupName: string, loadBalancerName: string, loadBalancingRuleName: string, options?: LoadBalancerLoadBalancingRulesHealthOptionalParams): Promise<SimplePollerLike<OperationState<LoadBalancerLoadBalancingRulesHealthResponse>, LoadBalancerLoadBalancingRulesHealthResponse>>;
    /**
     * Get health details of a load balancing rule.
     * @param groupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param loadBalancingRuleName The name of the load balancing rule.
     * @param options The options parameters.
     */
    beginHealthAndWait(groupName: string, loadBalancerName: string, loadBalancingRuleName: string, options?: LoadBalancerLoadBalancingRulesHealthOptionalParams): Promise<LoadBalancerLoadBalancingRulesHealthResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=loadBalancerLoadBalancingRules.d.ts.map