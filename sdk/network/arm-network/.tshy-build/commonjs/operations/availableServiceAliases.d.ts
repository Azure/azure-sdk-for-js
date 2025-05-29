import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableServiceAliases } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AvailableServiceAlias, AvailableServiceAliasesListOptionalParams, AvailableServiceAliasesListByResourceGroupOptionalParams } from "../models/index.js";
/** Class containing AvailableServiceAliases operations. */
export declare class AvailableServiceAliasesImpl implements AvailableServiceAliases {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailableServiceAliases class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all available service aliases for this subscription in this region.
     * @param location The location.
     * @param options The options parameters.
     */
    list(location: string, options?: AvailableServiceAliasesListOptionalParams): PagedAsyncIterableIterator<AvailableServiceAlias>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all available service aliases for this resource group in this region.
     * @param resourceGroupName The name of the resource group.
     * @param location The location.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, location: string, options?: AvailableServiceAliasesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<AvailableServiceAlias>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all available service aliases for this subscription in this region.
     * @param location The location.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all available service aliases for this resource group in this region.
     * @param resourceGroupName The name of the resource group.
     * @param location The location.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListNext
     * @param location The location.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param location The location.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=availableServiceAliases.d.ts.map