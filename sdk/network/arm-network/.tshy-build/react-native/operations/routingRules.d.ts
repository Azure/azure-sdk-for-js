import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoutingRules } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RoutingRule, RoutingRulesListOptionalParams, RoutingRulesGetOptionalParams, RoutingRulesGetResponse, RoutingRulesCreateOrUpdateOptionalParams, RoutingRulesCreateOrUpdateResponse, RoutingRulesDeleteOptionalParams } from "../models/index.js";
/** Class containing RoutingRules operations. */
export declare class RoutingRulesImpl implements RoutingRules {
    private readonly client;
    /**
     * Initialize a new instance of the class RoutingRules class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all network manager routing configuration routing rules.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: RoutingRulesListOptionalParams): PagedAsyncIterableIterator<RoutingRule>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all network manager routing configuration routing rules.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a network manager routing configuration routing rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: RoutingRulesGetOptionalParams): Promise<RoutingRulesGetResponse>;
    /**
     * Creates or updates an routing rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param routingRule The routing rule to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, routingRule: RoutingRule, options?: RoutingRulesCreateOrUpdateOptionalParams): Promise<RoutingRulesCreateOrUpdateResponse>;
    /**
     * Deletes a routing rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: RoutingRulesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a routing rule.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param ruleName The name of the rule.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleName: string, options?: RoutingRulesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routingRules.d.ts.map