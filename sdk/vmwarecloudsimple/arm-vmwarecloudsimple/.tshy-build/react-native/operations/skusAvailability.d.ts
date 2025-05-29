import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SkusAvailability } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { SkuAvailability, SkusAvailabilityListOptionalParams } from "../models/index.js";
/** Class containing SkusAvailability operations. */
export declare class SkusAvailabilityImpl implements SkusAvailability {
    private readonly client;
    /**
     * Initialize a new instance of the class SkusAvailability class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of available resources in region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: SkusAvailabilityListOptionalParams): PagedAsyncIterableIterator<SkuAvailability>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of available resources in region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param regionId The region Id (westus, eastus)
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=skusAvailability.d.ts.map