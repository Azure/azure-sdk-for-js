import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DefaultSecurityRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SecurityRule, DefaultSecurityRulesListOptionalParams, DefaultSecurityRulesGetOptionalParams, DefaultSecurityRulesGetResponse } from "../models/index.js";
/** Class containing DefaultSecurityRules operations. */
export declare class DefaultSecurityRulesImpl implements DefaultSecurityRules {
    private readonly client;
    /**
     * Initialize a new instance of the class DefaultSecurityRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all default security rules in a network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkSecurityGroupName: string, options?: DefaultSecurityRulesListOptionalParams): PagedAsyncIterableIterator<SecurityRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all default security rules in a network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the specified default network security rule.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param defaultSecurityRuleName The name of the default security rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkSecurityGroupName: string, defaultSecurityRuleName: string, options?: DefaultSecurityRulesGetOptionalParams): Promise<DefaultSecurityRulesGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=defaultSecurityRules.d.ts.map