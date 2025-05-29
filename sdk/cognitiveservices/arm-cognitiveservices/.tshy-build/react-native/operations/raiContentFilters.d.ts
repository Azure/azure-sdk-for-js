import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RaiContentFilters } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { RaiContentFilter, RaiContentFiltersListOptionalParams, RaiContentFiltersGetOptionalParams, RaiContentFiltersGetResponse } from "../models/index.js";
/** Class containing RaiContentFilters operations. */
export declare class RaiContentFiltersImpl implements RaiContentFilters {
    private readonly client;
    /**
     * Initialize a new instance of the class RaiContentFilters class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * List Content Filters types.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: RaiContentFiltersListOptionalParams): PagedAsyncIterableIterator<RaiContentFilter>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List Content Filters types.
     * @param location Resource location.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get Content Filters by Name.
     * @param location Resource location.
     * @param filterName The name of the RAI Content Filter.
     * @param options The options parameters.
     */
    get(location: string, filterName: string, options?: RaiContentFiltersGetOptionalParams): Promise<RaiContentFiltersGetResponse>;
    /**
     * ListNext
     * @param location Resource location.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=raiContentFilters.d.ts.map