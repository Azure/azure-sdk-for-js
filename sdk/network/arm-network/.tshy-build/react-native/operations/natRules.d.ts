import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NatRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VpnGatewayNatRule, NatRulesListByVpnGatewayOptionalParams, NatRulesGetOptionalParams, NatRulesGetResponse, NatRulesCreateOrUpdateOptionalParams, NatRulesCreateOrUpdateResponse, NatRulesDeleteOptionalParams } from "../models/index.js";
/** Class containing NatRules operations. */
export declare class NatRulesImpl implements NatRules {
    private readonly client;
    /**
     * Initialize a new instance of the class NatRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves all nat rules for a particular virtual wan vpn gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    listByVpnGateway(resourceGroupName: string, gatewayName: string, options?: NatRulesListByVpnGatewayOptionalParams): PagedAsyncIterableIterator<VpnGatewayNatRule>;
    private listByVpnGatewayPagingPage;
    private listByVpnGatewayPagingAll;
    /**
     * Retrieves the details of a nat ruleGet.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param natRuleName The name of the nat rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, gatewayName: string, natRuleName: string, options?: NatRulesGetOptionalParams): Promise<NatRulesGetResponse>;
    /**
     * Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat
     * rules.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param natRuleName The name of the nat rule.
     * @param natRuleParameters Parameters supplied to create or Update a Nat Rule.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, gatewayName: string, natRuleName: string, natRuleParameters: VpnGatewayNatRule, options?: NatRulesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NatRulesCreateOrUpdateResponse>, NatRulesCreateOrUpdateResponse>>;
    /**
     * Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat
     * rules.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param natRuleName The name of the nat rule.
     * @param natRuleParameters Parameters supplied to create or Update a Nat Rule.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, gatewayName: string, natRuleName: string, natRuleParameters: VpnGatewayNatRule, options?: NatRulesCreateOrUpdateOptionalParams): Promise<NatRulesCreateOrUpdateResponse>;
    /**
     * Deletes a nat rule.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param natRuleName The name of the nat rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, gatewayName: string, natRuleName: string, options?: NatRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a nat rule.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param natRuleName The name of the nat rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, gatewayName: string, natRuleName: string, options?: NatRulesDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves all nat rules for a particular virtual wan vpn gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    private _listByVpnGateway;
    /**
     * ListByVpnGatewayNext
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param nextLink The nextLink from the previous successful call to the ListByVpnGateway method.
     * @param options The options parameters.
     */
    private _listByVpnGatewayNext;
}
//# sourceMappingURL=natRules.d.ts.map