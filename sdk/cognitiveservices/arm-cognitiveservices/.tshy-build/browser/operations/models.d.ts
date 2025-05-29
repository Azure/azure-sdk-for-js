import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Models } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { Model, ModelsListOptionalParams } from "../models/index.js";
/** Class containing Models operations. */
export declare class ModelsImpl implements Models {
    private readonly client;
    /**
     * Initialize a new instance of the class Models class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * List Models.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: ModelsListOptionalParams): PagedAsyncIterableIterator<Model>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List Models.
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
//# sourceMappingURL=models.d.ts.map