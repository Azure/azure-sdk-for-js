import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { InboundNatRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { InboundNatRule, InboundNatRulesListOptionalParams, InboundNatRulesDeleteOptionalParams, InboundNatRulesGetOptionalParams, InboundNatRulesGetResponse, InboundNatRulesCreateOrUpdateOptionalParams, InboundNatRulesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing InboundNatRules operations. */
export declare class InboundNatRulesImpl implements InboundNatRules {
    private readonly client;
    /**
     * Initialize a new instance of the class InboundNatRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the inbound NAT rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: InboundNatRulesListOptionalParams): PagedAsyncIterableIterator<InboundNatRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the inbound NAT rules in a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Deletes the specified load balancer inbound NAT rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param inboundNatRuleName The name of the inbound NAT rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, loadBalancerName: string, inboundNatRuleName: string, options?: InboundNatRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified load balancer inbound NAT rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param inboundNatRuleName The name of the inbound NAT rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, loadBalancerName: string, inboundNatRuleName: string, options?: InboundNatRulesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified load balancer inbound NAT rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param inboundNatRuleName The name of the inbound NAT rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, inboundNatRuleName: string, options?: InboundNatRulesGetOptionalParams): Promise<InboundNatRulesGetResponse>;
    /**
     * Creates or updates a load balancer inbound NAT rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param inboundNatRuleName The name of the inbound NAT rule.
     * @param inboundNatRuleParameters Parameters supplied to the create or update inbound NAT rule
     *                                 operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, loadBalancerName: string, inboundNatRuleName: string, inboundNatRuleParameters: InboundNatRule, options?: InboundNatRulesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<InboundNatRulesCreateOrUpdateResponse>, InboundNatRulesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a load balancer inbound NAT rule.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param inboundNatRuleName The name of the inbound NAT rule.
     * @param inboundNatRuleParameters Parameters supplied to the create or update inbound NAT rule
     *                                 operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, loadBalancerName: string, inboundNatRuleName: string, inboundNatRuleParameters: InboundNatRule, options?: InboundNatRulesCreateOrUpdateOptionalParams): Promise<InboundNatRulesCreateOrUpdateResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=inboundNatRules.d.ts.map