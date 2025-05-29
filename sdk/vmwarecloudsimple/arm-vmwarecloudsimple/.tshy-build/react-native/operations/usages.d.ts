import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usages } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { Usage, UsagesListOptionalParams } from "../models/index.js";
/** Class containing Usages operations. */
export declare class UsagesImpl implements Usages {
    private readonly client;
    /**
     * Initialize a new instance of the class Usages class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of usage in region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<Usage>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of usage in region
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
//# sourceMappingURL=usages.d.ts.map