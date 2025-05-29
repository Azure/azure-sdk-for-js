import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableDelegation, AvailableResourceGroupDelegationsListOptionalParams } from "../models/index.js";
/** Interface representing a AvailableResourceGroupDelegations. */
export interface AvailableResourceGroupDelegations {
    /**
     * Gets all of the available subnet delegations for this resource group in this region.
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(location: string, resourceGroupName: string, options?: AvailableResourceGroupDelegationsListOptionalParams): PagedAsyncIterableIterator<AvailableDelegation>;
}
//# sourceMappingURL=availableResourceGroupDelegations.d.ts.map