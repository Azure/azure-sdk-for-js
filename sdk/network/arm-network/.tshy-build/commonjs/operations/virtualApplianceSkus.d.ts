import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualApplianceSkus } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkVirtualApplianceSku, VirtualApplianceSkusListOptionalParams, VirtualApplianceSkusGetOptionalParams, VirtualApplianceSkusGetResponse } from "../models/index.js";
/** Class containing VirtualApplianceSkus operations. */
export declare class VirtualApplianceSkusImpl implements VirtualApplianceSkus {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualApplianceSkus class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all SKUs available for a virtual appliance.
     * @param options The options parameters.
     */
    list(options?: VirtualApplianceSkusListOptionalParams): PagedAsyncIterableIterator<NetworkVirtualApplianceSku>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all SKUs available for a virtual appliance.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a single available sku for network virtual appliance.
     * @param skuName Name of the Sku.
     * @param options The options parameters.
     */
    get(skuName: string, options?: VirtualApplianceSkusGetOptionalParams): Promise<VirtualApplianceSkusGetResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualApplianceSkus.d.ts.map