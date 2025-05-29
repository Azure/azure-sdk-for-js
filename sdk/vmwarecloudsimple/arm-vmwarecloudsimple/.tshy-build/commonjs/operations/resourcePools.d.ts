import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ResourcePools } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { ResourcePool, ResourcePoolsListOptionalParams, ResourcePoolsGetOptionalParams, ResourcePoolsGetResponse } from "../models/index.js";
/** Class containing ResourcePools operations. */
export declare class ResourcePoolsImpl implements ResourcePools {
    private readonly client;
    /**
     * Initialize a new instance of the class ResourcePools class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of resource pools in region for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param options The options parameters.
     */
    list(regionId: string, pcName: string, options?: ResourcePoolsListOptionalParams): PagedAsyncIterableIterator<ResourcePool>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of resource pools in region for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param options The options parameters.
     */
    private _list;
    /**
     * Returns resource pool templates by its name
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param resourcePoolName resource pool id (vsphereId)
     * @param options The options parameters.
     */
    get(regionId: string, pcName: string, resourcePoolName: string, options?: ResourcePoolsGetOptionalParams): Promise<ResourcePoolsGetResponse>;
    /**
     * ListNext
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=resourcePools.d.ts.map