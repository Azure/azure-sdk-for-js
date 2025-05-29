import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SkuInformation, SkusListOptionalParams } from "../models/index.js";
/** Interface representing a Skus. */
export interface Skus {
    /**
     * Lists the available SKUs supported by Microsoft.Storage for given subscription.
     * @param options The options parameters.
     */
    list(options?: SkusListOptionalParams): PagedAsyncIterableIterator<SkuInformation>;
}
//# sourceMappingURL=skus.d.ts.map