import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateClouds } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { PrivateCloud, PrivateCloudsListOptionalParams, PrivateCloudsGetOptionalParams, PrivateCloudsGetResponse } from "../models/index.js";
/** Class containing PrivateClouds operations. */
export declare class PrivateCloudsImpl implements PrivateClouds {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateClouds class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of private clouds in particular region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: PrivateCloudsListOptionalParams): PagedAsyncIterableIterator<PrivateCloud>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of private clouds in particular region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    private _list;
    /**
     * Returns private cloud by its name
     * @param pcName The private cloud name
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    get(pcName: string, regionId: string, options?: PrivateCloudsGetOptionalParams): Promise<PrivateCloudsGetResponse>;
    /**
     * ListNext
     * @param regionId The region Id (westus, eastus)
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=privateClouds.d.ts.map