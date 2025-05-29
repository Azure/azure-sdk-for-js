import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usages } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SignalRServiceUsage, UsagesListOptionalParams } from "../models/index.js";
/** Class containing Usages operations. */
export declare class UsagesImpl implements Usages {
    private readonly client;
    /**
     * Initialize a new instance of the class Usages class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List resource usage quotas by location.
     * @param location the location like "eastus"
     * @param options The options parameters.
     */
    list(location: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<SignalRServiceUsage>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List resource usage quotas by location.
     * @param location the location like "eastus"
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location the location like "eastus"
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=usages.d.ts.map