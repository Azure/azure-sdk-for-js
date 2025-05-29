import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ManagedPrivateEndpoints } from "../operationsInterfaces/index.js";
import type { ManagedPrivateEndpointsClient } from "../managedPrivateEndpointsClient.js";
import type { ManagedPrivateEndpoint, ManagedPrivateEndpointsListOptionalParams, ManagedPrivateEndpointsGetOptionalParams, ManagedPrivateEndpointsGetResponse, ManagedPrivateEndpointsCreateOptionalParams, ManagedPrivateEndpointsCreateResponse, ManagedPrivateEndpointsDeleteOptionalParams } from "../models/index.js";
/** Class containing ManagedPrivateEndpoints operations. */
export declare class ManagedPrivateEndpointsImpl implements ManagedPrivateEndpoints {
    private readonly client;
    /**
     * Initialize a new instance of the class ManagedPrivateEndpoints class.
     * @param client - Reference to the service client
     */
    constructor(client: ManagedPrivateEndpointsClient);
    /**
     * List Managed Private Endpoints
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param options - The options parameters.
     */
    list(managedVirtualNetworkName: string, options?: ManagedPrivateEndpointsListOptionalParams): PagedAsyncIterableIterator<ManagedPrivateEndpoint>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Get Managed Private Endpoints
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param managedPrivateEndpointName - Managed private endpoint name
     * @param options - The options parameters.
     */
    get(managedVirtualNetworkName: string, managedPrivateEndpointName: string, options?: ManagedPrivateEndpointsGetOptionalParams): Promise<ManagedPrivateEndpointsGetResponse>;
    /**
     * Create Managed Private Endpoints
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param managedPrivateEndpointName - Managed private endpoint name
     * @param managedPrivateEndpoint - Managed private endpoint properties.
     * @param options - The options parameters.
     */
    create(managedVirtualNetworkName: string, managedPrivateEndpointName: string, managedPrivateEndpoint: ManagedPrivateEndpoint, options?: ManagedPrivateEndpointsCreateOptionalParams): Promise<ManagedPrivateEndpointsCreateResponse>;
    /**
     * Delete Managed Private Endpoints
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param managedPrivateEndpointName - Managed private endpoint name
     * @param options - The options parameters.
     */
    delete(managedVirtualNetworkName: string, managedPrivateEndpointName: string, options?: ManagedPrivateEndpointsDeleteOptionalParams): Promise<void>;
    /**
     * List Managed Private Endpoints
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param options - The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param managedVirtualNetworkName - Managed virtual network name
     * @param nextLink - The nextLink from the previous successful call to the List method.
     * @param options - The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=managedPrivateEndpoints.d.ts.map