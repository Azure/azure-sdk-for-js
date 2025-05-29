import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Quotas } from "../operationsInterfaces/index.js";
import type { QuantumJobClient } from "../quantumJobClient.js";
import type { Quota, QuotasListOptionalParams } from "../models/index.js";
/** Class containing Quotas operations. */
export declare class QuotasImpl implements Quotas {
    private readonly client;
    /**
     * Initialize a new instance of the class Quotas class.
     * @param client Reference to the service client
     */
    constructor(client: QuantumJobClient);
    /**
     * List quotas for the given workspace.
     * @param options The options parameters.
     */
    list(options?: QuotasListOptionalParams): PagedAsyncIterableIterator<Quota>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List quotas for the given workspace.
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
//# sourceMappingURL=quotas.d.ts.map