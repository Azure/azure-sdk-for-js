import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ModelCapacityListResultValueItem, ModelCapacitiesListOptionalParams } from "../models/index.js";
/** Interface representing a ModelCapacities. */
export interface ModelCapacities {
    /**
     * List ModelCapacities.
     * @param modelFormat The format of the Model
     * @param modelName The name of the Model
     * @param modelVersion The version of the Model
     * @param options The options parameters.
     */
    list(modelFormat: string, modelName: string, modelVersion: string, options?: ModelCapacitiesListOptionalParams): PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
}
//# sourceMappingURL=modelCapacities.d.ts.map