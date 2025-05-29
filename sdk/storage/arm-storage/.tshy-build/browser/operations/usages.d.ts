import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usages } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { Usage, UsagesListByLocationOptionalParams } from "../models/index.js";
/** Class containing Usages operations. */
export declare class UsagesImpl implements Usages {
    private readonly client;
    /**
     * Initialize a new instance of the class Usages class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets the current usage count and the limit for the resources of the location under the subscription.
     * @param location The location of the Azure Storage resource.
     * @param options The options parameters.
     */
    listByLocation(location: string, options?: UsagesListByLocationOptionalParams): PagedAsyncIterableIterator<Usage>;
    private listByLocationPagingPage;
    private listByLocationPagingAll;
    /**
     * Gets the current usage count and the limit for the resources of the location under the subscription.
     * @param location The location of the Azure Storage resource.
     * @param options The options parameters.
     */
    private _listByLocation;
}
//# sourceMappingURL=usages.d.ts.map