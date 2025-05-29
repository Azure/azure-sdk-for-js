import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LocationBasedModelCapacities } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { ModelCapacityListResultValueItem, LocationBasedModelCapacitiesListOptionalParams } from "../models/index.js";
/** Class containing LocationBasedModelCapacities operations. */
export declare class LocationBasedModelCapacitiesImpl implements LocationBasedModelCapacities {
    private readonly client;
    /**
     * Initialize a new instance of the class LocationBasedModelCapacities class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * List Location Based ModelCapacities.
     * @param location Resource location.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
     * @param options The options parameters.
     */
    list(location: string, modelFormat: string, modelName: string, modelVersion: string, options?: LocationBasedModelCapacitiesListOptionalParams): PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List Location Based ModelCapacities.
     * @param location Resource location.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
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
//# sourceMappingURL=locationBasedModelCapacities.d.ts.map