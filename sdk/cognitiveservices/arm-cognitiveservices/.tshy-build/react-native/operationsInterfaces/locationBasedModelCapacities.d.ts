import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ModelCapacityListResultValueItem, LocationBasedModelCapacitiesListOptionalParams } from "../models/index.js";
/** Interface representing a LocationBasedModelCapacities. */
export interface LocationBasedModelCapacities {
    /**
     * List Location Based ModelCapacities.
     * @param location Resource location.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
     * @param options The options parameters.
     */
    list(location: string, modelFormat: string, modelName: string, modelVersion: string, options?: LocationBasedModelCapacitiesListOptionalParams): PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
}
//# sourceMappingURL=locationBasedModelCapacities.d.ts.map