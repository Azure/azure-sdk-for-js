import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { FirewallPolicyRuleCollectionGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { FirewallPolicyRuleCollectionGroup, FirewallPolicyRuleCollectionGroupsListOptionalParams, FirewallPolicyRuleCollectionGroupsDeleteOptionalParams, FirewallPolicyRuleCollectionGroupsGetOptionalParams, FirewallPolicyRuleCollectionGroupsGetResponse, FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams, FirewallPolicyRuleCollectionGroupsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing FirewallPolicyRuleCollectionGroups operations. */
export declare class FirewallPolicyRuleCollectionGroupsImpl implements FirewallPolicyRuleCollectionGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicyRuleCollectionGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPolicyRuleCollectionGroupsListOptionalParams): PagedAsyncIterableIterator<FirewallPolicyRuleCollectionGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified FirewallPolicyRuleCollectionGroup.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified FirewallPolicyRuleCollectionGroup.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified FirewallPolicyRuleCollectionGroup.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, options?: FirewallPolicyRuleCollectionGroupsGetOptionalParams): Promise<FirewallPolicyRuleCollectionGroupsGetResponse>;
    /**
     * Creates or updates the specified FirewallPolicyRuleCollectionGroup.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param parameters Parameters supplied to the create or update FirewallPolicyRuleCollectionGroup
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, parameters: FirewallPolicyRuleCollectionGroup, options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<FirewallPolicyRuleCollectionGroupsCreateOrUpdateResponse>, FirewallPolicyRuleCollectionGroupsCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified FirewallPolicyRuleCollectionGroup.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param ruleCollectionGroupName The name of the FirewallPolicyRuleCollectionGroup.
     * @param parameters Parameters supplied to the create or update FirewallPolicyRuleCollectionGroup
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, firewallPolicyName: string, ruleCollectionGroupName: string, parameters: FirewallPolicyRuleCollectionGroup, options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams): Promise<FirewallPolicyRuleCollectionGroupsCreateOrUpdateResponse>;
    /**
     * Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=firewallPolicyRuleCollectionGroups.d.ts.map