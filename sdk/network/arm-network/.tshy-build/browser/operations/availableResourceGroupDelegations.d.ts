import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableResourceGroupDelegations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AvailableDelegation, AvailableResourceGroupDelegationsListOptionalParams } from "../models/index.js";
/** Class containing AvailableResourceGroupDelegations operations. */
export declare class AvailableResourceGroupDelegationsImpl implements AvailableResourceGroupDelegations {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailableResourceGroupDelegations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all of the available subnet delegations for this resource group in this region.
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(location: string, resourceGroupName: string, options?: AvailableResourceGroupDelegationsListOptionalParams): PagedAsyncIterableIterator<AvailableDelegation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all of the available subnet delegations for this resource group in this region.
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=availableResourceGroupDelegations.d.ts.map