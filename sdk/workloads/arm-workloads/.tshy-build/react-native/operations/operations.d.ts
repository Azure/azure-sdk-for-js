import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operations } from "../operationsInterfaces/index.js";
import { WorkloadsClient } from "../workloadsClient.js";
import { Operation, OperationsListOptionalParams } from "../models/index.js";
/** Class containing Operations operations. */
export declare class OperationsImpl implements Operations {
    private readonly client;
    /**
     * Initialize a new instance of the class Operations class.
     * @param client Reference to the service client
     */
    constructor(client: WorkloadsClient);
    /**
     * Lists all the available API operations under this PR
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the available API operations under this PR
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=operations.d.ts.map