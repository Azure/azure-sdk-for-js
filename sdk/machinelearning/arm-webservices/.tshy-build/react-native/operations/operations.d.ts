import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operations } from "../operationsInterfaces/index.js";
import { AzureMLWebServicesManagementClient } from "../azureMLWebServicesManagementClient.js";
import { OperationEntity, OperationsListOptionalParams } from "../models/index.js";
/** Class containing Operations operations. */
export declare class OperationsImpl implements Operations {
    private readonly client;
    /**
     * Initialize a new instance of the class Operations class.
     * @param client Reference to the service client
     */
    constructor(client: AzureMLWebServicesManagementClient);
    /**
     * Lists all the available REST API operations.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<OperationEntity>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the available REST API operations.
     * @param options The options parameters.
     */
    private _list;
}
//# sourceMappingURL=operations.d.ts.map