import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteServiceProviders } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ExpressRouteServiceProvider, ExpressRouteServiceProvidersListOptionalParams } from "../models/index.js";
/** Class containing ExpressRouteServiceProviders operations. */
export declare class ExpressRouteServiceProvidersImpl implements ExpressRouteServiceProviders {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteServiceProviders class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the available express route service providers.
     * @param options The options parameters.
     */
    list(options?: ExpressRouteServiceProvidersListOptionalParams): PagedAsyncIterableIterator<ExpressRouteServiceProvider>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the available express route service providers.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRouteServiceProviders.d.ts.map