import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Quota, QuotasListOptionalParams } from "../models/index.js";
/** Interface representing a Quotas. */
export interface Quotas {
    /**
     * List quotas for the given workspace.
     * @param options The options parameters.
     */
    list(options?: QuotasListOptionalParams): PagedAsyncIterableIterator<Quota>;
}
//# sourceMappingURL=quotas.d.ts.map