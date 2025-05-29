import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usage, UsagesListOptionalParams } from "../models/index.js";
/** Interface representing a Usages. */
export interface Usages {
    /**
     * Get usages for the requested subscription
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<Usage>;
}
//# sourceMappingURL=usages.d.ts.map