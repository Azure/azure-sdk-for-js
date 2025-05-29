import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SecurityRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SecurityRule, SecurityRulesListOptionalParams, SecurityRulesDeleteOptionalParams, SecurityRulesGetOptionalParams, SecurityRulesGetResponse, SecurityRulesCreateOrUpdateOptionalParams, SecurityRulesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing SecurityRules operations. */
export declare class SecurityRulesImpl implements SecurityRules {
    private readonly client;
    /**
     * Initialize a new instance of the class SecurityRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all security rules in a network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkSecurityGroupName: string, options?: SecurityRulesListOptionalParams): PagedAsyncIterableIterator<SecurityRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified network security rule.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param securityRuleName The name of the security rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkSecurityGroupName: string, securityRuleName: string, options?: SecurityRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified network security rule.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param securityRuleName The name of the security rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkSecurityGroupName: string, securityRuleName: string, options?: SecurityRulesDeleteOptionalParams): Promise<void>;
    /**
     * Get the specified network security rule.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param securityRuleName The name of the security rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkSecurityGroupName: string, securityRuleName: string, options?: SecurityRulesGetOptionalParams): Promise<SecurityRulesGetResponse>;
    /**
     * Creates or updates a security rule in the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param securityRuleName The name of the security rule.
     * @param securityRuleParameters Parameters supplied to the create or update network security rule
     *                               operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkSecurityGroupName: string, securityRuleName: string, securityRuleParameters: SecurityRule, options?: SecurityRulesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<SecurityRulesCreateOrUpdateResponse>, SecurityRulesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a security rule in the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param securityRuleName The name of the security rule.
     * @param securityRuleParameters Parameters supplied to the create or update network security rule
     *                               operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkSecurityGroupName: string, securityRuleName: string, securityRuleParameters: SecurityRule, options?: SecurityRulesCreateOrUpdateOptionalParams): Promise<SecurityRulesCreateOrUpdateResponse>;
    /**
     * Gets all security rules in a network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=securityRules.d.ts.map