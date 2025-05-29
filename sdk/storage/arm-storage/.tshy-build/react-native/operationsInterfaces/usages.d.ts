import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usage, UsagesListByLocationOptionalParams } from "../models/index.js";
/** Interface representing a Usages. */
export interface Usages {
    /**
     * Gets the current usage count and the limit for the resources of the location under the subscription.
     * @param location The location of the Azure Storage resource.
     * @param options The options parameters.
     */
    listByLocation(location: string, options?: UsagesListByLocationOptionalParams): PagedAsyncIterableIterator<Usage>;
}
//# sourceMappingURL=usages.d.ts.map