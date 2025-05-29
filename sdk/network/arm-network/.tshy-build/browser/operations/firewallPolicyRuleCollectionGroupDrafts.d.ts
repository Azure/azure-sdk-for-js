import { FirewallPolicyRuleCollectionGroupDrafts } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams, FirewallPolicyRuleCollectionGroupDraft, FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams, FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateResponse, FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams, FirewallPolicyRuleCollectionGroupDraftsGetResponse } from "../models/index.js";
/** Class containing FirewallPolicyRuleCollectionGroupDrafts operations. */
export declare class FirewallPolicyRuleCollectionGroupDraftsImpl implements FirewallPolicyRuleCollectionGroupDrafts {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicyRuleCollectionGroupDrafts class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Delete Rule Collection Group Draft.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, options?: FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams): Promise<void>;
    /**
     * Create or Update Rule Collection Group Draft.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param parameters Parameters supplied to the create or update FirewallPolicyRuleCollectionGroup
     *                   operation.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, parameters: FirewallPolicyRuleCollectionGroupDraft, options?: FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams): Promise<FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateResponse>;
    /**
     * Get Rule Collection Group Draft.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, options?: FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams): Promise<FirewallPolicyRuleCollectionGroupDraftsGetResponse>;
}
//# sourceMappingURL=firewallPolicyRuleCollectionGroupDrafts.d.ts.map