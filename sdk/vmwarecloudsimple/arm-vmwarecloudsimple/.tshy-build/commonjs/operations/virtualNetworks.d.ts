import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualNetworks } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { VirtualNetwork, VirtualNetworksListOptionalParams, VirtualNetworksGetOptionalParams, VirtualNetworksGetResponse } from "../models/index.js";
/** Class containing VirtualNetworks operations. */
export declare class VirtualNetworksImpl implements VirtualNetworks {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualNetworks class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Return list of virtual networks in location for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param resourcePoolName Resource pool used to derive vSphere cluster which contains virtual networks
     * @param options The options parameters.
     */
    list(regionId: string, pcName: string, resourcePoolName: string, options?: VirtualNetworksListOptionalParams): PagedAsyncIterableIterator<VirtualNetwork>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Return list of virtual networks in location for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param resourcePoolName Resource pool used to derive vSphere cluster which contains virtual networks
     * @param options The options parameters.
     */
    private _list;
    /**
     * Return virtual network by its name
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param virtualNetworkName virtual network id (vsphereId)
     * @param options The options parameters.
     */
    get(regionId: string, pcName: string, virtualNetworkName: string, options?: VirtualNetworksGetOptionalParams): Promise<VirtualNetworksGetResponse>;
    /**
     * ListNext
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualNetworks.d.ts.map