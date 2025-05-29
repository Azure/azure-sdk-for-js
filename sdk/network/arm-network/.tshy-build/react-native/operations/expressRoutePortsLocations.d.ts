import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRoutePortsLocations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ExpressRoutePortsLocation, ExpressRoutePortsLocationsListOptionalParams, ExpressRoutePortsLocationsGetOptionalParams, ExpressRoutePortsLocationsGetResponse } from "../models/index.js";
/** Class containing ExpressRoutePortsLocations operations. */
export declare class ExpressRoutePortsLocationsImpl implements ExpressRoutePortsLocations {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRoutePortsLocations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each
     * location. Available bandwidths can only be obtained when retrieving a specific peering location.
     * @param options The options parameters.
     */
    list(options?: ExpressRoutePortsLocationsListOptionalParams): PagedAsyncIterableIterator<ExpressRoutePortsLocation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each
     * location. Available bandwidths can only be obtained when retrieving a specific peering location.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths
     * available at said peering location.
     * @param locationName Name of the requested ExpressRoutePort peering location.
     * @param options The options parameters.
     */
    get(locationName: string, options?: ExpressRoutePortsLocationsGetOptionalParams): Promise<ExpressRoutePortsLocationsGetResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRoutePortsLocations.d.ts.map