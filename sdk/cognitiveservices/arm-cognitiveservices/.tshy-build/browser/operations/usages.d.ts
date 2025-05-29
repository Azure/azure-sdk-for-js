import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usages } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { Usage, UsagesListOptionalParams } from "../models/index.js";
/** Class containing Usages operations. */
export declare class UsagesImpl implements Usages {
    private readonly client;
    /**
     * Initialize a new instance of the class Usages class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Get usages for the requested subscription
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<Usage>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Get usages for the requested subscription
     * @param location Resource location.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location Resource location.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=usages.d.ts.map