import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ServiceTagInformationOperations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ServiceTagInformation, ServiceTagInformationListOptionalParams } from "../models/index.js";
/** Class containing ServiceTagInformationOperations operations. */
export declare class ServiceTagInformationOperationsImpl implements ServiceTagInformationOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class ServiceTagInformationOperations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets a list of service tag information resources with pagination.
     * @param location The location that will be used as a reference for cloud (not as a filter based on
     *                 location, you will get the list of service tags with prefix details across all regions but limited
     *                 to the cloud that your subscription belongs to).
     * @param options The options parameters.
     */
    list(location: string, options?: ServiceTagInformationListOptionalParams): PagedAsyncIterableIterator<ServiceTagInformation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of service tag information resources with pagination.
     * @param location The location that will be used as a reference for cloud (not as a filter based on
     *                 location, you will get the list of service tags with prefix details across all regions but limited
     *                 to the cloud that your subscription belongs to).
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location The location that will be used as a reference for cloud (not as a filter based on
     *                 location, you will get the list of service tags with prefix details across all regions but limited
     *                 to the cloud that your subscription belongs to).
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=serviceTagInformationOperations.d.ts.map