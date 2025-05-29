import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Model, ModelsListOptionalParams } from "../models/index.js";
/** Interface representing a Models. */
export interface Models {
    /**
     * List Models.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: ModelsListOptionalParams): PagedAsyncIterableIterator<Model>;
}
//# sourceMappingURL=models.d.ts.map