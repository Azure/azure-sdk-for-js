import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RaiContentFilter, RaiContentFiltersListOptionalParams, RaiContentFiltersGetOptionalParams, RaiContentFiltersGetResponse } from "../models/index.js";
/** Interface representing a RaiContentFilters. */
export interface RaiContentFilters {
    /**
     * List Content Filters types.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: RaiContentFiltersListOptionalParams): PagedAsyncIterableIterator<RaiContentFilter>;
    /**
     * Get Content Filters by Name.
     * @param location Resource location.
     * @param filterName The name of the RAI Content Filter.
     * @param options The options parameters.
     */
    get(location: string, filterName: string, options?: RaiContentFiltersGetOptionalParams): Promise<RaiContentFiltersGetResponse>;
}
//# sourceMappingURL=raiContentFilters.d.ts.map