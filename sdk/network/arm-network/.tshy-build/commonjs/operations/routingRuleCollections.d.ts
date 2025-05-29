import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoutingRuleCollections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RoutingRuleCollection, RoutingRuleCollectionsListOptionalParams, RoutingRuleCollectionsGetOptionalParams, RoutingRuleCollectionsGetResponse, RoutingRuleCollectionsCreateOrUpdateOptionalParams, RoutingRuleCollectionsCreateOrUpdateResponse, RoutingRuleCollectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing RoutingRuleCollections operations. */
export declare class RoutingRuleCollectionsImpl implements RoutingRuleCollections {
    private readonly client;
    /**
     * Initialize a new instance of the class RoutingRuleCollections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the rule collections in a routing configuration, in a paginated format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: RoutingRuleCollectionsListOptionalParams): PagedAsyncIterableIterator<RoutingRuleCollection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the rule collections in a routing configuration, in a paginated format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a network manager routing configuration rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: RoutingRuleCollectionsGetOptionalParams): Promise<RoutingRuleCollectionsGetResponse>;
    /**
     * Creates or updates a routing rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param ruleCollection The Rule Collection to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleCollection: RoutingRuleCollection, options?: RoutingRuleCollectionsCreateOrUpdateOptionalParams): Promise<RoutingRuleCollectionsCreateOrUpdateResponse>;
    /**
     * Deletes an routing rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: RoutingRuleCollectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes an routing rule collection.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param ruleCollectionName The name of the network manager routing Configuration rule collection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: RoutingRuleCollectionsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routingRuleCollections.d.ts.map