import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operations } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { AvailableOperation, OperationsListOptionalParams, OperationsGetOptionalParams, OperationsGetResponse } from "../models/index.js";
/** Class containing Operations operations. */
export declare class OperationsImpl implements Operations {
    private readonly client;
    /**
     * Initialize a new instance of the class Operations class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Return list of operations
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<AvailableOperation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Return list of operations
     * @param options The options parameters.
     */
    private _list;
    /**
     * Return an async operation
     * @param regionId The region Id (westus, eastus)
     * @param referer referer url
     * @param operationId operation id
     * @param options The options parameters.
     */
    get(regionId: string, referer: string, operationId: string, options?: OperationsGetOptionalParams): Promise<OperationsGetResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=operations.d.ts.map