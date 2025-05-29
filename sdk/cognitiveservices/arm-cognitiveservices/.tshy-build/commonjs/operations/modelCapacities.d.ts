import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ModelCapacities } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { ModelCapacityListResultValueItem, ModelCapacitiesListOptionalParams } from "../models/index.js";
/** Class containing ModelCapacities operations. */
export declare class ModelCapacitiesImpl implements ModelCapacities {
    private readonly client;
    /**
     * Initialize a new instance of the class ModelCapacities class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * List ModelCapacities.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
     * @param options The options parameters.
     */
    list(modelFormat: string, modelName: string, modelVersion: string, options?: ModelCapacitiesListOptionalParams): PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List ModelCapacities.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
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
//# sourceMappingURL=modelCapacities.d.ts.map