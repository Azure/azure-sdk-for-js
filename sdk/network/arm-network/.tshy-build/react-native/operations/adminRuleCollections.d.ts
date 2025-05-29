import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AdminRuleCollections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { AdminRuleCollection, AdminRuleCollectionsListOptionalParams, AdminRuleCollectionsGetOptionalParams, AdminRuleCollectionsGetResponse, AdminRuleCollectionsCreateOrUpdateOptionalParams, AdminRuleCollectionsCreateOrUpdateResponse, AdminRuleCollectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing AdminRuleCollections operations. */
export declare class AdminRuleCollectionsImpl implements AdminRuleCollections {
    private readonly client;
    /**
     * Initialize a new instance of the class AdminRuleCollections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the rule collections in a security admin configuration, in a paginated format.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: AdminRuleCollectionsListOptionalParams): PagedAsyncIterableIterator<AdminRuleCollection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the rule collections in a security admin configuration, in a paginated format.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a network manager security admin configuration rule collection.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: AdminRuleCollectionsGetOptionalParams): Promise<AdminRuleCollectionsGetResponse>;
    /**
     * Creates or updates an admin rule collection.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param ruleCollection The Rule Collection to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, ruleCollection: AdminRuleCollection, options?: AdminRuleCollectionsCreateOrUpdateOptionalParams): Promise<AdminRuleCollectionsCreateOrUpdateResponse>;
    /**
     * Deletes an admin rule collection.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: AdminRuleCollectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes an admin rule collection.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param ruleCollectionName The name of the network manager security Configuration rule collection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, ruleCollectionName: string, options?: AdminRuleCollectionsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=adminRuleCollections.d.ts.map