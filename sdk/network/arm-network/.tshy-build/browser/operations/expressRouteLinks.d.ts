import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteLinks } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ExpressRouteLink, ExpressRouteLinksListOptionalParams, ExpressRouteLinksGetOptionalParams, ExpressRouteLinksGetResponse } from "../models/index.js";
/** Class containing ExpressRouteLinks operations. */
export declare class ExpressRouteLinksImpl implements ExpressRouteLinks {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteLinks class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, expressRoutePortName: string, options?: ExpressRouteLinksListOptionalParams): PagedAsyncIterableIterator<ExpressRouteLink>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the specified ExpressRouteLink resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param linkName The name of the ExpressRouteLink resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, expressRoutePortName: string, linkName: string, options?: ExpressRouteLinksGetOptionalParams): Promise<ExpressRouteLinksGetResponse>;
    /**
     * Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRouteLinks.d.ts.map