import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usage, UsagesListOptionalParams } from "../models/index.js";
/** Interface representing a Usages. */
export interface Usages {
    /**
     * Returns list of usage in region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<Usage>;
}
//# sourceMappingURL=usages.d.ts.map