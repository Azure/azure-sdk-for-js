import { InboundSecurityRuleOperations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { InboundSecurityRule, InboundSecurityRuleCreateOrUpdateOptionalParams, InboundSecurityRuleCreateOrUpdateResponse, InboundSecurityRuleGetOptionalParams, InboundSecurityRuleGetResponse } from "../models/index.js";
/** Class containing InboundSecurityRuleOperations operations. */
export declare class InboundSecurityRuleOperationsImpl implements InboundSecurityRuleOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class InboundSecurityRuleOperations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param ruleCollectionName The name of security rule collection.
     * @param parameters Parameters supplied to the create or update Network Virtual Appliance Inbound
     *                   Security Rules operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkVirtualApplianceName: string, ruleCollectionName: string, parameters: InboundSecurityRule, options?: InboundSecurityRuleCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<InboundSecurityRuleCreateOrUpdateResponse>, InboundSecurityRuleCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param ruleCollectionName The name of security rule collection.
     * @param parameters Parameters supplied to the create or update Network Virtual Appliance Inbound
     *                   Security Rules operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkVirtualApplianceName: string, ruleCollectionName: string, parameters: InboundSecurityRule, options?: InboundSecurityRuleCreateOrUpdateOptionalParams): Promise<InboundSecurityRuleCreateOrUpdateResponse>;
    /**
     * Retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param ruleCollectionName The name of security rule collection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkVirtualApplianceName: string, ruleCollectionName: string, options?: InboundSecurityRuleGetOptionalParams): Promise<InboundSecurityRuleGetResponse>;
}
//# sourceMappingURL=inboundSecurityRuleOperations.d.ts.map