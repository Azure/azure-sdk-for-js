import * as coreHttpCompat from "@azure/core-http-compat";
import { DataSources, Indexers, Skillsets, SynonymMaps, Indexes, Aliases } from "./operationsInterfaces/index.js";
import { ApiVersion20241101Preview, SearchServiceClientOptionalParams, GetServiceStatisticsOptionalParams, GetServiceStatisticsResponse } from "./models/index.js";
/** @internal */
export declare class SearchServiceClient extends coreHttpCompat.ExtendedServiceClient {
    endpoint: string;
    apiVersion: ApiVersion20241101Preview;
    /**
     * Initializes a new instance of the SearchServiceClient class.
     * @param endpoint The endpoint URL of the search service.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(endpoint: string, apiVersion: ApiVersion20241101Preview, options?: SearchServiceClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    /**
     * Gets service level statistics for a search service.
     * @param options The options parameters.
     */
    getServiceStatistics(options?: GetServiceStatisticsOptionalParams): Promise<GetServiceStatisticsResponse>;
    dataSources: DataSources;
    indexers: Indexers;
    skillsets: Skillsets;
    synonymMaps: SynonymMaps;
    indexes: Indexes;
    aliases: Aliases;
}
//# sourceMappingURL=searchServiceClient.d.ts.map