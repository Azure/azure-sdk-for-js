import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableDelegations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AvailableDelegation, AvailableDelegationsListOptionalParams } from "../models/index.js";
/** Class containing AvailableDelegations operations. */
export declare class AvailableDelegationsImpl implements AvailableDelegations {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailableDelegations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all of the available subnet delegations for this subscription in this region.
     * @param location The location of the subnet.
     * @param options The options parameters.
     */
    list(location: string, options?: AvailableDelegationsListOptionalParams): PagedAsyncIterableIterator<AvailableDelegation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all of the available subnet delegations for this subscription in this region.
     * @param location The location of the subnet.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location The location of the subnet.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=availableDelegations.d.ts.map