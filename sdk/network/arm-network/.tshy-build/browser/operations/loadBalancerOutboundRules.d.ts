import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerOutboundRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { OutboundRule, LoadBalancerOutboundRulesListOptionalParams, LoadBalancerOutboundRulesGetOptionalParams, LoadBalancerOutboundRulesGetResponse } from "../models/index.js";
/** Class containing LoadBalancerOutboundRules operations. */
export declare class LoadBalancerOutboundRulesImpl implements LoadBalancerOutboundRules {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancerOutboundRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the outbound rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancerOutboundRulesListOptionalParams): PagedAsyncIterableIterator<OutboundRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the outbound rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified load balancer outbound rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param outboundRuleName The name of the outbound rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, outboundRuleName: string, options?: LoadBalancerOutboundRulesGetOptionalParams): Promise<LoadBalancerOutboundRulesGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=loadBalancerOutboundRules.d.ts.map