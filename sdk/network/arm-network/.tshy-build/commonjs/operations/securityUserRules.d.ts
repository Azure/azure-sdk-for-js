import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SecurityUserRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SecurityUserRule, SecurityUserRulesListOptionalParams, SecurityUserRulesGetOptionalParams, SecurityUserRulesGetResponse, SecurityUserRulesCreateOrUpdateOptionalParams, SecurityUserRulesCreateOrUpdateResponse, SecurityUserRulesDeleteOptionalParams } from "../models/index.js";
/** Class containing SecurityUserRules operations. */
export declare class SecurityUserRulesImpl implements SecurityUserRules {
    private readonly client;
    /**
     * Initialize a new instance of the class SecurityUserRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Security User Rules in a rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: SecurityUserRulesListOptionalParams): PagedAsyncIterableIterator<SecurityUserRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all Security User Rules in a rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a security user rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: SecurityUserRulesGetOptionalParams): Promise<SecurityUserRulesGetResponse>;
    /**
     * Creates or updates a security user rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param securityUserRule The security user rule to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, securityUserRule: SecurityUserRule, options?: SecurityUserRulesCreateOrUpdateOptionalParams): Promise<SecurityUserRulesCreateOrUpdateResponse>;
    /**
     * Deletes a security user rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: SecurityUserRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a security user rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: SecurityUserRulesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=securityUserRules.d.ts.map