import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableEndpointServices } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { EndpointServiceResult, AvailableEndpointServicesListOptionalParams } from "../models/index.js";
/** Class containing AvailableEndpointServices operations. */
export declare class AvailableEndpointServicesImpl implements AvailableEndpointServices {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailableEndpointServices class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List what values of endpoint services are available for use.
     * @param location The location to check available endpoint services.
     * @param options The options parameters.
     */
    list(location: string, options?: AvailableEndpointServicesListOptionalParams): PagedAsyncIterableIterator<EndpointServiceResult>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List what values of endpoint services are available for use.
     * @param location The location to check available endpoint services.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location The location to check available endpoint services.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=availableEndpointServices.d.ts.map