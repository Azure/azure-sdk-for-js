import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { ExtendedCommonClientOptions } from "@azure/core-http-compat";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { AnalyzeResult } from "./generated/service/models/index.js";
import type { SearchClientOptions as GetSearchClientOptions } from "./searchClient.js";
import { SearchClient } from "./searchClient.js";
import type { AliasIterator, AnalyzeTextOptions, CreateAliasOptions, CreateIndexOptions, CreateOrUpdateAliasOptions, CreateOrUpdateIndexOptions, CreateOrUpdateSynonymMapOptions, CreateSynonymMapOptions, DeleteAliasOptions, DeleteIndexOptions, DeleteSynonymMapOptions, GetAliasOptions, GetIndexOptions, GetIndexStatisticsOptions, GetServiceStatisticsOptions, GetSynonymMapsOptions, IndexIterator, IndexNameIterator, ListAliasesOptions, ListIndexesOptions, ListSynonymMapsOptions, SearchIndex, SearchIndexAlias, SearchIndexStatistics, SearchServiceStatistics, SynonymMap } from "./serviceModels.js";
/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexClientOptions extends ExtendedCommonClientOptions {
    /**
     * The API version to use when communicating with the service.
     * @deprecated use {@Link serviceVersion} instead
     */
    apiVersion?: string;
    /**
     * The service version to use when communicating with the service.
     */
    serviceVersion?: string;
    /**
     * The Audience to use for authentication with Azure Active Directory (AAD). The
     * audience is not considered when using a shared key.
     * {@link KnownSearchAudience} can be used interchangeably with audience
     */
    audience?: string;
}
/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexes, & synonymmaps.
 */
export declare class SearchIndexClient {
    /**
     * The API version to use when communicating with the service.
     */
    readonly serviceVersion: string;
    /**
     * The API version to use when communicating with the service.
     * @deprecated use {@Link serviceVersion} instead
     */
    readonly apiVersion: string;
    /**
     * The endpoint of the search service
     */
    readonly endpoint: string;
    /**
     * @hidden
     * A reference to the auto-generated SearchServiceClient
     */
    private readonly client;
    /**
     * A reference to the internal HTTP pipeline for use with raw requests
     */
    readonly pipeline: Pipeline;
    /**
     * Used to authenticate requests to the service.
     */
    private readonly credential;
    /**
     * Used to configure the Search Index client.
     */
    private readonly options;
    /**
     * Creates an instance of SearchIndexClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleSearchIndexClient
     * import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
     *
     * const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
     * ```
     * @param endpoint - The endpoint of the search service
     * @param credential - Used to authenticate requests to the service.
     * @param options - Used to configure the Search Index client.
     */
    constructor(endpoint: string, credential: KeyCredential | TokenCredential, options?: SearchIndexClientOptions);
    private listIndexesPage;
    private listIndexesAll;
    /**
     * Retrieves a list of existing indexes in the service.
     * @param options - Options to the list index operation.
     */
    listIndexes(options?: ListIndexesOptions): IndexIterator;
    private listAliasesPage;
    private listAliasesAll;
    /**
     * Lists all aliases available for a search service.
     * @param options - The options parameters.
     */
    listAliases(options?: ListAliasesOptions): AliasIterator;
    private listIndexesNamesPage;
    private listIndexesNamesAll;
    /**
     * Retrieves a list of names of existing indexes in the service.
     * @param options - Options to the list index operation.
     */
    listIndexesNames(options?: ListIndexesOptions): IndexNameIterator;
    /**
     * Retrieves a list of existing SynonymMaps in the service.
     * @param options - Options to the list SynonymMaps operation.
     */
    listSynonymMaps(options?: ListSynonymMapsOptions): Promise<Array<SynonymMap>>;
    /**
     * Retrieves a list of names of existing SynonymMaps in the service.
     * @param options - Options to the list SynonymMaps operation.
     */
    listSynonymMapsNames(options?: ListSynonymMapsOptions): Promise<Array<string>>;
    /**
     * Retrieves information about an index.
     * @param indexName - The name of the index.
     * @param options - Additional optional arguments.
     */
    getIndex(indexName: string, options?: GetIndexOptions): Promise<SearchIndex>;
    /**
     * Retrieves information about a SynonymMap.
     * @param synonymMapName - The name of the SynonymMap.
     * @param options - Additional optional arguments.
     */
    getSynonymMap(synonymMapName: string, options?: GetSynonymMapsOptions): Promise<SynonymMap>;
    /**
     * Creates a new index.
     * @param index - The information describing the index to be created.
     * @param options - Additional optional arguments.
     */
    createIndex(index: SearchIndex, options?: CreateIndexOptions): Promise<SearchIndex>;
    /**
     * Creates a new SynonymMap in a search service.
     * @param synonymMap - The synonymMap definition to create in a search service.
     * @param options - Additional optional arguments.
     */
    createSynonymMap(synonymMap: SynonymMap, options?: CreateSynonymMapOptions): Promise<SynonymMap>;
    /**
     * Creates a new index or modifies an existing one.
     * @param index - The information describing the index to be created.
     * @param options - Additional optional arguments.
     */
    createOrUpdateIndex(index: SearchIndex, options?: CreateOrUpdateIndexOptions): Promise<SearchIndex>;
    /**
     * Creates a new SynonymMap or modifies an existing one.
     * @param synonymMap - The information describing the SynonymMap to be created.
     * @param options - Additional optional arguments.
     */
    createOrUpdateSynonymMap(synonymMap: SynonymMap, options?: CreateOrUpdateSynonymMapOptions): Promise<SynonymMap>;
    /**
     * Deletes an existing index.
     * @param indexName - Index/Name of the index to delete.
     * @param options - Additional optional arguments.
     */
    deleteIndex(index: string | SearchIndex, options?: DeleteIndexOptions): Promise<void>;
    /**
     * Deletes an existing SynonymMap.
     * @param synonymMapName - SynonymMap/Name of the synonymMap to delete.
     * @param options - Additional optional arguments.
     */
    deleteSynonymMap(synonymMap: string | SynonymMap, options?: DeleteSynonymMapOptions): Promise<void>;
    /**
     * Creates a new search alias or updates an alias if it already exists.
     * @param alias - The definition of the alias to create or update.
     * @param options - The options parameters.
     */
    createOrUpdateAlias(alias: SearchIndexAlias, options?: CreateOrUpdateAliasOptions): Promise<SearchIndexAlias>;
    /**
     * Creates a new search alias.
     * @param alias - The definition of the alias to create.
     * @param options - The options parameters.
     */
    createAlias(alias: SearchIndexAlias, options?: CreateAliasOptions): Promise<SearchIndexAlias>;
    /**
     * Deletes a search alias and its associated mapping to an index. This operation is permanent, with no
     * recovery option. The mapped index is untouched by this operation.
     * @param alias - Alias/Name name of the alias to delete.
     * @param options - The options parameters.
     */
    deleteAlias(alias: string | SearchIndexAlias, options?: DeleteAliasOptions): Promise<void>;
    /**
     * Retrieves an alias definition.
     * @param aliasName - The name of the alias to retrieve.
     * @param options - The options parameters.
     */
    getAlias(aliasName: string, options?: GetAliasOptions): Promise<SearchIndexAlias>;
    /**
     * Retrieves statistics about an index, such as the count of documents and the size
     * of index storage.
     * @param indexName - The name of the index.
     * @param options - Additional optional arguments.
     */
    getIndexStatistics(indexName: string, options?: GetIndexStatisticsOptions): Promise<SearchIndexStatistics>;
    /**
     * Calls an analyzer or tokenizer manually on provided text.
     * @param indexName - The name of the index that contains the field to analyze
     * @param text - The text to break into tokens.
     * @param options - Additional arguments
     */
    analyzeText(indexName: string, options: AnalyzeTextOptions): Promise<AnalyzeResult>;
    /**
     * Retrieves statistics about the service, such as the count of documents, index, etc.
     * @param options - Additional optional arguments.
     */
    getServiceStatistics(options?: GetServiceStatisticsOptions): Promise<SearchServiceStatistics>;
    /**
     * Retrieves the SearchClient corresponding to this SearchIndexClient
     * @param indexName - Name of the index
     * @param options - SearchClient Options
     * @typeParam TModel - An optional type that represents the documents stored in
     * the search index. For the best typing experience, all non-key fields should
     * be marked optional and nullable, and the key property should have the
     * non-nullable type `string`.
     */
    getSearchClient<TModel extends object>(indexName: string, options?: GetSearchClientOptions): SearchClient<TModel>;
}
//# sourceMappingURL=searchIndexClient.d.ts.map