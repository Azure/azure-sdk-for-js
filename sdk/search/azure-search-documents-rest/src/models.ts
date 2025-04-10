// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query
 * behaviors.
 */
export interface SearchRequest {
  /**
   * A value that specifies whether to fetch the total count of results. Default is
   * false. Setting this value to true may have a performance impact. Note that the
   * count returned is an approximation.
   */
  count?: boolean;
  /**
   * The list of facet expressions to apply to the search query. Each facet
   * expression contains a field name, optionally followed by a comma-separated list
   * of name:value pairs.
   */
  facets?: string[];
  /** The OData $filter expression to apply to the search query. */
  filter?: string;
  /**
   * The comma-separated list of field names to use for hit highlights. Only
   * searchable fields can be used for hit highlighting.
   */
  highlight?: string;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. Default is &lt;/em&gt;.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. Default is &lt;em&gt;.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by a search query in order for the query to be reported as a success.
   * This parameter can be useful for ensuring search availability even for services
   * with only one replica. The default is 100.
   */
  minimumCoverage?: number;
  /**
   * The comma-separated list of OData $orderby expressions by which to sort the
   * results. Each expression can be either a field name or a call to either the
   * geo.distance() or the search.score() functions. Each expression can be followed
   * by asc to indicate ascending, or desc to indicate descending. The default is
   * ascending order. Ties will be broken by the match scores of documents. If no
   * $orderby is specified, the default sort order is descending by document match
   * score. There can be at most 32 $orderby clauses.
   */
  orderby?: string;
  /**
   * A value that specifies the syntax of the search query. The default is 'simple'.
   * Use 'full' if your query uses the Lucene query syntax.
   *
   * Possible values: "simple", "full", "semantic"
   */
  queryType?: QueryType;
  /**
   * A value that specifies whether we want to calculate scoring statistics (such as
   * document frequency) globally for more consistent scoring, or locally, for lower
   * latency. The default is 'local'. Use 'global' to aggregate scoring statistics
   * globally before scoring. Using global scoring statistics can increase latency
   * of search queries.
   *
   * Possible values: "local", "global"
   */
  scoringStatistics?: ScoringStatistics;
  /**
   * A value to be used to create a sticky session, which can help getting more
   * consistent results. As long as the same sessionId is used, a best-effort
   * attempt will be made to target the same replica set. Be wary that reusing the
   * same sessionID values repeatedly can interfere with the load balancing of the
   * requests across replicas and adversely affect the performance of the search
   * service. The value used as sessionId cannot start with a '_' character.
   */
  sessionId?: string;
  /**
   * The list of parameter values to be used in scoring functions (for example,
   * referencePointParameter) using the format name-values. For example, if the
   * scoring profile defines a function with a parameter called 'mylocation' the
   * parameter string would be "mylocation--122.2,44.8" (without the quotes).
   */
  scoringParameters?: string[];
  /**
   * The name of a scoring profile to evaluate match scores for matching documents
   * in order to sort the results.
   */
  scoringProfile?: string;
  /**
   * Enables a debugging tool that can be used to further explore your reranked
   * results.
   *
   * Possible values: "disabled", "semantic", "vector", "queryRewrites", "all"
   */
  debug?: QueryDebugMode;
  /**
   * A full-text search query expression; Use "*" or omit this parameter to match
   * all documents.
   */
  search?: string;
  /**
   * The comma-separated list of field names to which to scope the full-text search.
   * When using fielded search (fieldName:searchExpression) in a full Lucene query,
   * the field names of each fielded search expression take precedence over any
   * field names listed in this parameter.
   */
  searchFields?: string;
  /**
   * A value that specifies whether any or all of the search terms must be matched
   * in order to count the document as a match.
   *
   * Possible values: "any", "all"
   */
  searchMode?: SearchMode;
  /**
   * A value that specifies the language of the search query.
   *
   * Possible values: "none", "en-us", "en-gb", "en-in", "en-ca", "en-au", "fr-fr", "fr-ca", "de-de", "es-es", "es-mx", "zh-cn", "zh-tw", "pt-br", "pt-pt", "it-it", "ja-jp", "ko-kr", "ru-ru", "cs-cz", "nl-be", "nl-nl", "hu-hu", "pl-pl", "sv-se", "tr-tr", "hi-in", "ar-sa", "ar-eg", "ar-ma", "ar-kw", "ar-jo", "da-dk", "no-no", "bg-bg", "hr-hr", "hr-ba", "ms-my", "ms-bn", "sl-sl", "ta-in", "vi-vn", "el-gr", "ro-ro", "is-is", "id-id", "th-th", "lt-lt", "uk-ua", "lv-lv", "et-ee", "ca-es", "fi-fi", "sr-ba", "sr-me", "sr-rs", "sk-sk", "nb-no", "hy-am", "bn-in", "eu-es", "gl-es", "gu-in", "he-il", "ga-ie", "kn-in", "ml-in", "mr-in", "fa-ae", "pa-in", "te-in", "ur-pk"
   */
  queryLanguage?: QueryLanguage;
  /**
   * A value that specified the type of the speller to use to spell-correct
   * individual search query terms.
   *
   * Possible values: "none", "lexicon"
   */
  speller?: QuerySpellerType;
  /**
   * The comma-separated list of fields to retrieve. If unspecified, all fields
   * marked as retrievable in the schema are included.
   */
  select?: string;
  /**
   * The number of search results to skip. This value cannot be greater than
   * 100,000. If you need to scan documents in sequence, but cannot use skip due to
   * this limitation, consider using orderby on a totally-ordered key and filter
   * with a range query instead.
   */
  skip?: number;
  /**
   * The number of search results to retrieve. This can be used in conjunction with
   * $skip to implement client-side paging of search results. If results are
   * truncated due to server-side paging, the response will include a continuation
   * token that can be used to issue another Search request for the next page of
   * results.
   */
  top?: number;
  /**
   * The name of a semantic configuration that will be used when processing
   * documents for queries of type semantic.
   */
  semanticConfiguration?: string;
  /**
   * Allows the user to choose whether a semantic call should fail completely
   * (default / current behavior), or to return partial results.
   *
   * Possible values: "partial", "fail"
   */
  semanticErrorHandling?: SemanticErrorMode;
  /**
   * Allows the user to set an upper bound on the amount of time it takes for
   * semantic enrichment to finish processing before the request fails.
   */
  semanticMaxWaitInMilliseconds?: number;
  /**
   * Allows setting a separate search query that will be solely used for semantic
   * reranking, semantic captions and semantic answers. Is useful for scenarios
   * where there is a need to use different queries between the base retrieval and
   * ranking phase, and the L2 semantic phase.
   */
  semanticQuery?: string;
  /**
   * A value that specifies whether answers should be returned as part of the search
   * response.
   *
   * Possible values: "none", "extractive"
   */
  answers?: QueryAnswerType;
  /**
   * A value that specifies whether captions should be returned as part of the
   * search response.
   *
   * Possible values: "none", "extractive"
   */
  captions?: QueryCaptionType;
  /**
   * A value that specifies whether query rewrites should be generated to augment
   * the search query.
   *
   * Possible values: "none", "generative"
   */
  queryRewrites?: QueryRewritesType;
  /** The comma-separated list of field names used for semantic ranking. */
  semanticFields?: string;
  /** The query parameters for vector and hybrid search queries. */
  vectorQueries?: Array<VectorQuery>;
  /**
   * Determines whether or not filters are applied before or after the vector search
   * is performed. Default is 'preFilter' for new indexes.
   *
   * Possible values: "postFilter", "preFilter"
   */
  vectorFilterMode?: VectorFilterMode;
  /** The query parameters to configure hybrid search behaviors. */
  hybridSearch?: HybridSearch;
}

/** The query parameters for vector and hybrid search queries. */
export interface VectorQueryParent {
  /** Number of nearest neighbors to return as top hits. */
  k?: number;
  /**
   * Vector Fields of type Collection(Edm.Single) to be included in the vector
   * searched.
   */
  fields?: string;
  /**
   * When true, triggers an exhaustive k-nearest neighbor search across all vectors
   * within the vector index. Useful for scenarios where exact matches are critical,
   * such as determining ground truth values.
   */
  exhaustive?: boolean;
  /**
   * Oversampling factor. Minimum value is 1. It overrides the 'defaultOversampling'
   * parameter configured in the index definition. It can be set only when 'rerankWithOriginalVectors'
   * is true. This parameter is only permitted when a
   * compression method is used on the underlying vector field.
   */
  oversampling?: number;
  /**
   * Relative weight of the vector query when compared to other vector query and/or
   * the text query within the same search request. This value is used when
   * combining the results of multiple ranking lists produced by the different
   * vector queries and/or the results retrieved through the text query. The higher
   * the weight, the higher the documents that matched that query will be in the
   * final ranking. Default is 1.0 and the value needs to be a positive number
   * larger than zero.
   */
  weight?: number;
  /** The threshold used for vector queries. Note this can only be set if all 'fields' use the same similarity metric. */
  threshold?: VectorThreshold;
  /**
   * The OData filter expression to apply to this specific vector query. If no
   * filter expression is defined at the vector level, the expression defined in the
   * top level filter parameter is used instead.
   */
  filterOverride?: string;
  kind: VectorQueryKind;
}

/** The threshold used for vector queries. */
export interface VectorThresholdParent {
  kind: VectorThresholdKind;
}

/**
 * The results of the vector query will be filtered based on the vector similarity
 * metric. Note this is the canonical definition of similarity metric, not the 'distance'
 * version. The threshold direction (larger or smaller) will be chosen
 * automatically according to the metric used by the field.
 */
export interface VectorSimilarityThreshold extends VectorThresholdParent {
  /**
   * The threshold will filter based on the similarity metric value. Note this is
   * the canonical definition of similarity metric, not the 'distance' version. The
   * threshold direction (larger or smaller) will be chosen automatically according
   * to the metric used by the field.
   */
  value: number;
  /** The kind of threshold used to filter vector queries */
  kind: "vectorSimilarity";
}

/**
 * The results of the vector query will filter based on the '@search.score' value.
 * Note this is the @search.score returned as part of the search response. The
 * threshold direction will be chosen for higher @search.score.
 */
export interface SearchScoreThreshold extends VectorThresholdParent {
  /**
   * The threshold will filter based on the '@search.score' value. Note this is the
   * @search.score returned as part of the search response. The threshold direction
   * will be chosen for higher @search.score.
   */
  value: number;
  /** The kind of threshold used to filter vector queries */
  kind: "searchScore";
}

/**
 * The query parameters to use for vector search when a raw vector value is
 * provided.
 */
export interface VectorizedQuery extends VectorQueryParent {
  /** The vector representation of a search query. */
  vector: number[];
  /** The kind of vector query being performed. */
  kind: "vector";
}

/**
 * The query parameters to use for vector search when a text value that needs to
 * be vectorized is provided.
 */
export interface VectorizableTextQuery extends VectorQueryParent {
  /** The text to be vectorized to perform a vector search query. */
  text: string;
  /**
   * Can be configured to let a generative model rewrite the query before sending it
   * to be vectorized.
   *
   * Possible values: "none", "generative"
   */
  queryRewrites?: QueryRewritesType;
  /** The kind of vector query being performed. */
  kind: "text";
}

/**
 * The query parameters to use for vector search when an url that represents an
 * image value that needs to be vectorized is provided.
 */
export interface VectorizableImageUrlQuery extends VectorQueryParent {
  /** The URL of an image to be vectorized to perform a vector search query. */
  url?: string;
  /** The kind of vector query being performed. */
  kind: "imageUrl";
}

/**
 * The query parameters to use for vector search when a base 64 encoded binary of
 * an image that needs to be vectorized is provided.
 */
export interface VectorizableImageBinaryQuery extends VectorQueryParent {
  /**
   * The base 64 encoded binary of an image to be vectorized to perform a vector
   * search query.
   */
  base64Image?: string;
  /** The kind of vector query being performed. */
  kind: "imageBinary";
}

/** TThe query parameters to configure hybrid search behaviors. */
export interface HybridSearch {
  /**
   * Determines the maximum number of documents to be retrieved by the text query
   * portion of a hybrid search request. Those documents will be combined with the
   * documents matching the vector queries to produce a single final list of
   * results. Choosing a larger maxTextRecallSize value will allow retrieving and
   * paging through more documents (using the top and skip parameters), at the cost
   * of higher resource utilization and higher latency. The value needs to be
   * between 1 and 10,000. Default is 1000.
   */
  maxTextRecallSize?: number;
  /**
   * Determines whether the count and facets should includes all documents that
   * matched the search query, or only the documents that are retrieved within the 'maxTextRecallSize' window.
   *
   * Possible values: "countRetrievableResults", "countAllResults"
   */
  countAndFacetMode?: HybridCountAndFacetMode;
}

/**
 * Parameters for filtering, sorting, fuzzy matching, and other suggestions query
 * behaviors.
 */
export interface SuggestRequest {
  /** An OData expression that filters the documents considered for suggestions. */
  filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the suggestion query.
   * Default is false. When set to true, the query will find suggestions even if
   * there's a substituted or missing character in the search text. While this
   * provides a better experience in some scenarios, it comes at a performance cost
   * as fuzzy suggestion searches are slower and consume more resources.
   */
  fuzzy?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. If omitted, hit highlighting of suggestions is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. If omitted, hit highlighting of suggestions is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by a suggestion query in order for the query to be reported as a
   * success. This parameter can be useful for ensuring search availability even for
   * services with only one replica. The default is 80.
   */
  minimumCoverage?: number;
  /**
   * The comma-separated list of OData $orderby expressions by which to sort the
   * results. Each expression can be either a field name or a call to either the
   * geo.distance() or the search.score() functions. Each expression can be followed
   * by asc to indicate ascending, or desc to indicate descending. The default is
   * ascending order. Ties will be broken by the match scores of documents. If no
   * $orderby is specified, the default sort order is descending by document match
   * score. There can be at most 32 $orderby clauses.
   */
  orderby?: string;
  /**
   * The search text to use to suggest documents. Must be at least 1 character, and
   * no more than 100 characters.
   */
  search: string;
  /**
   * The comma-separated list of field names to search for the specified search
   * text. Target fields must be included in the specified suggester.
   */
  searchFields?: string;
  /**
   * The comma-separated list of fields to retrieve. If unspecified, only the key
   * field will be included in the results.
   */
  select?: string;
  /**
   * The name of the suggester as specified in the suggesters collection that's part
   * of the index definition.
   */
  suggesterName: string;
  /**
   * The number of suggestions to retrieve. This must be a value between 1 and 100.
   * The default is 5.
   */
  top?: number;
}

/** Contains a batch of document write actions to send to the index. */
export interface IndexBatch {
  /** The actions in the batch. */
  value: Array<IndexAction>;
}

/** Represents an index action that operates on a document. */
export interface IndexAction extends Record<string, unknown> {
  /**
   * The operation to perform on a document in an indexing batch.
   *
   * Possible values: "upload", "merge", "mergeOrUpload", "delete"
   */
  "@search.action"?: IndexActionType;
}

/** Parameters for fuzzy matching, and other autocomplete query behaviors. */
export interface AutocompleteRequest {
  /** The search text on which to base autocomplete results. */
  search: string;
  /**
   * Specifies the mode for Autocomplete. The default is 'oneTerm'. Use 'twoTerms'
   * to get shingles and 'oneTermWithContext' to use the current context while
   * producing auto-completed terms.
   *
   * Possible values: "oneTerm", "twoTerms", "oneTermWithContext"
   */
  autocompleteMode?: AutocompleteMode;
  /**
   * An OData expression that filters the documents used to produce completed terms
   * for the Autocomplete result.
   */
  filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the autocomplete query.
   * Default is false. When set to true, the query will autocomplete terms even if
   * there's a substituted or missing character in the search text. While this
   * provides a better experience in some scenarios, it comes at a performance cost
   * as fuzzy autocomplete queries are slower and consume more resources.
   */
  fuzzy?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. If omitted, hit highlighting is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. If omitted, hit highlighting is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by an autocomplete query in order for the query to be reported as a
   * success. This parameter can be useful for ensuring search availability even for
   * services with only one replica. The default is 80.
   */
  minimumCoverage?: number;
  /**
   * The comma-separated list of field names to consider when querying for
   * auto-completed terms. Target fields must be included in the specified
   * suggester.
   */
  searchFields?: string;
  /**
   * The name of the suggester as specified in the suggesters collection that's part
   * of the index definition.
   */
  suggesterName: string;
  /**
   * The number of auto-completed terms to retrieve. This must be a value between 1
   * and 100. The default is 5.
   */
  top?: number;
}

/** Represents a datasource definition, which can be used to configure an indexer. */
export interface SearchIndexerDataSource {
  /** The name of the datasource. */
  name: string;
  /** The description of the datasource. */
  description?: string;
  /**
   * The type of the datasource.
   *
   * Possible values: "azuresql", "cosmosdb", "azureblob", "azuretable", "mysql", "adlsgen2", "onelake"
   */
  type: SearchIndexerDataSourceType;
  /** Credentials for the datasource. */
  credentials: DataSourceCredentials;
  /** The data container for the datasource. */
  container: SearchIndexerDataContainer;
  /**
   * An explicit managed identity to use for this datasource. If not specified and
   * the connection string is a managed identity, the system-assigned managed
   * identity is used. If not specified, the value remains unchanged. If "none" is
   * specified, the value of this property is cleared.
   */
  identity?: SearchIndexerDataIdentity;
  /** The data change detection policy for the datasource. */
  dataChangeDetectionPolicy?: DataChangeDetectionPolicy;
  /** The data deletion detection policy for the datasource. */
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicy;
  /** The ETag of the data source. */
  "@odata.etag"?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key
   * is used to provide an additional level of encryption-at-rest for your
   * datasource definition when you want full assurance that no one, not even
   * Microsoft, can decrypt your data source definition. Once you have encrypted
   * your data source definition, it will always remain encrypted. The search
   * service will ignore attempts to set this property to null. You can change this
   * property as needed if you want to rotate your encryption key; Your datasource
   * definition will be unaffected. Encryption with customer-managed keys is not
   * available for free search services, and is only available for paid services
   * created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
}

/** Represents credentials that can be used to connect to a datasource. */
export interface DataSourceCredentials {
  /**
   * The connection string for the datasource. Set to `<unchanged>` (with brackets)
   * if you don't want the connection string updated. Set to `<redacted>` if you
   * want to remove the connection string value from the datasource.
   */
  connectionString?: string;
}

/**
 * Represents information about the entity (such as Azure SQL table or CosmosDB
 * collection) that will be indexed.
 */
export interface SearchIndexerDataContainer {
  /**
   * The name of the table or view (for Azure SQL data source) or collection (for
   * CosmosDB data source) that will be indexed.
   */
  name: string;
  /**
   * A query that is applied to this data container. The syntax and meaning of this
   * parameter is datasource-specific. Not supported by Azure SQL datasources.
   */
  query?: string;
}

/** Abstract base type for data identities. */
export interface SearchIndexerDataIdentityParent {
  "@odata.type": string;
}

/** Clears the identity property of a datasource. */
export interface SearchIndexerDataNoneIdentity
  extends SearchIndexerDataIdentityParent {
  /** The discriminator for derived types. */
  "@odata.type": "#Microsoft.Azure.Search.DataNoneIdentity";
}

/** Specifies the identity for a datasource to use. */
export interface SearchIndexerDataUserAssignedIdentity
  extends SearchIndexerDataIdentityParent {
  /**
   * The fully qualified Azure resource Id of a user assigned managed identity
   * typically in the form
   * "/subscriptions/12345678-1234-1234-1234-1234567890ab/resourceGroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId"
   * that should have been assigned to the search service.
   */
  userAssignedIdentity: string;
  /** A URI fragment specifying the type of identity. */
  "@odata.type": "#Microsoft.Azure.Search.DataUserAssignedIdentity";
}

/** Base type for data change detection policies. */
export interface DataChangeDetectionPolicyParent {
  "@odata.type": string;
}

/**
 * Defines a data change detection policy that captures changes based on the value
 * of a high water mark column.
 */
export interface HighWaterMarkChangeDetectionPolicy
  extends DataChangeDetectionPolicyParent {
  /** The name of the high water mark column. */
  highWaterMarkColumnName: string;
  /** A URI fragment specifying the type of data change detection policy. */
  "@odata.type": "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy";
}

/**
 * Defines a data change detection policy that captures changes using the
 * Integrated Change Tracking feature of Azure SQL Database.
 */
export interface SqlIntegratedChangeTrackingPolicy
  extends DataChangeDetectionPolicyParent {
  /** A URI fragment specifying the type of data change detection policy. */
  "@odata.type": "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy";
}

/** Base type for data deletion detection policies. */
export interface DataDeletionDetectionPolicyParent {
  "@odata.type": string;
}

/**
 * Defines a data deletion detection policy that implements a soft-deletion
 * strategy. It determines whether an item should be deleted based on the value of
 * a designated 'soft delete' column.
 */
export interface SoftDeleteColumnDeletionDetectionPolicy
  extends DataDeletionDetectionPolicyParent {
  /** The name of the column to use for soft-deletion detection. */
  softDeleteColumnName?: string;
  /** The marker value that identifies an item as deleted. */
  softDeleteMarkerValue?: string;
  /** A URI fragment specifying the type of data deletion detection policy. */
  "@odata.type": "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy";
}

/**
 * Defines a data deletion detection policy utilizing Azure Blob Storage's native
 * soft delete feature for deletion detection.
 */
export interface NativeBlobSoftDeleteDeletionDetectionPolicy
  extends DataDeletionDetectionPolicyParent {
  /** A URI fragment specifying the type of data deletion detection policy. */
  "@odata.type": "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy";
}

/**
 * A customer-managed encryption key in Azure Key Vault. Keys that you create and
 * manage can be used to encrypt or decrypt data-at-rest, such as indexes and
 * synonym maps.
 */
export interface SearchResourceEncryptionKey {
  /** The name of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyVaultKeyName: string;
  /** The version of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyVaultKeyVersion?: string;
  /**
   * The URI of your Azure Key Vault, also referred to as DNS name, that contains
   * the key to be used to encrypt your data at rest. An example URI might be
   * `https://my-keyvault-name.vault.azure.net`.
   */
  keyVaultUri: string;
  /**
   * Optional Azure Active Directory credentials used for accessing your Azure Key
   * Vault. Not required if using managed identity instead.
   */
  accessCredentials?: AzureActiveDirectoryApplicationCredentials;
  /**
   * An explicit managed identity to use for this encryption key. If not specified
   * and the access credentials property is null, the system-assigned managed
   * identity is used. On update to the resource, if the explicit identity is
   * unspecified, it remains unchanged. If "none" is specified, the value of this
   * property is cleared.
   */
  identity?: SearchIndexerDataIdentity;
}

/**
 * Credentials of a registered application created for your search service, used
 * for authenticated access to the encryption keys stored in Azure Key Vault.
 */
export interface AzureActiveDirectoryApplicationCredentials {
  /**
   * An AAD Application ID that was granted the required access permissions to the
   * Azure Key Vault that is to be used when encrypting your data at rest. The
   * Application ID should not be confused with the Object ID for your AAD
   * Application.
   */
  applicationId: string;
  /** The authentication key of the specified AAD application. */
  applicationSecret?: string;
}

/** The type of the keysOrIds. */
export interface DocumentKeysOrIds {
  /** document keys to be reset */
  documentKeys?: string[];
  /** datasource document identifiers to be reset */
  datasourceDocumentIds?: string[];
}

/** Represents an indexer. */
export interface SearchIndexer {
  /** The name of the indexer. */
  name: string;
  /** The description of the indexer. */
  description?: string;
  /** The name of the datasource from which this indexer reads data. */
  dataSourceName: string;
  /** The name of the skillset executing with this indexer. */
  skillsetName?: string;
  /** The name of the index to which this indexer writes data. */
  targetIndexName: string;
  /** The schedule for this indexer. */
  schedule?: IndexingSchedule;
  /** Parameters for indexer execution. */
  parameters?: IndexingParameters;
  /**
   * Defines mappings between fields in the data source and corresponding target
   * fields in the index.
   */
  fieldMappings?: Array<FieldMapping>;
  /**
   * Output field mappings are applied after enrichment and immediately before
   * indexing.
   */
  outputFieldMappings?: Array<FieldMapping>;
  /** A value indicating whether the indexer is disabled. Default is false. */
  disabled?: boolean;
  /** The ETag of the indexer. */
  "@odata.etag"?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key
   * is used to provide an additional level of encryption-at-rest for your indexer
   * definition (as well as indexer execution status) when you want full assurance
   * that no one, not even Microsoft, can decrypt them. Once you have encrypted your
   * indexer definition, it will always remain encrypted. The search service will
   * ignore attempts to set this property to null. You can change this property as
   * needed if you want to rotate your encryption key; Your indexer definition (and
   * indexer execution status) will be unaffected. Encryption with customer-managed
   * keys is not available for free search services, and is only available for paid
   * services created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * Adds caching to an enrichment pipeline to allow for incremental modification
   * steps without having to rebuild the index every time.
   */
  cache?: SearchIndexerCache;
}

/** Represents a schedule for indexer execution. */
export interface IndexingSchedule {
  /** The interval of time between indexer executions. */
  interval: string;
  /** The time when an indexer should start running. */
  startTime?: Date | string;
}

/** Represents parameters for indexer execution. */
export interface IndexingParameters {
  /**
   * The number of items that are read from the data source and indexed as a single
   * batch in order to improve performance. The default depends on the data source
   * type.
   */
  batchSize?: number;
  /**
   * The maximum number of items that can fail indexing for indexer execution to
   * still be considered successful. -1 means no limit. Default is 0.
   */
  maxFailedItems?: number;
  /**
   * The maximum number of items in a single batch that can fail indexing for the
   * batch to still be considered successful. -1 means no limit. Default is 0.
   */
  maxFailedItemsPerBatch?: number;
  /**
   * A dictionary of indexer-specific configuration properties. Each name is the
   * name of a specific property. Each value must be of a primitive type.
   */
  configuration?: IndexingParametersConfiguration;
}

/**
 * A dictionary of indexer-specific configuration properties. Each name is the
 * name of a specific property. Each value must be of a primitive type.
 */
export interface IndexingParametersConfiguration
  extends Record<string, unknown> {
  /**
   * Represents the parsing mode for indexing from an Azure blob data source.
   *
   * Possible values: "default", "text", "delimitedText", "json", "jsonArray", "jsonLines", "markdown"
   */
  parsingMode?: BlobIndexerParsingMode;
  /**
   * Comma-delimited list of filename extensions to ignore when processing from
   * Azure blob storage.  For example, you could exclude ".png, .mp4" to skip over
   * those files during indexing.
   */
  excludedFileNameExtensions?: string;
  /**
   * Comma-delimited list of filename extensions to select when processing from
   * Azure blob storage.  For example, you could focus indexing on specific
   * application files ".docx, .pptx, .msg" to specifically include those file
   * types.
   */
  indexedFileNameExtensions?: string;
  /**
   * For Azure blobs, set to false if you want to continue indexing when an
   * unsupported content type is encountered, and you don't know all the content
   * types (file extensions) in advance.
   */
  failOnUnsupportedContentType?: boolean;
  /**
   * For Azure blobs, set to false if you want to continue indexing if a document
   * fails indexing.
   */
  failOnUnprocessableDocument?: boolean;
  /**
   * For Azure blobs, set this property to true to still index storage metadata for
   * blob content that is too large to process. Oversized blobs are treated as
   * errors by default. For limits on blob size, see
   * https://learn.microsoft.com/azure/search/search-limits-quotas-capacity.
   */
  indexStorageMetadataOnlyForOversizedDocuments?: boolean;
  /**
   * For CSV blobs, specifies a comma-delimited list of column headers, useful for
   * mapping source fields to destination fields in an index.
   */
  delimitedTextHeaders?: string;
  /**
   * For CSV blobs, specifies the end-of-line single-character delimiter for CSV
   * files where each line starts a new document (for example, "|").
   */
  delimitedTextDelimiter?: string;
  /**
   * For CSV blobs, indicates that the first (non-blank) line of each blob contains
   * headers.
   */
  firstLineContainsHeaders?: boolean;
  /**
   * Specifies the submode that will determine whether a markdown file will be
   * parsed into exactly one search document or multiple search documents. Default
   * is `oneToMany`.
   *
   * Possible values: "oneToMany", "oneToOne"
   */
  markdownParsingSubmode?: MarkdownParsingSubmode;
  /**
   * Specifies the max header depth that will be considered while grouping markdown
   * content. Default is `h6`.
   *
   * Possible values: "h1", "h2", "h3", "h4", "h5", "h6"
   */
  markdownHeaderDepth?: MarkdownHeaderDepth;
  /**
   * For JSON arrays, given a structured or semi-structured document, you can
   * specify a path to the array using this property.
   */
  documentRoot?: string;
  /**
   * Specifies the data to extract from Azure blob storage and tells the indexer
   * which data to extract from image content when "imageAction" is set to a value
   * other than "none".  This applies to embedded image content in a .PDF or other
   * application, or image files such as .jpg and .png, in Azure blobs.
   *
   * Possible values: "storageMetadata", "allMetadata", "contentAndMetadata"
   */
  dataToExtract?: BlobIndexerDataToExtract;
  /**
   * Determines how to process embedded images and image files in Azure blob
   * storage.  Setting the "imageAction" configuration to any value other than
   * "none" requires that a skillset also be attached to that indexer.
   *
   * Possible values: "none", "generateNormalizedImages", "generateNormalizedImagePerPage"
   */
  imageAction?: BlobIndexerImageAction;
  /**
   * If true, will create a path //document//file_data that is an object
   * representing the original file data downloaded from your blob data source.
   * This allows you to pass the original file data to a custom skill for processing
   * within the enrichment pipeline, or to the Document Extraction skill.
   */
  allowSkillsetToReadFileData?: boolean;
  /**
   * Determines algorithm for text extraction from PDF files in Azure blob storage.
   *
   * Possible values: "none", "detectAngles"
   */
  pdfTextRotationAlgorithm?: BlobIndexerPDFTextRotationAlgorithm;
  /**
   * Specifies the environment in which the indexer should execute.
   *
   * Possible values: "standard", "private"
   */
  executionEnvironment?: IndexerExecutionEnvironment;
  /**
   * Increases the timeout beyond the 5-minute default for Azure SQL database data
   * sources, specified in the format "hh:mm:ss".
   */
  queryTimeout?: string;
}

/**
 * Defines a mapping between a field in a data source and a target field in an
 * index.
 */
export interface FieldMapping {
  /** The name of the field in the data source. */
  sourceFieldName: string;
  /**
   * The name of the target field in the index. Same as the source field name by
   * default.
   */
  targetFieldName?: string;
  /** A function to apply to each source field value before indexing. */
  mappingFunction?: FieldMappingFunction;
}

/**
 * Represents a function that transforms a value from a data source before
 * indexing.
 */
export interface FieldMappingFunction {
  /** The name of the field mapping function. */
  name: string;
  /**
   * A dictionary of parameter name/value pairs to pass to the function. Each value
   * must be of a primitive type.
   */
  parameters?: Record<string, unknown>;
}

/** The type of the cache. */
export interface SearchIndexerCache {
  /**
   * The connection string to the storage account where the cache data will be
   * persisted.
   */
  storageConnectionString?: string;
  /** Specifies whether incremental reprocessing is enabled. */
  enableReprocessing?: boolean;
  /**
   * The user-assigned managed identity used for connections to the enrichment
   * cache.  If the connection string indicates an identity (ResourceId) and it's
   * not specified, the system-assigned managed identity is used. On updates to the
   * indexer, if the identity is unspecified, the value remains unchanged. If set to
   * "none", the value of this property is cleared.
   */
  identity?: SearchIndexerDataIdentity;
  /** A guid for the SearchIndexerCache. */
  id?: string;
}

/** A list of skills. */
export interface SearchIndexerSkillset {
  /** The name of the skillset. */
  name: string;
  /** The description of the skillset. */
  description?: string;
  /** A list of skills in the skillset. */
  skills: Array<SearchIndexerSkill>;
  /** Details about the Azure AI service to be used when running skills. */
  cognitiveServices?: CognitiveServicesAccount;
  /**
   * Definition of additional projections to Azure blob, table, or files, of
   * enriched data.
   */
  knowledgeStore?: SearchIndexerKnowledgeStore;
  /** Definition of additional projections to secondary search index(es). */
  indexProjections?: SearchIndexerIndexProjection;
  /** The ETag of the skillset. */
  "@odata.etag"?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key
   * is used to provide an additional level of encryption-at-rest for your skillset
   * definition when you want full assurance that no one, not even Microsoft, can
   * decrypt your skillset definition. Once you have encrypted your skillset
   * definition, it will always remain encrypted. The search service will ignore
   * attempts to set this property to null. You can change this property as needed
   * if you want to rotate your encryption key; Your skillset definition will be
   * unaffected. Encryption with customer-managed keys is not available for free
   * search services, and is only available for paid services created on or after
   * January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
}

/** Base type for skills. */
export interface SearchIndexerSkillParent {
  /**
   * The name of the skill which uniquely identifies it within the skillset. A skill
   * with no name defined will be given a default name of its 1-based index in the
   * skills array, prefixed with the character '#'.
   */
  name?: string;
  /**
   * The description of the skill which describes the inputs, outputs, and usage of
   * the skill.
   */
  description?: string;
  /**
   * Represents the level at which operations take place, such as the document root
   * or document content (for example, /document or /document/content). The default
   * is /document.
   */
  context?: string;
  /**
   * Inputs of the skills could be a column in the source data set, or the output of
   * an upstream skill.
   */
  inputs: Array<InputFieldMappingEntry>;
  /**
   * The output of a skill is either a field in a search index, or a value that can
   * be consumed as an input by another skill.
   */
  outputs: Array<OutputFieldMappingEntry>;
  "@odata.type": string;
}

/** Input field mapping for a skill. */
export interface InputFieldMappingEntry {
  /** The name of the input. */
  name: string;
  /** The source of the input. */
  source?: string;
  /** The source context used for selecting recursive inputs. */
  sourceContext?: string;
  /** The recursive inputs used when creating a complex type. */
  inputs?: Array<InputFieldMappingEntry>;
}

/** Output field mapping for a skill. */
export interface OutputFieldMappingEntry {
  /** The name of the output defined by the skill. */
  name: string;
  /** The target name of the output. It is optional and default to name. */
  targetName?: string;
}

/**
 * A skill that enables scenarios that require a Boolean operation to determine
 * the data to assign to an output.
 */
export interface ConditionalSkill extends SearchIndexerSkillParent {
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Util.ConditionalSkill";
}

/** A skill that uses text analytics for key phrase extraction. */
export interface KeyPhraseExtractionSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "da", "nl", "en", "fi", "fr", "de", "it", "ja", "ko", "no", "pl", "pt-PT", "pt-BR", "ru", "es", "sv"
   */
  defaultLanguageCode?: KeyPhraseExtractionSkillLanguage;
  /**
   * A number indicating how many key phrases to return. If absent, all identified
   * key phrases will be returned.
   */
  maxKeyPhraseCount?: number;
  /**
   * The version of the model to use when calling the Text Analytics service. It
   * will default to the latest available when not specified. We recommend you do
   * not specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.KeyPhraseExtractionSkill";
}

/** A skill that extracts text from image files. */
export interface OcrSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "af", "sq", "anp", "ar", "ast", "awa", "az", "bfy", "eu", "be", "be-cyrl", "be-latn", "bho", "bi", "brx", "bs", "bra", "br", "bg", "bns", "bua", "ca", "ceb", "rab", "ch", "hne", "zh-Hans", "zh-Hant", "kw", "co", "crh", "hr", "cs", "da", "prs", "dhi", "doi", "nl", "en", "myv", "et", "fo", "fj", "fil", "fi", "fr", "fur", "gag", "gl", "de", "gil", "gon", "el", "kl", "gvr", "ht", "hlb", "hni", "bgc", "haw", "hi", "mww", "hoc", "hu", "is", "smn", "id", "ia", "iu", "ga", "it", "ja", "Jns", "jv", "kea", "kac", "xnr", "krc", "kaa-cyrl", "kaa", "csb", "kk-cyrl", "kk-latn", "klr", "kha", "quc", "ko", "kfq", "kpy", "kos", "kum", "ku-arab", "ku-latn", "kru", "ky", "lkt", "la", "lt", "dsb", "smj", "lb", "bfz", "ms", "mt", "kmj", "gv", "mi", "mr", "mn", "cnr-cyrl", "cnr-latn", "nap", "ne", "niu", "nog", "sme", "nb", "no", "oc", "os", "ps", "fa", "pl", "pt", "pa", "ksh", "ro", "rm", "ru", "sck", "sm", "sa", "sat", "sco", "gd", "sr", "sr-Cyrl", "sr-Latn", "xsr", "srx", "sms", "sk", "sl", "so", "sma", "es", "sw", "sv", "tg", "tt", "tet", "thf", "to", "tr", "tk", "tyv", "hsb", "ur", "ug", "uz-arab", "uz-cyrl", "uz", "vo", "wae", "cy", "fy", "yua", "za", "zu", "unk"
   */
  defaultLanguageCode?: OcrSkillLanguage;
  /** A value indicating to turn orientation detection on or not. Default is false. */
  detectOrientation?: boolean;
  /**
   * Defines the sequence of characters to use between the lines of text recognized
   * by the OCR skill. The default value is "space".
   *
   * Possible values: "space", "carriageReturn", "lineFeed", "carriageReturnLineFeed"
   */
  lineEnding?: OcrLineEnding;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Vision.OcrSkill";
}

/**
 * A skill that analyzes image files. It extracts a rich set of visual features
 * based on the image content.
 */
export interface ImageAnalysisSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "ar", "az", "bg", "bs", "ca", "cs", "cy", "da", "de", "el", "en", "es", "et", "eu", "fi", "fr", "ga", "gl", "he", "hi", "hr", "hu", "id", "it", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nb", "nl", "pl", "prs", "pt-BR", "pt", "pt-PT", "ro", "ru", "sk", "sl", "sr-Cyrl", "sr-Latn", "sv", "th", "tr", "uk", "vi", "zh", "zh-Hans", "zh-Hant"
   */
  defaultLanguageCode?: ImageAnalysisSkillLanguage;
  /** A list of visual features. */
  visualFeatures?: VisualFeature[];
  /** A string indicating which domain-specific details to return. */
  details?: ImageDetail[];
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Vision.ImageAnalysisSkill";
}

/**
 * A skill that detects the language of input text and reports a single language
 * code for every document submitted on the request. The language code is paired
 * with a score indicating the confidence of the analysis.
 */
export interface LanguageDetectionSkill extends SearchIndexerSkillParent {
  /**
   * A country code to use as a hint to the language detection model if it cannot
   * disambiguate the language.
   */
  defaultCountryHint?: string;
  /**
   * The version of the model to use when calling the Text Analytics service. It
   * will default to the latest available when not specified. We recommend you do
   * not specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.LanguageDetectionSkill";
}

/**
 * A skill for reshaping the outputs. It creates a complex type to support
 * composite fields (also known as multipart fields).
 */
export interface ShaperSkill extends SearchIndexerSkillParent {
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Util.ShaperSkill";
}

/**
 * A skill for merging two or more strings into a single unified string, with an
 * optional user-defined delimiter separating each component part.
 */
export interface MergeSkill extends SearchIndexerSkillParent {
  /**
   * The tag indicates the start of the merged text. By default, the tag is an empty
   * space.
   */
  insertPreTag?: string;
  /**
   * The tag indicates the end of the merged text. By default, the tag is an empty
   * space.
   */
  insertPostTag?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.MergeSkill";
}

/** This skill is deprecated. Use the V3.EntityRecognitionSkill instead. */
export interface EntityRecognitionSkill extends SearchIndexerSkillParent {
  /** A list of entity categories that should be extracted. */
  categories?: EntityCategory[];
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "ar", "cs", "zh-Hans", "zh-Hant", "da", "nl", "en", "fi", "fr", "de", "el", "hu", "it", "ja", "ko", "no", "pl", "pt-PT", "pt-BR", "ru", "es", "sv", "tr"
   */
  defaultLanguageCode?: EntityRecognitionSkillLanguage;
  /**
   * Determines whether or not to include entities which are well known but don't
   * conform to a pre-defined type. If this configuration is not set (default), set
   * to null or set to false, entities which don't conform to one of the pre-defined
   * types will not be surfaced.
   */
  includeTypelessEntities?: boolean;
  /**
   * A value between 0 and 1 that be used to only include entities whose confidence
   * score is greater than the value specified. If not set (default), or if
   * explicitly set to null, all entities will be included.
   */
  minimumPrecision?: number;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.EntityRecognitionSkill";
}

/** This skill is deprecated. Use the V3.SentimentSkill instead. */
export interface SentimentSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "da", "nl", "en", "fi", "fr", "de", "el", "it", "no", "pl", "pt-PT", "ru", "es", "sv", "tr"
   */
  defaultLanguageCode?: SentimentSkillLanguage;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.SentimentSkill";
}

/**
 * Using the Text Analytics API, evaluates unstructured text and for each record,
 * provides sentiment labels (such as "negative", "neutral" and "positive") based
 * on the highest confidence score found by the service at a sentence and
 * document-level.
 */
export interface SentimentSkillV3 extends SearchIndexerSkillParent {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /**
   * If set to true, the skill output will include information from Text Analytics
   * for opinion mining, namely targets (nouns or verbs) and their associated
   * assessment (adjective) in the text. Default is false.
   */
  includeOpinionMining?: boolean;
  /**
   * The version of the model to use when calling the Text Analytics service. It
   * will default to the latest available when not specified. We recommend you do
   * not specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.V3.SentimentSkill";
}

/** Using the Text Analytics API, extracts linked entities from text. */
export interface EntityLinkingSkill extends SearchIndexerSkillParent {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /**
   * A value between 0 and 1 that be used to only include entities whose confidence
   * score is greater than the value specified. If not set (default), or if
   * explicitly set to null, all entities will be included.
   */
  minimumPrecision?: number;
  /**
   * The version of the model to use when calling the Text Analytics service. It
   * will default to the latest available when not specified. We recommend you do
   * not specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.V3.EntityLinkingSkill";
}

/** Using the Text Analytics API, extracts entities of different types from text. */
export interface EntityRecognitionSkillV3 extends SearchIndexerSkillParent {
  /** A list of entity categories that should be extracted. */
  categories?: string[];
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /**
   * A value between 0 and 1 that be used to only include entities whose confidence
   * score is greater than the value specified. If not set (default), or if
   * explicitly set to null, all entities will be included.
   */
  minimumPrecision?: number;
  /**
   * The version of the model to use when calling the Text Analytics API. It will
   * default to the latest available when not specified. We recommend you do not
   * specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.V3.EntityRecognitionSkill";
}

/**
 * Using the Text Analytics API, extracts personal information from an input text
 * and gives you the option of masking it.
 */
export interface PIIDetectionSkill extends SearchIndexerSkillParent {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /**
   * A value between 0 and 1 that be used to only include entities whose confidence
   * score is greater than the value specified. If not set (default), or if
   * explicitly set to null, all entities will be included.
   */
  minimumPrecision?: number;
  /**
   * A parameter that provides various ways to mask the personal information
   * detected in the input text. Default is 'none'.
   *
   * Possible values: "none", "replace"
   */
  maskingMode?: PIIDetectionSkillMaskingMode;
  /**
   * The character used to mask the text if the maskingMode parameter is set to
   * replace. Default is '*'.
   */
  maskingCharacter?: string;
  /**
   * The version of the model to use when calling the Text Analytics service. It
   * will default to the latest available when not specified. We recommend you do
   * not specify this value unless absolutely necessary.
   */
  modelVersion?: string;
  /** A list of PII entity categories that should be extracted and masked. */
  piiCategories?: string[];
  /**
   * If specified, will set the PII domain to include only a subset of the entity
   * categories. Possible values include: 'phi', 'none'. Default is 'none'.
   */
  domain?: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.PIIDetectionSkill";
}

/** A skill to split a string into chunks of text. */
export interface SplitSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "am", "bs", "cs", "da", "de", "en", "es", "et", "fi", "fr", "he", "hi", "hr", "hu", "id", "is", "it", "ja", "ko", "lv", "nb", "nl", "pl", "pt", "pt-br", "ru", "sk", "sl", "sr", "sv", "tr", "ur", "zh"
   */
  defaultLanguageCode?: SplitSkillLanguage;
  /**
   * A value indicating which split mode to perform.
   *
   * Possible values: "pages", "sentences"
   */
  textSplitMode?: TextSplitMode;
  /** The desired maximum page length. Default is 10000. */
  maximumPageLength?: number;
  /**
   * Only applicable when textSplitMode is set to 'pages'. If specified, n+1th chunk
   * will start with this number of characters/tokens from the end of the nth chunk.
   */
  pageOverlapLength?: number;
  /**
   * Only applicable when textSplitMode is set to 'pages'. If specified, the
   * SplitSkill will discontinue splitting after processing the first 'maximumPagesToTake'
   * pages, in order to improve performance when only a few
   * initial pages are needed from each document.
   */
  maximumPagesToTake?: number;
  /**
   * Only applies if textSplitMode is set to pages. There are two possible values.
   * The choice of the values will decide the length (maximumPageLength and
   * pageOverlapLength) measurement. The default is 'characters', which means the
   * length will be measured by character.
   *
   * Possible values: "characters", "azureOpenAITokens"
   */
  unit?: SplitSkillUnit;
  /**
   * Only applies if the unit is set to azureOpenAITokens. If specified, the
   * splitSkill will use these parameters when performing the tokenization. The
   * parameters are a valid 'encoderModelName' and an optional 'allowedSpecialTokens' property.
   */
  azureOpenAITokenizerParameters?: AzureOpenAITokenizerParameters;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.SplitSkill";
}

/** Azure OpenAI Tokenizer parameters. */
export interface AzureOpenAITokenizerParameters {
  /**
   * Only applies if the unit is set to azureOpenAITokens. Options include
   * 'R50k_base', 'P50k_base', 'P50k_edit' and 'CL100k_base'. The default value is 'CL100k_base'.
   *
   * Possible values: "r50k_base", "p50k_base", "p50k_edit", "cl100k_base"
   */
  encoderModelName?: SplitSkillEncoderModelName;
  /**
   * (Optional) Only applies if the unit is set to azureOpenAITokens. This parameter
   * defines a collection of special tokens that are permitted within the
   * tokenization process.
   */
  allowedSpecialTokens?: string[];
}

/** A skill looks for text from a custom, user-defined list of words and phrases. */
export interface CustomEntityLookupSkill extends SearchIndexerSkillParent {
  /**
   * A value indicating which language code to use. Default is `en`.
   *
   * Possible values: "da", "de", "en", "es", "fi", "fr", "it", "ko", "pt"
   */
  defaultLanguageCode?: CustomEntityLookupSkillLanguage;
  /**
   * Path to a JSON or CSV file containing all the target text to match against.
   * This entity definition is read at the beginning of an indexer run. Any updates
   * to this file during an indexer run will not take effect until subsequent runs.
   * This config must be accessible over HTTPS.
   */
  entitiesDefinitionUri?: string;
  /** The inline CustomEntity definition. */
  inlineEntitiesDefinition?: Array<CustomEntity>;
  /**
   * A global flag for CaseSensitive. If CaseSensitive is not set in CustomEntity,
   * this value will be the default value.
   */
  globalDefaultCaseSensitive?: boolean;
  /**
   * A global flag for AccentSensitive. If AccentSensitive is not set in
   * CustomEntity, this value will be the default value.
   */
  globalDefaultAccentSensitive?: boolean;
  /**
   * A global flag for FuzzyEditDistance. If FuzzyEditDistance is not set in
   * CustomEntity, this value will be the default value.
   */
  globalDefaultFuzzyEditDistance?: number;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.CustomEntityLookupSkill";
}

/**
 * An object that contains information about the matches that were found, and
 * related metadata.
 */
export interface CustomEntity {
  /**
   * The top-level entity descriptor. Matches in the skill output will be grouped by
   * this name, and it should represent the "normalized" form of the text being
   * found.
   */
  name: string;
  /**
   * This field can be used as a passthrough for custom metadata about the matched
   * text(s). The value of this field will appear with every match of its entity in
   * the skill output.
   */
  description?: string;
  /**
   * This field can be used as a passthrough for custom metadata about the matched
   * text(s). The value of this field will appear with every match of its entity in
   * the skill output.
   */
  type?: string;
  /**
   * This field can be used as a passthrough for custom metadata about the matched
   * text(s). The value of this field will appear with every match of its entity in
   * the skill output.
   */
  subtype?: string;
  /**
   * This field can be used as a passthrough for custom metadata about the matched
   * text(s). The value of this field will appear with every match of its entity in
   * the skill output.
   */
  id?: string;
  /**
   * Defaults to false. Boolean value denoting whether comparisons with the entity
   * name should be sensitive to character casing. Sample case insensitive matches
   * of "Microsoft" could be: microsoft, microSoft, MICROSOFT.
   */
  caseSensitive?: boolean;
  /**
   * Defaults to false. Boolean value denoting whether comparisons with the entity
   * name should be sensitive to accent.
   */
  accentSensitive?: boolean;
  /**
   * Defaults to 0. Maximum value of 5. Denotes the acceptable number of divergent
   * characters that would still constitute a match with the entity name. The
   * smallest possible fuzziness for any given match is returned. For instance, if
   * the edit distance is set to 3, "Windows10" would still match "Windows",
   * "Windows10" and "Windows 7". When case sensitivity is set to false, case
   * differences do NOT count towards fuzziness tolerance, but otherwise do.
   */
  fuzzyEditDistance?: number;
  /**
   * Changes the default case sensitivity value for this entity. It be used to
   * change the default value of all aliases caseSensitive values.
   */
  defaultCaseSensitive?: boolean;
  /**
   * Changes the default accent sensitivity value for this entity. It be used to
   * change the default value of all aliases accentSensitive values.
   */
  defaultAccentSensitive?: boolean;
  /**
   * Changes the default fuzzy edit distance value for this entity. It can be used
   * to change the default value of all aliases fuzzyEditDistance values.
   */
  defaultFuzzyEditDistance?: number;
  /**
   * An array of complex objects that can be used to specify alternative spellings
   * or synonyms to the root entity name.
   */
  aliases?: Array<CustomEntityAlias>;
}

/**
 * A complex object that can be used to specify alternative spellings or synonyms
 * to the root entity name.
 */
export interface CustomEntityAlias {
  /** The text of the alias. */
  text: string;
  /** Determine if the alias is case sensitive. */
  caseSensitive?: boolean;
  /** Determine if the alias is accent sensitive. */
  accentSensitive?: boolean;
  /** Determine the fuzzy edit distance of the alias. */
  fuzzyEditDistance?: number;
}

/** A skill to translate text from one language to another. */
export interface TextTranslationSkill extends SearchIndexerSkillParent {
  /**
   * The language code to translate documents into for documents that don't specify
   * the to language explicitly.
   *
   * Possible values: "af", "ar", "bn", "bs", "bg", "yue", "ca", "zh-Hans", "zh-Hant", "hr", "cs", "da", "nl", "en", "et", "fj", "fil", "fi", "fr", "de", "el", "ht", "he", "hi", "mww", "hu", "is", "id", "it", "ja", "sw", "tlh", "tlh-Latn", "tlh-Piqd", "ko", "lv", "lt", "mg", "ms", "mt", "nb", "fa", "pl", "pt", "pt-br", "pt-PT", "otq", "ro", "ru", "sm", "sr-Cyrl", "sr-Latn", "sk", "sl", "es", "sv", "ty", "ta", "te", "th", "to", "tr", "uk", "ur", "vi", "cy", "yua", "ga", "kn", "mi", "ml", "pa"
   */
  defaultToLanguageCode: TextTranslationSkillLanguage;
  /**
   * The language code to translate documents from for documents that don't specify
   * the from language explicitly.
   *
   * Possible values: "af", "ar", "bn", "bs", "bg", "yue", "ca", "zh-Hans", "zh-Hant", "hr", "cs", "da", "nl", "en", "et", "fj", "fil", "fi", "fr", "de", "el", "ht", "he", "hi", "mww", "hu", "is", "id", "it", "ja", "sw", "tlh", "tlh-Latn", "tlh-Piqd", "ko", "lv", "lt", "mg", "ms", "mt", "nb", "fa", "pl", "pt", "pt-br", "pt-PT", "otq", "ro", "ru", "sm", "sr-Cyrl", "sr-Latn", "sk", "sl", "es", "sv", "ty", "ta", "te", "th", "to", "tr", "uk", "ur", "vi", "cy", "yua", "ga", "kn", "mi", "ml", "pa"
   */
  defaultFromLanguageCode?: TextTranslationSkillLanguage;
  /**
   * The language code to translate documents from when neither the fromLanguageCode
   * input nor the defaultFromLanguageCode parameter are provided, and the automatic
   * language detection is unsuccessful. Default is `en`.
   *
   * Possible values: "af", "ar", "bn", "bs", "bg", "yue", "ca", "zh-Hans", "zh-Hant", "hr", "cs", "da", "nl", "en", "et", "fj", "fil", "fi", "fr", "de", "el", "ht", "he", "hi", "mww", "hu", "is", "id", "it", "ja", "sw", "tlh", "tlh-Latn", "tlh-Piqd", "ko", "lv", "lt", "mg", "ms", "mt", "nb", "fa", "pl", "pt", "pt-br", "pt-PT", "otq", "ro", "ru", "sm", "sr-Cyrl", "sr-Latn", "sk", "sl", "es", "sv", "ty", "ta", "te", "th", "to", "tr", "uk", "ur", "vi", "cy", "yua", "ga", "kn", "mi", "ml", "pa"
   */
  suggestedFrom?: TextTranslationSkillLanguage;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.TranslationSkill";
}

/** A skill that extracts content from a file within the enrichment pipeline. */
export interface DocumentExtractionSkill extends SearchIndexerSkillParent {
  /** The parsingMode for the skill. Will be set to 'default' if not defined. */
  parsingMode?: string;
  /** The type of data to be extracted for the skill. Will be set to 'contentAndMetadata' if not defined. */
  dataToExtract?: string;
  /** A dictionary of configurations for the skill. */
  configuration?: Record<string, unknown>;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Util.DocumentExtractionSkill";
}

/**
 * A skill that extracts content and layout information (as markdown), via Azure
 * AI Services, from files within the enrichment pipeline.
 */
export interface DocumentIntelligenceLayoutSkill
  extends SearchIndexerSkillParent {
  /**
   * Controls the cardinality of the output produced by the skill. Default is 'oneToMany'.
   *
   * Possible values: "oneToMany"
   */
  outputMode?: DocumentIntelligenceLayoutSkillOutputMode;
  /**
   * The depth of headers in the markdown output. Default is h6.
   *
   * Possible values: "h1", "h2", "h3", "h4", "h5", "h6"
   */
  markdownHeaderDepth?: DocumentIntelligenceLayoutSkillMarkdownHeaderDepth;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill";
}

/**
 * A skill that can call a Web API endpoint, allowing you to extend a skillset by
 * having it call your custom code.
 */
export interface WebApiSkill extends SearchIndexerSkillParent {
  /** The url for the Web API. */
  uri: string;
  /** The headers required to make the http request. */
  httpHeaders?: Record<string, string>;
  /** The method for the http request. */
  httpMethod?: string;
  /** The desired timeout for the request. Default is 30 seconds. */
  timeout?: string;
  /** The desired batch size which indicates number of documents. */
  batchSize?: number;
  /** If set, the number of parallel calls that can be made to the Web API. */
  degreeOfParallelism?: number;
  /**
   * Applies to custom skills that connect to external code in an Azure function or
   * some other application that provides the transformations. This value should be
   * the application ID created for the function or app when it was registered with
   * Azure Active Directory. When specified, the custom skill connects to the
   * function or app using a managed ID (either system or user-assigned) of the
   * search service and the access token of the function or app, using this value as
   * the resource id for creating the scope of the access token.
   */
  authResourceId?: string;
  /**
   * The user-assigned managed identity used for outbound connections. If an
   * authResourceId is provided and it's not specified, the system-assigned managed
   * identity is used. On updates to the indexer, if the identity is unspecified,
   * the value remains unchanged. If set to "none", the value of this property is
   * cleared.
   */
  authIdentity?: SearchIndexerDataIdentity;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Custom.WebApiSkill";
}

/**
 * The AML skill allows you to extend AI enrichment with a custom Azure Machine
 * Learning (AML) model. Once an AML model is trained and deployed, an AML skill
 * integrates it into AI enrichment.
 */
export interface AzureMachineLearningSkill extends SearchIndexerSkillParent {
  /**
   * (Required for no authentication or key authentication) The scoring URI of the
   * AML service to which the JSON payload will be sent. Only the https URI scheme
   * is allowed.
   */
  uri?: string;
  /** (Required for key authentication) The key for the AML service. */
  key?: string;
  /**
   * (Required for token authentication). The Azure Resource Manager resource ID of
   * the AML service. It should be in the format
   * subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.MachineLearningServices/workspaces/{workspace-name}/services/{service_name}.
   */
  resourceId?: string;
  /**
   * (Optional) When specified, indicates the timeout for the http client making the
   * API call.
   */
  timeout?: string;
  /** (Optional for token authentication). The region the AML service is deployed in. */
  region?: string;
  /**
   * (Optional) When specified, indicates the number of calls the indexer will make
   * in parallel to the endpoint you have provided. You can decrease this value if
   * your endpoint is failing under too high of a request load, or raise it if your
   * endpoint is able to accept more requests and you would like an increase in the
   * performance of the indexer. If not set, a default value of 5 is used. The
   * degreeOfParallelism can be set to a maximum of 10 and a minimum of 1.
   */
  degreeOfParallelism?: number;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Custom.AmlSkill";
}

/**
 * Allows you to generate a vector embedding for a given text input using the
 * Azure OpenAI resource.
 */
export interface AzureOpenAIEmbeddingSkill extends SearchIndexerSkillParent {
  /** The resource URI of the Azure OpenAI resource. */
  resourceUri?: string;
  /** ID of the Azure OpenAI model deployment on the designated resource. */
  deploymentId?: string;
  /** API key of the designated Azure OpenAI resource. */
  apiKey?: string;
  /** The user-assigned managed identity used for outbound connections. */
  authIdentity?: SearchIndexerDataIdentity;
  /**
   * The name of the embedding model that is deployed at the provided deploymentId
   * path.
   *
   * Possible values: "text-embedding-ada-002", "text-embedding-3-large", "text-embedding-3-small"
   */
  modelName?: AzureOpenAIModelName;
  /**
   * The number of dimensions the resulting output embeddings should have. Only
   * supported in text-embedding-3 and later models.
   */
  dimensions?: number;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill";
}

/**
 * Allows you to generate a vector embedding for a given image or text input using
 * the Azure AI Services Vision Vectorize API.
 */
export interface VisionVectorizeSkill extends SearchIndexerSkillParent {
  /**
   * The version of the model to use when calling the AI Services Vision service. It
   * will default to the latest available when not specified.
   */
  modelVersion: string;
  /** A URI fragment specifying the type of skill. */
  "@odata.type": "#Microsoft.Skills.Vision.VectorizeSkill";
}

/** Base type for describing any Azure AI service resource attached to a skillset. */
export interface CognitiveServicesAccountParent {
  /** Description of the Azure AI service resource attached to a skillset. */
  description?: string;
  "@odata.type": string;
}

/**
 * An empty object that represents the default Azure AI service resource for a
 * skillset.
 */
export interface DefaultCognitiveServicesAccount
  extends CognitiveServicesAccountParent {
  /**
   * A URI fragment specifying the type of Azure AI service resource attached to a
   * skillset.
   */
  "@odata.type": "#Microsoft.Azure.Search.DefaultCognitiveServices";
}

/**
 * The multi-region account key of an Azure AI service resource that's attached to
 * a skillset.
 */
export interface CognitiveServicesAccountKey
  extends CognitiveServicesAccountParent {
  /** The key used to provision the Azure AI service resource attached to a skillset. */
  key: string;
  /**
   * A URI fragment specifying the type of Azure AI service resource attached to a
   * skillset.
   */
  "@odata.type": "#Microsoft.Azure.Search.CognitiveServicesByKey";
}

/**
 * The account key of an Azure AI service resource that's attached to a skillset,
 * to be used with the resource's subdomain.
 */
export interface AIServicesAccountKey extends CognitiveServicesAccountParent {
  /** The key used to provision the Azure AI service resource attached to a skillset. */
  key: string;
  /** The subdomain url for the corresponding AI Service. */
  subdomainUrl: string;
  /**
   * A URI fragment specifying the type of Azure AI service resource attached to a
   * skillset.
   */
  "@odata.type": "#Microsoft.Azure.Search.AIServicesByKey";
}

/**
 * The multi-region account of an Azure AI service resource that's attached to a
 * skillset.
 */
export interface AIServicesAccountIdentity
  extends CognitiveServicesAccountParent {
  /**
   * The user-assigned managed identity used for connections to AI Service. If not
   * specified, the system-assigned managed identity is used. On updates to the
   * skillset, if the identity is unspecified, the value remains unchanged. If set
   * to "none", the value of this property is cleared.
   */
  identity?: SearchIndexerDataIdentity;
  /** The subdomain url for the corresponding AI Service. */
  subdomainUrl: string;
  /**
   * A URI fragment specifying the type of Azure AI service resource attached to a
   * skillset.
   */
  "@odata.type": "#Microsoft.Azure.Search.AIServicesByIdentity";
}

/**
 * Definition of additional projections to azure blob, table, or files, of
 * enriched data.
 */
export interface SearchIndexerKnowledgeStore {
  /** The connection string to the storage account projections will be stored in. */
  storageConnectionString: string;
  /** A list of additional projections to perform during indexing. */
  projections: Array<SearchIndexerKnowledgeStoreProjection>;
  /**
   * The user-assigned managed identity used for connections to Azure Storage when
   * writing knowledge store projections. If the connection string indicates an
   * identity (ResourceId) and it's not specified, the system-assigned managed
   * identity is used. On updates to the indexer, if the identity is unspecified,
   * the value remains unchanged. If set to "none", the value of this property is
   * cleared.
   */
  identity?: SearchIndexerDataIdentity;
  /**
   * A dictionary of knowledge store-specific configuration properties. Each name is
   * the name of a specific property. Each value must be of a primitive type.
   */
  parameters?: SearchIndexerKnowledgeStoreParameters;
}

/** Container object for various projection selectors. */
export interface SearchIndexerKnowledgeStoreProjection {
  /** Projections to Azure Table storage. */
  tables?: Array<SearchIndexerKnowledgeStoreTableProjectionSelector>;
  /** Projections to Azure Blob storage. */
  objects?: Array<SearchIndexerKnowledgeStoreObjectProjectionSelector>;
  /** Projections to Azure File storage. */
  files?: Array<SearchIndexerKnowledgeStoreFileProjectionSelector>;
}

/** Description for what data to store in Azure Tables. */
export interface SearchIndexerKnowledgeStoreTableProjectionSelector
  extends SearchIndexerKnowledgeStoreProjectionSelector {
  /** Name of the Azure table to store projected data in. */
  tableName: string;
}

/** Abstract class to share properties between concrete selectors. */
export interface SearchIndexerKnowledgeStoreProjectionSelector {
  /** Name of reference key to different projection. */
  referenceKeyName?: string;
  /** Name of generated key to store projection under. */
  generatedKeyName?: string;
  /** Source data to project. */
  source?: string;
  /** Source context for complex projections. */
  sourceContext?: string;
  /** Nested inputs for complex projections. */
  inputs?: Array<InputFieldMappingEntry>;
}

/** Abstract class to share properties between concrete selectors. */
export interface SearchIndexerKnowledgeStoreBlobProjectionSelector
  extends SearchIndexerKnowledgeStoreProjectionSelector {
  /** Blob container to store projections in. */
  storageContainer: string;
}

/** Projection definition for what data to store in Azure Blob. */
export interface SearchIndexerKnowledgeStoreObjectProjectionSelector
  extends SearchIndexerKnowledgeStoreBlobProjectionSelector {}

/** Projection definition for what data to store in Azure Files. */
export interface SearchIndexerKnowledgeStoreFileProjectionSelector
  extends SearchIndexerKnowledgeStoreBlobProjectionSelector {}

/**
 * A dictionary of knowledge store-specific configuration properties. Each name is
 * the name of a specific property. Each value must be of a primitive type.
 */
export interface SearchIndexerKnowledgeStoreParameters
  extends Record<string, unknown> {
  /**
   * Whether or not projections should synthesize a generated key name if one isn't
   * already present.
   */
  synthesizeGeneratedKeyName?: boolean;
}

/** Definition of additional projections to secondary search indexes. */
export interface SearchIndexerIndexProjection {
  /** A list of projections to be performed to secondary search indexes. */
  selectors: Array<SearchIndexerIndexProjectionSelector>;
  /**
   * A dictionary of index projection-specific configuration properties. Each name
   * is the name of a specific property. Each value must be of a primitive type.
   */
  parameters?: SearchIndexerIndexProjectionsParameters;
}

/** Description for what data to store in the designated search index. */
export interface SearchIndexerIndexProjectionSelector {
  /** Name of the search index to project to. Must have a key field with the 'keyword' analyzer set. */
  targetIndexName: string;
  /**
   * Name of the field in the search index to map the parent document's key value
   * to. Must be a string field that is filterable and not the key field.
   */
  parentKeyFieldName: string;
  /**
   * Source context for the projections. Represents the cardinality at which the
   * document will be split into multiple sub documents.
   */
  sourceContext: string;
  /**
   * Mappings for the projection, or which source should be mapped to which field in
   * the target index.
   */
  mappings: Array<InputFieldMappingEntry>;
}

/**
 * A dictionary of index projection-specific configuration properties. Each name
 * is the name of a specific property. Each value must be of a primitive type.
 */
export interface SearchIndexerIndexProjectionsParameters
  extends Record<string, unknown> {
  /**
   * Defines behavior of the index projections in relation to the rest of the
   * indexer.
   *
   * Possible values: "skipIndexingParentDocuments", "includeIndexingParentDocuments"
   */
  projectionMode?: IndexProjectionMode;
}

/** The type of the skill names. */
export interface SkillNames {
  /** the names of skills to be reset. */
  skillNames?: string[];
}

/** Represents a synonym map definition. */
export interface SynonymMap {
  /** The name of the synonym map. */
  name: string;
  /** The format of the synonym map. Only the 'solr' format is currently supported. */
  format: "solr";
  /**
   * A series of synonym rules in the specified synonym map format. The rules must
   * be separated by newlines.
   */
  synonyms: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key
   * is used to provide an additional level of encryption-at-rest for your data when
   * you want full assurance that no one, not even Microsoft, can decrypt your data.
   * Once you have encrypted your data, it will always remain encrypted. The search
   * service will ignore attempts to set this property to null. You can change this
   * property as needed if you want to rotate your encryption key; Your data will be
   * unaffected. Encryption with customer-managed keys is not available for free
   * search services, and is only available for paid services created on or after
   * January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The ETag of the synonym map. */
  "@odata.etag"?: string;
}

/**
 * Represents a search index definition, which describes the fields and search
 * behavior of an index.
 */
export interface SearchIndex {
  /** The name of the index. */
  name: string;
  /** The fields of the index. */
  fields: Array<SearchField>;
  /** The scoring profiles for the index. */
  scoringProfiles?: Array<ScoringProfile>;
  /**
   * The name of the scoring profile to use if none is specified in the query. If
   * this property is not set and no scoring profile is specified in the query, then
   * default scoring (tf-idf) will be used.
   */
  defaultScoringProfile?: string;
  /** Options to control Cross-Origin Resource Sharing (CORS) for the index. */
  corsOptions?: CorsOptions;
  /** The suggesters for the index. */
  suggesters?: Array<SearchSuggester>;
  /** The analyzers for the index. */
  analyzers?: Array<LexicalAnalyzer>;
  /** The tokenizers for the index. */
  tokenizers?: Array<LexicalTokenizer>;
  /** The token filters for the index. */
  tokenFilters?: Array<TokenFilter>;
  /** The character filters for the index. */
  charFilters?: Array<CharFilter>;
  /** The normalizers for the index. */
  normalizers?: Array<LexicalNormalizer>;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key
   * is used to provide an additional level of encryption-at-rest for your data when
   * you want full assurance that no one, not even Microsoft, can decrypt your data.
   * Once you have encrypted your data, it will always remain encrypted. The search
   * service will ignore attempts to set this property to null. You can change this
   * property as needed if you want to rotate your encryption key; Your data will be
   * unaffected. Encryption with customer-managed keys is not available for free
   * search services, and is only available for paid services created on or after
   * January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The type of similarity algorithm to be used when scoring and ranking the
   * documents matching a search query. The similarity algorithm can only be defined
   * at index creation time and cannot be modified on existing indexes. If null, the
   * ClassicSimilarity algorithm is used.
   */
  similarity?: SimilarityAlgorithm;
  /** Defines parameters for a search index that influence semantic capabilities. */
  semantic?: SemanticSearch;
  /** Contains configuration options related to vector search. */
  vectorSearch?: VectorSearch;
  /** The ETag of the index. */
  "@odata.etag"?: string;
}

/**
 * Represents a field in an index definition, which describes the name, data type,
 * and search behavior of a field.
 */
export interface SearchField {
  /**
   * The name of the field, which must be unique within the fields collection of the
   * index or parent field.
   */
  name: string;
  /**
   * The data type of the field.
   *
   * Possible values: "Edm.String", "Edm.Int32", "Edm.Int64", "Edm.Double", "Edm.Boolean", "Edm.DateTimeOffset", "Edm.GeographyPoint", "Edm.ComplexType", "Edm.Single", "Edm.Half", "Edm.Int16", "Edm.SByte", "Edm.Byte"
   */
  type: SearchFieldDataType;
  /**
   * A value indicating whether the field uniquely identifies documents in the
   * index. Exactly one top-level field in each index must be chosen as the key
   * field and it must be of type Edm.String. Key fields can be used to look up
   * documents directly and update or delete specific documents. Default is false
   * for simple fields and null for complex fields.
   */
  key?: boolean;
  /**
   * A value indicating whether the field can be returned in a search result. You
   * can disable this option if you want to use a field (for example, margin) as a
   * filter, sorting, or scoring mechanism but do not want the field to be visible
   * to the end user. This property must be true for key fields, and it must be null
   * for complex fields. This property can be changed on existing fields. Enabling
   * this property does not cause any increase in index storage requirements.
   * Default is true for simple fields, false for vector fields, and null for
   * complex fields.
   */
  retrievable?: boolean;
  /**
   * An immutable value indicating whether the field will be persisted separately on
   * disk to be returned in a search result. You can disable this option if you
   * don't plan to return the field contents in a search response to save on storage
   * overhead. This can only be set during index creation and only for vector
   * fields. This property cannot be changed for existing fields or set as false for
   * new fields. If this property is set as false, the property 'retrievable' must
   * also be set to false. This property must be true or unset for key fields, for
   * new fields, and for non-vector fields, and it must be null for complex fields.
   * Disabling this property will reduce index storage requirements. The default is
   * true for vector fields.
   */
  stored?: boolean;
  /**
   * A value indicating whether the field is full-text searchable. This means it
   * will undergo analysis such as word-breaking during indexing. If you set a
   * searchable field to a value like "sunny day", internally it will be split into
   * the individual tokens "sunny" and "day". This enables full-text searches for
   * these terms. Fields of type Edm.String or Collection(Edm.String) are searchable
   * by default. This property must be false for simple fields of other non-string
   * data types, and it must be null for complex fields. Note: searchable fields
   * consume extra space in your index to accommodate additional tokenized versions
   * of the field value for full-text searches. If you want to save space in your
   * index and you don't need a field to be included in searches, set searchable to
   * false.
   */
  searchable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $filter
   * queries. filterable differs from searchable in how strings are handled. Fields
   * of type Edm.String or Collection(Edm.String) that are filterable do not undergo
   * word-breaking, so comparisons are for exact matches only. For example, if you
   * set such a field f to "sunny day", $filter=f eq 'sunny' will find no matches,
   * but $filter=f eq 'sunny day' will. This property must be null for complex
   * fields. Default is true for simple fields and null for complex fields.
   */
  filterable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $orderby
   * expressions. By default, the search engine sorts results by score, but in many
   * experiences users will want to sort by fields in the documents. A simple field
   * can be sortable only if it is single-valued (it has a single value in the scope
   * of the parent document). Simple collection fields cannot be sortable, since
   * they are multi-valued. Simple sub-fields of complex collections are also
   * multi-valued, and therefore cannot be sortable. This is true whether it's an
   * immediate parent field, or an ancestor field, that's the complex collection.
   * Complex fields cannot be sortable and the sortable property must be null for
   * such fields. The default for sortable is true for single-valued simple fields,
   * false for multi-valued simple fields, and null for complex fields.
   */
  sortable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in facet
   * queries. Typically used in a presentation of search results that includes hit
   * count by category (for example, search for digital cameras and see hits by
   * brand, by megapixels, by price, and so on). This property must be null for
   * complex fields. Fields of type Edm.GeographyPoint or
   * Collection(Edm.GeographyPoint) cannot be facetable. Default is true for all
   * other simple fields.
   */
  facetable?: boolean;
  /**
   * The name of the analyzer to use for the field. This option can be used only
   * with searchable fields and it can't be set together with either searchAnalyzer
   * or indexAnalyzer. Once the analyzer is chosen, it cannot be changed for the
   * field. Must be null for complex fields.
   *
   * Possible values: "ar.microsoft", "ar.lucene", "hy.lucene", "bn.microsoft", "eu.lucene", "bg.microsoft", "bg.lucene", "ca.microsoft", "ca.lucene", "zh-Hans.microsoft", "zh-Hans.lucene", "zh-Hant.microsoft", "zh-Hant.lucene", "hr.microsoft", "cs.microsoft", "cs.lucene", "da.microsoft", "da.lucene", "nl.microsoft", "nl.lucene", "en.microsoft", "en.lucene", "et.microsoft", "fi.microsoft", "fi.lucene", "fr.microsoft", "fr.lucene", "gl.lucene", "de.microsoft", "de.lucene", "el.microsoft", "el.lucene", "gu.microsoft", "he.microsoft", "hi.microsoft", "hi.lucene", "hu.microsoft", "hu.lucene", "is.microsoft", "id.microsoft", "id.lucene", "ga.lucene", "it.microsoft", "it.lucene", "ja.microsoft", "ja.lucene", "kn.microsoft", "ko.microsoft", "ko.lucene", "lv.microsoft", "lv.lucene", "lt.microsoft", "ml.microsoft", "ms.microsoft", "mr.microsoft", "nb.microsoft", "no.lucene", "fa.lucene", "pl.microsoft", "pl.lucene", "pt-BR.microsoft", "pt-BR.lucene", "pt-PT.microsoft", "pt-PT.lucene", "pa.microsoft", "ro.microsoft", "ro.lucene", "ru.microsoft", "ru.lucene", "sr-cyrillic.microsoft", "sr-latin.microsoft", "sk.microsoft", "sl.microsoft", "es.microsoft", "es.lucene", "sv.microsoft", "sv.lucene", "ta.microsoft", "te.microsoft", "th.microsoft", "th.lucene", "tr.microsoft", "tr.lucene", "uk.microsoft", "ur.microsoft", "vi.microsoft", "standard.lucene", "standardasciifolding.lucene", "keyword", "pattern", "simple", "stop", "whitespace"
   */
  analyzer?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at search time for the field. This option can be
   * used only with searchable fields. It must be set together with indexAnalyzer
   * and it cannot be set together with the analyzer option. This property cannot be
   * set to the name of a language analyzer; use the analyzer property instead if
   * you need a language analyzer. This analyzer can be updated on an existing
   * field. Must be null for complex fields.
   *
   * Possible values: "ar.microsoft", "ar.lucene", "hy.lucene", "bn.microsoft", "eu.lucene", "bg.microsoft", "bg.lucene", "ca.microsoft", "ca.lucene", "zh-Hans.microsoft", "zh-Hans.lucene", "zh-Hant.microsoft", "zh-Hant.lucene", "hr.microsoft", "cs.microsoft", "cs.lucene", "da.microsoft", "da.lucene", "nl.microsoft", "nl.lucene", "en.microsoft", "en.lucene", "et.microsoft", "fi.microsoft", "fi.lucene", "fr.microsoft", "fr.lucene", "gl.lucene", "de.microsoft", "de.lucene", "el.microsoft", "el.lucene", "gu.microsoft", "he.microsoft", "hi.microsoft", "hi.lucene", "hu.microsoft", "hu.lucene", "is.microsoft", "id.microsoft", "id.lucene", "ga.lucene", "it.microsoft", "it.lucene", "ja.microsoft", "ja.lucene", "kn.microsoft", "ko.microsoft", "ko.lucene", "lv.microsoft", "lv.lucene", "lt.microsoft", "ml.microsoft", "ms.microsoft", "mr.microsoft", "nb.microsoft", "no.lucene", "fa.lucene", "pl.microsoft", "pl.lucene", "pt-BR.microsoft", "pt-BR.lucene", "pt-PT.microsoft", "pt-PT.lucene", "pa.microsoft", "ro.microsoft", "ro.lucene", "ru.microsoft", "ru.lucene", "sr-cyrillic.microsoft", "sr-latin.microsoft", "sk.microsoft", "sl.microsoft", "es.microsoft", "es.lucene", "sv.microsoft", "sv.lucene", "ta.microsoft", "te.microsoft", "th.microsoft", "th.lucene", "tr.microsoft", "tr.lucene", "uk.microsoft", "ur.microsoft", "vi.microsoft", "standard.lucene", "standardasciifolding.lucene", "keyword", "pattern", "simple", "stop", "whitespace"
   */
  searchAnalyzer?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at indexing time for the field. This option can
   * be used only with searchable fields. It must be set together with
   * searchAnalyzer and it cannot be set together with the analyzer option.  This
   * property cannot be set to the name of a language analyzer; use the analyzer
   * property instead if you need a language analyzer. Once the analyzer is chosen,
   * it cannot be changed for the field. Must be null for complex fields.
   *
   * Possible values: "ar.microsoft", "ar.lucene", "hy.lucene", "bn.microsoft", "eu.lucene", "bg.microsoft", "bg.lucene", "ca.microsoft", "ca.lucene", "zh-Hans.microsoft", "zh-Hans.lucene", "zh-Hant.microsoft", "zh-Hant.lucene", "hr.microsoft", "cs.microsoft", "cs.lucene", "da.microsoft", "da.lucene", "nl.microsoft", "nl.lucene", "en.microsoft", "en.lucene", "et.microsoft", "fi.microsoft", "fi.lucene", "fr.microsoft", "fr.lucene", "gl.lucene", "de.microsoft", "de.lucene", "el.microsoft", "el.lucene", "gu.microsoft", "he.microsoft", "hi.microsoft", "hi.lucene", "hu.microsoft", "hu.lucene", "is.microsoft", "id.microsoft", "id.lucene", "ga.lucene", "it.microsoft", "it.lucene", "ja.microsoft", "ja.lucene", "kn.microsoft", "ko.microsoft", "ko.lucene", "lv.microsoft", "lv.lucene", "lt.microsoft", "ml.microsoft", "ms.microsoft", "mr.microsoft", "nb.microsoft", "no.lucene", "fa.lucene", "pl.microsoft", "pl.lucene", "pt-BR.microsoft", "pt-BR.lucene", "pt-PT.microsoft", "pt-PT.lucene", "pa.microsoft", "ro.microsoft", "ro.lucene", "ru.microsoft", "ru.lucene", "sr-cyrillic.microsoft", "sr-latin.microsoft", "sk.microsoft", "sl.microsoft", "es.microsoft", "es.lucene", "sv.microsoft", "sv.lucene", "ta.microsoft", "te.microsoft", "th.microsoft", "th.lucene", "tr.microsoft", "tr.lucene", "uk.microsoft", "ur.microsoft", "vi.microsoft", "standard.lucene", "standardasciifolding.lucene", "keyword", "pattern", "simple", "stop", "whitespace"
   */
  indexAnalyzer?: LexicalAnalyzerName;
  /**
   * The name of the normalizer to use for the field. This option can be used only
   * with fields with filterable, sortable, or facetable enabled. Once the
   * normalizer is chosen, it cannot be changed for the field. Must be null for
   * complex fields.
   *
   * Possible values: "asciifolding", "elision", "lowercase", "standard", "uppercase"
   */
  normalizer?: LexicalNormalizerName;
  /** The dimensionality of the vector field. */
  dimensions?: number;
  /**
   * The name of the vector search profile that specifies the algorithm and
   * vectorizer to use when searching the vector field.
   */
  vectorSearchProfile?: string;
  /**
   * The encoding format to interpret the field contents.
   *
   * Possible values: "packedBit"
   */
  vectorEncoding?: VectorEncodingFormat;
  /**
   * A list of the names of synonym maps to associate with this field. This option
   * can be used only with searchable fields. Currently only one synonym map per
   * field is supported. Assigning a synonym map to a field ensures that query terms
   * targeting that field are expanded at query-time using the rules in the synonym
   * map. This attribute can be changed on existing fields. Must be null or an empty
   * collection for complex fields.
   */
  synonymMaps?: string[];
  /**
   * A list of sub-fields if this is a field of type Edm.ComplexType or
   * Collection(Edm.ComplexType). Must be null or empty for simple fields.
   */
  fields?: Array<SearchField>;
}

/** Defines parameters for a search index that influence scoring in search queries. */
export interface ScoringProfile {
  /** The name of the scoring profile. */
  name: string;
  /** Parameters that boost scoring based on text matches in certain index fields. */
  text?: TextWeights;
  /** The collection of functions that influence the scoring of documents. */
  functions?: Array<ScoringFunction>;
  /**
   * A value indicating how the results of individual scoring functions should be
   * combined. Defaults to "Sum". Ignored if there are no scoring functions.
   *
   * Possible values: "sum", "average", "minimum", "maximum", "firstMatching"
   */
  functionAggregation?: ScoringFunctionAggregation;
}

/**
 * Defines weights on index fields for which matches should boost scoring in
 * search queries.
 */
export interface TextWeights {
  /**
   * The dictionary of per-field weights to boost document scoring. The keys are
   * field names and the values are the weights for each field.
   */
  weights: Record<string, number>;
}

/** Base type for functions that can modify document scores during ranking. */
export interface ScoringFunctionParent {
  /** The name of the field used as input to the scoring function. */
  fieldName: string;
  /** A multiplier for the raw score. Must be a positive number not equal to 1.0. */
  boost: number;
  /**
   * A value indicating how boosting will be interpolated across document scores;
   * defaults to "Linear".
   *
   * Possible values: "linear", "constant", "quadratic", "logarithmic"
   */
  interpolation?: ScoringFunctionInterpolation;
  type: string;
}

/**
 * Defines a function that boosts scores based on distance from a geographic
 * location.
 */
export interface DistanceScoringFunction extends ScoringFunctionParent {
  /** Parameter values for the distance scoring function. */
  distance: DistanceScoringParameters;
  /**
   * Indicates the type of function to use. Valid values include magnitude,
   * freshness, distance, and tag. The function type must be lower case.
   */
  type: "distance";
}

/** Provides parameter values to a distance scoring function. */
export interface DistanceScoringParameters {
  /**
   * The name of the parameter passed in search queries to specify the reference
   * location.
   */
  referencePointParameter: string;
  /**
   * The distance in kilometers from the reference location where the boosting range
   * ends.
   */
  boostingDistance: number;
}

/** Defines a function that boosts scores based on the value of a date-time field. */
export interface FreshnessScoringFunction extends ScoringFunctionParent {
  /** Parameter values for the freshness scoring function. */
  freshness: FreshnessScoringParameters;
  /**
   * Indicates the type of function to use. Valid values include magnitude,
   * freshness, distance, and tag. The function type must be lower case.
   */
  type: "freshness";
}

/** Provides parameter values to a freshness scoring function. */
export interface FreshnessScoringParameters {
  /** The expiration period after which boosting will stop for a particular document. */
  boostingDuration: string;
}

/** Defines a function that boosts scores based on the magnitude of a numeric field. */
export interface MagnitudeScoringFunction extends ScoringFunctionParent {
  /** Parameter values for the magnitude scoring function. */
  magnitude: MagnitudeScoringParameters;
  /**
   * Indicates the type of function to use. Valid values include magnitude,
   * freshness, distance, and tag. The function type must be lower case.
   */
  type: "magnitude";
}

/** Provides parameter values to a magnitude scoring function. */
export interface MagnitudeScoringParameters {
  /** The field value at which boosting starts. */
  boostingRangeStart: number;
  /** The field value at which boosting ends. */
  boostingRangeEnd: number;
  /**
   * A value indicating whether to apply a constant boost for field values beyond
   * the range end value; default is false.
   */
  constantBoostBeyondRange?: boolean;
}

/**
 * Defines a function that boosts scores of documents with string values matching
 * a given list of tags.
 */
export interface TagScoringFunction extends ScoringFunctionParent {
  /** Parameter values for the tag scoring function. */
  tag: TagScoringParameters;
  /**
   * Indicates the type of function to use. Valid values include magnitude,
   * freshness, distance, and tag. The function type must be lower case.
   */
  type: "tag";
}

/** Provides parameter values to a tag scoring function. */
export interface TagScoringParameters {
  /**
   * The name of the parameter passed in search queries to specify the list of tags
   * to compare against the target field.
   */
  tagsParameter: string;
}

/** Defines options to control Cross-Origin Resource Sharing (CORS) for an index. */
export interface CorsOptions {
  /**
   * The list of origins from which JavaScript code will be granted access to your
   * index. Can contain a list of hosts of the form
   * {protocol}://{fully-qualified-domain-name}[:{port#}], or a single '*' to allow
   * all origins (not recommended).
   */
  allowedOrigins: string[];
  /**
   * The duration for which browsers should cache CORS preflight responses. Defaults
   * to 5 minutes.
   */
  maxAgeInSeconds?: number;
}

/** Defines how the Suggest API should apply to a group of fields in the index. */
export interface SearchSuggester {
  /** The name of the suggester. */
  name: string;
  /** A value indicating the capabilities of the suggester. */
  searchMode: "analyzingInfixMatching";
  /**
   * The list of field names to which the suggester applies. Each field must be
   * searchable.
   */
  sourceFields: string[];
}

/** Base type for analyzers. */
export interface LexicalAnalyzerParent {
  /**
   * The name of the analyzer. It must only contain letters, digits, spaces, dashes
   * or underscores, can only start and end with alphanumeric characters, and is
   * limited to 128 characters.
   */
  name: string;
  "@odata.type": string;
}

/**
 * Allows you to take control over the process of converting text into
 * indexable/searchable tokens. It's a user-defined configuration consisting of a
 * single predefined tokenizer and one or more filters. The tokenizer is
 * responsible for breaking text into tokens, and the filters for modifying tokens
 * emitted by the tokenizer.
 */
export interface CustomAnalyzer extends LexicalAnalyzerParent {
  /**
   * The name of the tokenizer to use to divide continuous text into a sequence of
   * tokens, such as breaking a sentence into words.
   *
   * Possible values: "classic", "edgeNGram", "keyword_v2", "letter", "lowercase", "microsoft_language_tokenizer", "microsoft_language_stemming_tokenizer", "nGram", "path_hierarchy_v2", "pattern", "standard_v2", "uax_url_email", "whitespace"
   */
  tokenizer: LexicalTokenizerName;
  /**
   * A list of token filters used to filter out or modify the tokens generated by a
   * tokenizer. For example, you can specify a lowercase filter that converts all
   * characters to lowercase. The filters are run in the order in which they are
   * listed.
   */
  tokenFilters?: TokenFilterName[];
  /**
   * A list of character filters used to prepare input text before it is processed
   * by the tokenizer. For instance, they can replace certain characters or symbols.
   * The filters are run in the order in which they are listed.
   */
  charFilters?: CharFilterName[];
  /** A URI fragment specifying the type of analyzer. */
  "@odata.type": "#Microsoft.Azure.Search.CustomAnalyzer";
}

/**
 * Flexibly separates text into terms via a regular expression pattern. This
 * analyzer is implemented using Apache Lucene.
 */
export interface PatternAnalyzer extends LexicalAnalyzerParent {
  /** A value indicating whether terms should be lower-cased. Default is true. */
  lowercase?: boolean;
  /**
   * A regular expression pattern to match token separators. Default is an
   * expression that matches one or more non-word characters.
   */
  pattern?: string;
  /**
   * Regular expression flags.
   *
   * Possible values: "CANON_EQ", "CASE_INSENSITIVE", "COMMENTS", "DOTALL", "LITERAL", "MULTILINE", "UNICODE_CASE", "UNIX_LINES"
   */
  flags?: RegexFlags;
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  "@odata.type": "#Microsoft.Azure.Search.PatternAnalyzer";
}

/**
 * Standard Apache Lucene analyzer; Composed of the standard tokenizer, lowercase
 * filter and stop filter.
 */
export interface LuceneStandardAnalyzer extends LexicalAnalyzerParent {
  /**
   * The maximum token length. Default is 255. Tokens longer than the maximum length
   * are split. The maximum token length that can be used is 300 characters.
   */
  maxTokenLength?: number;
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  "@odata.type": "#Microsoft.Azure.Search.StandardAnalyzer";
}

/**
 * Divides text at non-letters; Applies the lowercase and stopword token filters.
 * This analyzer is implemented using Apache Lucene.
 */
export interface StopAnalyzer extends LexicalAnalyzerParent {
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  "@odata.type": "#Microsoft.Azure.Search.StopAnalyzer";
}

/** Base type for tokenizers. */
export interface LexicalTokenizerParent {
  /**
   * The name of the tokenizer. It must only contain letters, digits, spaces, dashes
   * or underscores, can only start and end with alphanumeric characters, and is
   * limited to 128 characters.
   */
  name: string;
  "@odata.type": string;
}

/**
 * Grammar-based tokenizer that is suitable for processing most European-language
 * documents. This tokenizer is implemented using Apache Lucene.
 */
export interface ClassicTokenizer extends LexicalTokenizerParent {
  /**
   * The maximum token length. Default is 255. Tokens longer than the maximum length
   * are split. The maximum token length that can be used is 300 characters.
   */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.ClassicTokenizer";
}

/**
 * Tokenizes the input from an edge into n-grams of the given size(s). This
 * tokenizer is implemented using Apache Lucene.
 */
export interface EdgeNGramTokenizer extends LexicalTokenizerParent {
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the
   * value of maxGram.
   */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** Character classes to keep in the tokens. */
  tokenChars?: TokenCharacterKind[];
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.EdgeNGramTokenizer";
}

/**
 * Emits the entire input as a single token. This tokenizer is implemented using
 * Apache Lucene.
 */
export interface KeywordTokenizerV2 extends LexicalTokenizerParent {
  /**
   * The maximum token length. Default is 256. Tokens longer than the maximum length
   * are split. The maximum token length that can be used is 300 characters.
   */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.KeywordTokenizerV2";
}

/** Divides text using language-specific rules. */
export interface MicrosoftLanguageTokenizer extends LexicalTokenizerParent {
  /**
   * The maximum token length. Tokens longer than the maximum length are split.
   * Maximum token length that can be used is 300 characters. Tokens longer than 300
   * characters are first split into tokens of length 300 and then each of those
   * tokens is split based on the max token length set. Default is 255.
   */
  maxTokenLength?: number;
  /**
   * A value indicating how the tokenizer is used. Set to true if used as the search
   * tokenizer, set to false if used as the indexing tokenizer. Default is false.
   */
  isSearchTokenizer?: boolean;
  /**
   * The language to use. The default is English.
   *
   * Possible values: "bangla", "bulgarian", "catalan", "chineseSimplified", "chineseTraditional", "croatian", "czech", "danish", "dutch", "english", "french", "german", "greek", "gujarati", "hindi", "icelandic", "indonesian", "italian", "japanese", "kannada", "korean", "malay", "malayalam", "marathi", "norwegianBokmaal", "polish", "portuguese", "portugueseBrazilian", "punjabi", "romanian", "russian", "serbianCyrillic", "serbianLatin", "slovenian", "spanish", "swedish", "tamil", "telugu", "thai", "ukrainian", "urdu", "vietnamese"
   */
  language?: MicrosoftTokenizerLanguage;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer";
}

/**
 * Divides text using language-specific rules and reduces words to their base
 * forms.
 */
export interface MicrosoftLanguageStemmingTokenizer
  extends LexicalTokenizerParent {
  /**
   * The maximum token length. Tokens longer than the maximum length are split.
   * Maximum token length that can be used is 300 characters. Tokens longer than 300
   * characters are first split into tokens of length 300 and then each of those
   * tokens is split based on the max token length set. Default is 255.
   */
  maxTokenLength?: number;
  /**
   * A value indicating how the tokenizer is used. Set to true if used as the search
   * tokenizer, set to false if used as the indexing tokenizer. Default is false.
   */
  isSearchTokenizer?: boolean;
  /**
   * The language to use. The default is English.
   *
   * Possible values: "arabic", "bangla", "bulgarian", "catalan", "croatian", "czech", "danish", "dutch", "english", "estonian", "finnish", "french", "german", "greek", "gujarati", "hebrew", "hindi", "hungarian", "icelandic", "indonesian", "italian", "kannada", "latvian", "lithuanian", "malay", "malayalam", "marathi", "norwegianBokmaal", "polish", "portuguese", "portugueseBrazilian", "punjabi", "romanian", "russian", "serbianCyrillic", "serbianLatin", "slovak", "slovenian", "spanish", "swedish", "tamil", "telugu", "turkish", "ukrainian", "urdu"
   */
  language?: MicrosoftStemmingTokenizerLanguage;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer";
}

/**
 * Tokenizes the input into n-grams of the given size(s). This tokenizer is
 * implemented using Apache Lucene.
 */
export interface NGramTokenizer extends LexicalTokenizerParent {
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the
   * value of maxGram.
   */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** Character classes to keep in the tokens. */
  tokenChars?: TokenCharacterKind[];
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.NGramTokenizer";
}

/**
 * Tokenizer for path-like hierarchies. This tokenizer is implemented using Apache
 * Lucene.
 */
export interface PathHierarchyTokenizerV2 extends LexicalTokenizerParent {
  /** The delimiter character to use. Default is "/". */
  delimiter?: string;
  /** A value that, if set, replaces the delimiter character. Default is "/". */
  replacement?: string;
  /** The maximum token length. Default and maximum is 300. */
  maxTokenLength?: number;
  /**
   * A value indicating whether to generate tokens in reverse order. Default is
   * false.
   */
  reverse?: boolean;
  /** The number of initial tokens to skip. Default is 0. */
  skip?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.PathHierarchyTokenizerV2";
}

/**
 * Tokenizer that uses regex pattern matching to construct distinct tokens. This
 * tokenizer is implemented using Apache Lucene.
 */
export interface PatternTokenizer extends LexicalTokenizerParent {
  /**
   * A regular expression pattern to match token separators. Default is an
   * expression that matches one or more non-word characters.
   */
  pattern?: string;
  /**
   * Regular expression flags.
   *
   * Possible values: "CANON_EQ", "CASE_INSENSITIVE", "COMMENTS", "DOTALL", "LITERAL", "MULTILINE", "UNICODE_CASE", "UNIX_LINES"
   */
  flags?: RegexFlags;
  /**
   * The zero-based ordinal of the matching group in the regular expression pattern
   * to extract into tokens. Use -1 if you want to use the entire pattern to split
   * the input into tokens, irrespective of matching groups. Default is -1.
   */
  group?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.PatternTokenizer";
}

/**
 * Breaks text following the Unicode Text Segmentation rules. This tokenizer is
 * implemented using Apache Lucene.
 */
export interface LuceneStandardTokenizerV2 extends LexicalTokenizerParent {
  /**
   * The maximum token length. Default is 255. Tokens longer than the maximum length
   * are split. The maximum token length that can be used is 300 characters.
   */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.StandardTokenizerV2";
}

/**
 * Tokenizes urls and emails as one token. This tokenizer is implemented using
 * Apache Lucene.
 */
export interface UaxUrlEmailTokenizer extends LexicalTokenizerParent {
  /**
   * The maximum token length. Default is 255. Tokens longer than the maximum length
   * are split. The maximum token length that can be used is 300 characters.
   */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  "@odata.type": "#Microsoft.Azure.Search.UaxUrlEmailTokenizer";
}

/** Base type for token filters. */
export interface TokenFilterParent {
  /**
   * The name of the token filter. It must only contain letters, digits, spaces,
   * dashes or underscores, can only start and end with alphanumeric characters, and
   * is limited to 128 characters.
   */
  name: string;
  "@odata.type": string;
}

/**
 * Converts alphabetic, numeric, and symbolic Unicode characters which are not in
 * the first 127 ASCII characters (the "Basic Latin" Unicode block) into their
 * ASCII equivalents, if such equivalents exist. This token filter is implemented
 * using Apache Lucene.
 */
export interface AsciiFoldingTokenFilter extends TokenFilterParent {
  /** A value indicating whether the original token will be kept. Default is false. */
  preserveOriginal?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.AsciiFoldingTokenFilter";
}

/**
 * Forms bigrams of CJK terms that are generated from the standard tokenizer. This
 * token filter is implemented using Apache Lucene.
 */
export interface CjkBigramTokenFilter extends TokenFilterParent {
  /** The scripts to ignore. */
  ignoreScripts?: CjkBigramTokenFilterScripts[];
  /**
   * A value indicating whether to output both unigrams and bigrams (if true), or
   * just bigrams (if false). Default is false.
   */
  outputUnigrams?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.CjkBigramTokenFilter";
}

/**
 * Construct bigrams for frequently occurring terms while indexing. Single terms
 * are still indexed too, with bigrams overlaid. This token filter is implemented
 * using Apache Lucene.
 */
export interface CommonGramTokenFilter extends TokenFilterParent {
  /** The set of common words. */
  commonWords: string[];
  /**
   * A value indicating whether common words matching will be case insensitive.
   * Default is false.
   */
  ignoreCase?: boolean;
  /**
   * A value that indicates whether the token filter is in query mode. When in query
   * mode, the token filter generates bigrams and then removes common words and
   * single terms followed by a common word. Default is false.
   */
  queryMode?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.CommonGramTokenFilter";
}

/**
 * Decomposes compound words found in many Germanic languages. This token filter
 * is implemented using Apache Lucene.
 */
export interface DictionaryDecompounderTokenFilter extends TokenFilterParent {
  /** The list of words to match against. */
  wordList: string[];
  /**
   * The minimum word size. Only words longer than this get processed. Default is 5.
   * Maximum is 300.
   */
  minWordSize?: number;
  /**
   * The minimum subword size. Only subwords longer than this are outputted. Default
   * is 2. Maximum is 300.
   */
  minSubwordSize?: number;
  /**
   * The maximum subword size. Only subwords shorter than this are outputted.
   * Default is 15. Maximum is 300.
   */
  maxSubwordSize?: number;
  /**
   * A value indicating whether to add only the longest matching subword to the
   * output. Default is false.
   */
  onlyLongestMatch?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter";
}

/**
 * Generates n-grams of the given size(s) starting from the front or the back of
 * an input token. This token filter is implemented using Apache Lucene.
 */
export interface EdgeNGramTokenFilterV2 extends TokenFilterParent {
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the
   * value of maxGram.
   */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /**
   * Specifies which side of the input the n-gram should be generated from. Default
   * is "front".
   *
   * Possible values: "front", "back"
   */
  side?: EdgeNGramTokenFilterSide;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2";
}

/**
 * Removes elisions. For example, "l'avion" (the plane) will be converted to
 * "avion" (plane). This token filter is implemented using Apache Lucene.
 */
export interface ElisionTokenFilter extends TokenFilterParent {
  /** The set of articles to remove. */
  articles?: string[];
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.ElisionTokenFilter";
}

/**
 * A token filter that only keeps tokens with text contained in a specified list
 * of words. This token filter is implemented using Apache Lucene.
 */
export interface KeepTokenFilter extends TokenFilterParent {
  /** The list of words to keep. */
  keepWords: string[];
  /** A value indicating whether to lower case all words first. Default is false. */
  keepWordsCase?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.KeepTokenFilter";
}

/** Marks terms as keywords. This token filter is implemented using Apache Lucene. */
export interface KeywordMarkerTokenFilter extends TokenFilterParent {
  /** A list of words to mark as keywords. */
  keywords: string[];
  /**
   * A value indicating whether to ignore case. If true, all words are converted to
   * lower case first. Default is false.
   */
  ignoreCase?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.KeywordMarkerTokenFilter";
}

/**
 * Removes words that are too long or too short. This token filter is implemented
 * using Apache Lucene.
 */
export interface LengthTokenFilter extends TokenFilterParent {
  /**
   * The minimum length in characters. Default is 0. Maximum is 300. Must be less
   * than the value of max.
   */
  min?: number;
  /** The maximum length in characters. Default and maximum is 300. */
  max?: number;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.LengthTokenFilter";
}

/**
 * Limits the number of tokens while indexing. This token filter is implemented
 * using Apache Lucene.
 */
export interface LimitTokenFilter extends TokenFilterParent {
  /** The maximum number of tokens to produce. Default is 1. */
  maxTokenCount?: number;
  /**
   * A value indicating whether all tokens from the input must be consumed even if
   * maxTokenCount is reached. Default is false.
   */
  consumeAllTokens?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.LimitTokenFilter";
}

/**
 * Generates n-grams of the given size(s). This token filter is implemented using
 * Apache Lucene.
 */
export interface NGramTokenFilterV2 extends TokenFilterParent {
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the
   * value of maxGram.
   */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.NGramTokenFilterV2";
}

/**
 * Uses Java regexes to emit multiple tokens - one for each capture group in one
 * or more patterns. This token filter is implemented using Apache Lucene.
 */
export interface PatternCaptureTokenFilter extends TokenFilterParent {
  /** A list of patterns to match against each token. */
  patterns: string[];
  /**
   * A value indicating whether to return the original token even if one of the
   * patterns matches. Default is true.
   */
  preserveOriginal?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.PatternCaptureTokenFilter";
}

/**
 * A character filter that replaces characters in the input string. It uses a
 * regular expression to identify character sequences to preserve and a
 * replacement pattern to identify characters to replace. For example, given the
 * input text "aa bb aa bb", pattern "(aa)\s+(bb)", and replacement "$1#$2", the
 * result would be "aa#bb aa#bb". This token filter is implemented using Apache
 * Lucene.
 */
export interface PatternReplaceTokenFilter extends TokenFilterParent {
  /** A regular expression pattern. */
  pattern: string;
  /** The replacement text. */
  replacement: string;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.PatternReplaceTokenFilter";
}

/**
 * Create tokens for phonetic matches. This token filter is implemented using
 * Apache Lucene.
 */
export interface PhoneticTokenFilter extends TokenFilterParent {
  /**
   * The phonetic encoder to use. Default is "metaphone".
   *
   * Possible values: "metaphone", "doubleMetaphone", "soundex", "refinedSoundex", "caverphone1", "caverphone2", "cologne", "nysiis", "koelnerPhonetik", "haasePhonetik", "beiderMorse"
   */
  encoder?: PhoneticEncoder;
  /**
   * A value indicating whether encoded tokens should replace original tokens. If
   * false, encoded tokens are added as synonyms. Default is true.
   */
  replace?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.PhoneticTokenFilter";
}

/**
 * Creates combinations of tokens as a single token. This token filter is
 * implemented using Apache Lucene.
 */
export interface ShingleTokenFilter extends TokenFilterParent {
  /** The maximum shingle size. Default and minimum value is 2. */
  maxShingleSize?: number;
  /**
   * The minimum shingle size. Default and minimum value is 2. Must be less than the
   * value of maxShingleSize.
   */
  minShingleSize?: number;
  /**
   * A value indicating whether the output stream will contain the input tokens
   * (unigrams) as well as shingles. Default is true.
   */
  outputUnigrams?: boolean;
  /**
   * A value indicating whether to output unigrams for those times when no shingles
   * are available. This property takes precedence when outputUnigrams is set to
   * false. Default is false.
   */
  outputUnigramsIfNoShingles?: boolean;
  /**
   * The string to use when joining adjacent tokens to form a shingle. Default is a
   * single space (" ").
   */
  tokenSeparator?: string;
  /**
   * The string to insert for each position at which there is no token. Default is
   * an underscore ("_").
   */
  filterToken?: string;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.ShingleTokenFilter";
}

/**
 * A filter that stems words using a Snowball-generated stemmer. This token filter
 * is implemented using Apache Lucene.
 */
export interface SnowballTokenFilter extends TokenFilterParent {
  /**
   * The language to use.
   *
   * Possible values: "armenian", "basque", "catalan", "danish", "dutch", "english", "finnish", "french", "german", "german2", "hungarian", "italian", "kp", "lovins", "norwegian", "porter", "portuguese", "romanian", "russian", "spanish", "swedish", "turkish"
   */
  language: SnowballTokenFilterLanguage;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.SnowballTokenFilter";
}

/**
 * Language specific stemming filter. This token filter is implemented using
 * Apache Lucene.
 */
export interface StemmerTokenFilter extends TokenFilterParent {
  /**
   * The language to use.
   *
   * Possible values: "arabic", "armenian", "basque", "brazilian", "bulgarian", "catalan", "czech", "danish", "dutch", "dutchKp", "english", "lightEnglish", "minimalEnglish", "possessiveEnglish", "porter2", "lovins", "finnish", "lightFinnish", "french", "lightFrench", "minimalFrench", "galician", "minimalGalician", "german", "german2", "lightGerman", "minimalGerman", "greek", "hindi", "hungarian", "lightHungarian", "indonesian", "irish", "italian", "lightItalian", "sorani", "latvian", "norwegian", "lightNorwegian", "minimalNorwegian", "lightNynorsk", "minimalNynorsk", "portuguese", "lightPortuguese", "minimalPortuguese", "portugueseRslp", "romanian", "russian", "lightRussian", "spanish", "lightSpanish", "swedish", "lightSwedish", "turkish"
   */
  language: StemmerTokenFilterLanguage;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.StemmerTokenFilter";
}

/**
 * Provides the ability to override other stemming filters with custom
 * dictionary-based stemming. Any dictionary-stemmed terms will be marked as
 * keywords so that they will not be stemmed with stemmers down the chain. Must be
 * placed before any stemming filters. This token filter is implemented using
 * Apache Lucene.
 */
export interface StemmerOverrideTokenFilter extends TokenFilterParent {
  /**
   * A list of stemming rules in the following format: "word => stem", for example:
   * "ran => run".
   */
  rules: string[];
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.StemmerOverrideTokenFilter";
}

/**
 * Removes stop words from a token stream. This token filter is implemented using
 * Apache Lucene.
 */
export interface StopwordsTokenFilter extends TokenFilterParent {
  /**
   * The list of stopwords. This property and the stopwords list property cannot
   * both be set.
   */
  stopwords?: string[];
  /**
   * A predefined list of stopwords to use. This property and the stopwords property
   * cannot both be set. Default is English.
   *
   * Possible values: "arabic", "armenian", "basque", "brazilian", "bulgarian", "catalan", "czech", "danish", "dutch", "english", "finnish", "french", "galician", "german", "greek", "hindi", "hungarian", "indonesian", "irish", "italian", "latvian", "norwegian", "persian", "portuguese", "romanian", "russian", "sorani", "spanish", "swedish", "thai", "turkish"
   */
  stopwordsList?: StopwordsList;
  /**
   * A value indicating whether to ignore case. If true, all words are converted to
   * lower case first. Default is false.
   */
  ignoreCase?: boolean;
  /**
   * A value indicating whether to ignore the last search term if it's a stop word.
   * Default is true.
   */
  removeTrailing?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.StopwordsTokenFilter";
}

/**
 * Matches single or multi-word synonyms in a token stream. This token filter is
 * implemented using Apache Lucene.
 */
export interface SynonymTokenFilter extends TokenFilterParent {
  /**
   * A list of synonyms in following one of two formats: 1. incredible,
   * unbelievable, fabulous => amazing - all terms on the left side of => symbol
   * will be replaced with all terms on its right side; 2. incredible, unbelievable,
   * fabulous, amazing - comma separated list of equivalent words. Set the expand
   * option to change how this list is interpreted.
   */
  synonyms: string[];
  /** A value indicating whether to case-fold input for matching. Default is false. */
  ignoreCase?: boolean;
  /**
   * A value indicating whether all words in the list of synonyms (if => notation is
   * not used) will map to one another. If true, all words in the list of synonyms
   * (if => notation is not used) will map to one another. The following list:
   * incredible, unbelievable, fabulous, amazing is equivalent to: incredible,
   * unbelievable, fabulous, amazing => incredible, unbelievable, fabulous, amazing.
   * If false, the following list: incredible, unbelievable, fabulous, amazing will
   * be equivalent to: incredible, unbelievable, fabulous, amazing => incredible.
   * Default is true.
   */
  expand?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.SynonymTokenFilter";
}

/**
 * Truncates the terms to a specific length. This token filter is implemented
 * using Apache Lucene.
 */
export interface TruncateTokenFilter extends TokenFilterParent {
  /** The length at which terms will be truncated. Default and maximum is 300. */
  length?: number;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.TruncateTokenFilter";
}

/**
 * Filters out tokens with same text as the previous token. This token filter is
 * implemented using Apache Lucene.
 */
export interface UniqueTokenFilter extends TokenFilterParent {
  /**
   * A value indicating whether to remove duplicates only at the same position.
   * Default is false.
   */
  onlyOnSamePosition?: boolean;
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.UniqueTokenFilter";
}

/**
 * Splits words into subwords and performs optional transformations on subword
 * groups. This token filter is implemented using Apache Lucene.
 */
export interface WordDelimiterTokenFilter extends TokenFilterParent {
  /**
   * A value indicating whether to generate part words. If set, causes parts of
   * words to be generated; for example "AzureSearch" becomes "Azure" "Search".
   * Default is true.
   */
  generateWordParts?: boolean;
  /** A value indicating whether to generate number subwords. Default is true. */
  generateNumberParts?: boolean;
  /**
   * A value indicating whether maximum runs of word parts will be catenated. For
   * example, if this is set to true, "Azure-Search" becomes "AzureSearch". Default
   * is false.
   */
  catenateWords?: boolean;
  /**
   * A value indicating whether maximum runs of number parts will be catenated. For
   * example, if this is set to true, "1-2" becomes "12". Default is false.
   */
  catenateNumbers?: boolean;
  /**
   * A value indicating whether all subword parts will be catenated. For example, if
   * this is set to true, "Azure-Search-1" becomes "AzureSearch1". Default is false.
   */
  catenateAll?: boolean;
  /**
   * A value indicating whether to split words on caseChange. For example, if this
   * is set to true, "AzureSearch" becomes "Azure" "Search". Default is true.
   */
  splitOnCaseChange?: boolean;
  /**
   * A value indicating whether original words will be preserved and added to the
   * subword list. Default is false.
   */
  preserveOriginal?: boolean;
  /**
   * A value indicating whether to split on numbers. For example, if this is set to
   * true, "Azure1Search" becomes "Azure" "1" "Search". Default is true.
   */
  splitOnNumerics?: boolean;
  /**
   * A value indicating whether to remove trailing "'s" for each subword. Default is
   * true.
   */
  stemEnglishPossessive?: boolean;
  /** A list of tokens to protect from being delimited. */
  protectedWords?: string[];
  /** A URI fragment specifying the type of token filter. */
  "@odata.type": "#Microsoft.Azure.Search.WordDelimiterTokenFilter";
}

/** Base type for character filters. */
export interface CharFilterParent {
  /**
   * The name of the char filter. It must only contain letters, digits, spaces,
   * dashes or underscores, can only start and end with alphanumeric characters, and
   * is limited to 128 characters.
   */
  name: string;
  "@odata.type": string;
}

/**
 * A character filter that applies mappings defined with the mappings option.
 * Matching is greedy (longest pattern matching at a given point wins).
 * Replacement is allowed to be the empty string. This character filter is
 * implemented using Apache Lucene.
 */
export interface MappingCharFilter extends CharFilterParent {
  /**
   * A list of mappings of the following format: "a=>b" (all occurrences of the
   * character "a" will be replaced with character "b").
   */
  mappings: string[];
  /** A URI fragment specifying the type of char filter. */
  "@odata.type": "#Microsoft.Azure.Search.MappingCharFilter";
}

/**
 * A character filter that replaces characters in the input string. It uses a
 * regular expression to identify character sequences to preserve and a
 * replacement pattern to identify characters to replace. For example, given the
 * input text "aa bb aa bb", pattern "(aa)\s+(bb)", and replacement "$1#$2", the
 * result would be "aa#bb aa#bb". This character filter is implemented using
 * Apache Lucene.
 */
export interface PatternReplaceCharFilter extends CharFilterParent {
  /** A regular expression pattern. */
  pattern: string;
  /** The replacement text. */
  replacement: string;
  /** A URI fragment specifying the type of char filter. */
  "@odata.type": "#Microsoft.Azure.Search.PatternReplaceCharFilter";
}

/** Base type for normalizers. */
export interface LexicalNormalizerParent {
  /**
   * The name of the char filter. It must only contain letters, digits, spaces,
   * dashes or underscores, can only start and end with alphanumeric characters, and
   * is limited to 128 characters.
   */
  name: string;
  "@odata.type": string;
}

/**
 * Allows you to configure normalization for filterable, sortable, and facetable
 * fields, which by default operate with strict matching. This is a user-defined
 * configuration consisting of at least one or more filters, which modify the
 * token that is stored.
 */
export interface CustomNormalizer extends LexicalNormalizerParent {
  /**
   * A list of token filters used to filter out or modify the input token. For
   * example, you can specify a lowercase filter that converts all characters to
   * lowercase. The filters are run in the order in which they are listed.
   */
  tokenFilters?: TokenFilterName[];
  /**
   * A list of character filters used to prepare input text before it is processed.
   * For instance, they can replace certain characters or symbols. The filters are
   * run in the order in which they are listed.
   */
  charFilters?: CharFilterName[];
  /** A URI fragment specifying the type of normalizer. */
  "@odata.type": "#Microsoft.Azure.Search.CustomNormalizer";
}

/**
 * Base type for similarity algorithms. Similarity algorithms are used to
 * calculate scores that tie queries to documents. The higher the score, the more
 * relevant the document is to that specific query. Those scores are used to rank
 * the search results.
 */
export interface SimilarityAlgorithmParent {
  "@odata.type": string;
}

/**
 * Legacy similarity algorithm which uses the Lucene TFIDFSimilarity
 * implementation of TF-IDF. This variation of TF-IDF introduces static document
 * length normalization as well as coordinating factors that penalize documents
 * that only partially match the searched queries.
 */
export interface ClassicSimilarityAlgorithm extends SimilarityAlgorithmParent {
  /** The discriminator for derived types. */
  "@odata.type": "#Microsoft.Azure.Search.ClassicSimilarity";
}

/**
 * Ranking function based on the Okapi BM25 similarity algorithm. BM25 is a
 * TF-IDF-like algorithm that includes length normalization (controlled by the 'b'
 * parameter) as well as term frequency saturation (controlled by the 'k1'
 * parameter).
 */
export interface BM25SimilarityAlgorithm extends SimilarityAlgorithmParent {
  /**
   * This property controls the scaling function between the term frequency of each
   * matching terms and the final relevance score of a document-query pair. By
   * default, a value of 1.2 is used. A value of 0.0 means the score does not scale
   * with an increase in term frequency.
   */
  k1?: number;
  /**
   * This property controls how the length of a document affects the relevance
   * score. By default, a value of 0.75 is used. A value of 0.0 means no length
   * normalization is applied, while a value of 1.0 means the score is fully
   * normalized by the length of the document.
   */
  b?: number;
  /** The discriminator for derived types. */
  "@odata.type": "#Microsoft.Azure.Search.BM25Similarity";
}

/** Defines parameters for a search index that influence semantic capabilities. */
export interface SemanticSearch {
  /**
   * Allows you to set the name of a default semantic configuration in your index,
   * making it optional to pass it on as a query parameter every time.
   */
  defaultConfiguration?: string;
  /** The semantic configurations for the index. */
  configurations?: Array<SemanticConfiguration>;
}

/**
 * Defines a specific configuration to be used in the context of semantic
 * capabilities.
 */
export interface SemanticConfiguration {
  /** The name of the semantic configuration. */
  name: string;
  /**
   * Describes the title, content, and keyword fields to be used for semantic
   * ranking, captions, highlights, and answers. At least one of the three sub
   * properties (titleField, prioritizedKeywordsFields and prioritizedContentFields)
   * need to be set.
   */
  prioritizedFields: SemanticPrioritizedFields;
  /** Determines how which semantic or query rewrite models to use during model flighting/upgrades. */
  flightingOptIn?: boolean;
}

/**
 * Describes the title, content, and keywords fields to be used for semantic
 * ranking, captions, highlights, and answers.
 */
export interface SemanticPrioritizedFields {
  /**
   * Defines the title field to be used for semantic ranking, captions, highlights,
   * and answers. If you don't have a title field in your index, leave this blank.
   */
  titleField?: SemanticField;
  /**
   * Defines the content fields to be used for semantic ranking, captions,
   * highlights, and answers. For the best result, the selected fields should
   * contain text in natural language form. The order of the fields in the array
   * represents their priority. Fields with lower priority may get truncated if the
   * content is long.
   */
  prioritizedContentFields?: Array<SemanticField>;
  /**
   * Defines the keyword fields to be used for semantic ranking, captions,
   * highlights, and answers. For the best result, the selected fields should
   * contain a list of keywords. The order of the fields in the array represents
   * their priority. Fields with lower priority may get truncated if the content is
   * long.
   */
  prioritizedKeywordsFields?: Array<SemanticField>;
}

/** A field that is used as part of the semantic configuration. */
export interface SemanticField {
  /** File name */
  fieldName: string;
}

/** Contains configuration options related to vector search. */
export interface VectorSearch {
  /** Defines combinations of configurations to use with vector search. */
  profiles?: Array<VectorSearchProfile>;
  /**
   * Contains configuration options specific to the algorithm used during indexing
   * or querying.
   */
  algorithms?: Array<VectorSearchAlgorithmConfiguration>;
  /** Contains configuration options on how to vectorize text vector queries. */
  vectorizers?: Array<VectorSearchVectorizer>;
  /**
   * Contains configuration options specific to the compression method used during
   * indexing or querying.
   */
  compressions?: Array<VectorSearchCompression>;
}

/** Defines a combination of configurations to use with vector search. */
export interface VectorSearchProfile {
  /** The name to associate with this particular vector search profile. */
  name: string;
  /**
   * The name of the vector search algorithm configuration that specifies the
   * algorithm and optional parameters.
   */
  algorithm: string;
  /** The name of the vectorization being configured for use with vector search. */
  vectorizer?: string;
  /**
   * The name of the compression method configuration that specifies the compression
   * method and optional parameters.
   */
  compression?: string;
}

/**
 * Contains configuration options specific to the algorithm used during indexing
 * or querying.
 */
export interface VectorSearchAlgorithmConfigurationParent {
  /** The name to associate with this particular configuration. */
  name: string;
  kind: VectorSearchAlgorithmKind;
}

/**
 * Contains configuration options specific to the HNSW approximate nearest
 * neighbors algorithm used during indexing and querying. The HNSW algorithm
 * offers a tunable trade-off between search speed and accuracy.
 */
export interface HnswAlgorithmConfiguration
  extends VectorSearchAlgorithmConfigurationParent {
  /** Contains the parameters specific to HNSW algorithm. */
  hnswParameters?: HnswParameters;
  /** The name of the kind of algorithm being configured for use with vector search. */
  kind: "hnsw";
}

/** Contains the parameters specific to the HNSW algorithm. */
export interface HnswParameters {
  /**
   * The number of bi-directional links created for every new element during
   * construction. Increasing this parameter value may improve recall and reduce
   * retrieval times for datasets with high intrinsic dimensionality at the expense
   * of increased memory consumption and longer indexing time.
   */
  m?: number;
  /**
   * The size of the dynamic list containing the nearest neighbors, which is used
   * during index time. Increasing this parameter may improve index quality, at the
   * expense of increased indexing time. At a certain point, increasing this
   * parameter leads to diminishing returns.
   */
  efConstruction?: number;
  /**
   * The size of the dynamic list containing the nearest neighbors, which is used
   * during search time. Increasing this parameter may improve search results, at
   * the expense of slower search. At a certain point, increasing this parameter
   * leads to diminishing returns.
   */
  efSearch?: number;
  /**
   * The similarity metric to use for vector comparisons.
   *
   * Possible values: "cosine", "euclidean", "dotProduct", "hamming"
   */
  metric?: VectorSearchAlgorithmMetric;
}

/**
 * Contains configuration options specific to the exhaustive KNN algorithm used
 * during querying, which will perform brute-force search across the entire vector
 * index.
 */
export interface ExhaustiveKnnAlgorithmConfiguration
  extends VectorSearchAlgorithmConfigurationParent {
  /** Contains the parameters specific to exhaustive KNN algorithm. */
  exhaustiveKnnParameters?: ExhaustiveKnnParameters;
  /** The name of the kind of algorithm being configured for use with vector search. */
  kind: "exhaustiveKnn";
}

/** Contains the parameters specific to exhaustive KNN algorithm. */
export interface ExhaustiveKnnParameters {
  /**
   * The similarity metric to use for vector comparisons.
   *
   * Possible values: "cosine", "euclidean", "dotProduct", "hamming"
   */
  metric?: VectorSearchAlgorithmMetric;
}

/** Specifies the vectorization method to be used during query time. */
export interface VectorSearchVectorizerParent {
  /** The name to associate with this particular vectorization method. */
  name: string;
  kind: VectorSearchVectorizerKind;
}

/** Specifies the Azure OpenAI resource used to vectorize a query string. */
export interface AzureOpenAIVectorizer extends VectorSearchVectorizerParent {
  /** Contains the parameters specific to Azure OpenAI embedding vectorization. */
  azureOpenAIParameters?: AzureOpenAIVectorizerParameters;
  /**
   * The name of the kind of vectorization method being configured for use with
   * vector search.
   */
  kind: "azureOpenAI";
}

/** Specifies the parameters for connecting to the Azure OpenAI resource. */
export interface AzureOpenAIVectorizerParameters {
  /** The resource URI of the Azure OpenAI resource. */
  resourceUri?: string;
  /** ID of the Azure OpenAI model deployment on the designated resource. */
  deploymentId?: string;
  /** API key of the designated Azure OpenAI resource. */
  apiKey?: string;
  /** The user-assigned managed identity used for outbound connections. */
  authIdentity?: SearchIndexerDataIdentity;
  /**
   * The name of the embedding model that is deployed at the provided deploymentId
   * path.
   *
   * Possible values: "text-embedding-ada-002", "text-embedding-3-large", "text-embedding-3-small"
   */
  modelName?: AzureOpenAIModelName;
}

/**
 * Specifies a user-defined vectorizer for generating the vector embedding of a
 * query string. Integration of an external vectorizer is achieved using the
 * custom Web API interface of a skillset.
 */
export interface WebApiVectorizer extends VectorSearchVectorizerParent {
  /** Specifies the properties of the user-defined vectorizer. */
  customWebApiParameters?: WebApiVectorizerParameters;
  /**
   * The name of the kind of vectorization method being configured for use with
   * vector search.
   */
  kind: "customWebApi";
}

/** Specifies the properties for connecting to a user-defined vectorizer. */
export interface WebApiVectorizerParameters {
  /** The URI of the Web API providing the vectorizer. */
  uri?: string;
  /** The headers required to make the HTTP request. */
  httpHeaders?: Record<string, string>;
  /** The method for the HTTP request. */
  httpMethod?: string;
  /** The desired timeout for the request. Default is 30 seconds. */
  timeout?: string;
  /**
   * Applies to custom endpoints that connect to external code in an Azure function
   * or some other application that provides the transformations. This value should
   * be the application ID created for the function or app when it was registered
   * with Azure Active Directory. When specified, the vectorization connects to the
   * function or app using a managed ID (either system or user-assigned) of the
   * search service and the access token of the function or app, using this value as
   * the resource id for creating the scope of the access token.
   */
  authResourceId?: string;
  /**
   * The user-assigned managed identity used for outbound connections. If an
   * authResourceId is provided and it's not specified, the system-assigned managed
   * identity is used. On updates to the indexer, if the identity is unspecified,
   * the value remains unchanged. If set to "none", the value of this property is
   * cleared.
   */
  authIdentity?: SearchIndexerDataIdentity;
}

/** Clears the identity property of a datasource. */
export interface AIServicesVisionVectorizer
  extends VectorSearchVectorizerParent {
  /** Contains the parameters specific to AI Services Vision embedding vectorization. */
  AIServicesVisionParameters?: AIServicesVisionParameters;
  /**
   * The name of the kind of vectorization method being configured for use with
   * vector search.
   */
  kind: "aiServicesVision";
}

/**
 * Specifies the AI Services Vision parameters for vectorizing a query image or
 * text.
 */
export interface AIServicesVisionParameters {
  /**
   * The version of the model to use when calling the AI Services Vision service. It
   * will default to the latest available when not specified.
   */
  modelVersion: string;
  /** The resource URI of the AI Services resource. */
  resourceUri: string;
  /** API key of the designated AI Services resource. */
  apiKey?: string;
  /**
   * The user-assigned managed identity used for outbound connections. If an
   * authResourceId is provided and it's not specified, the system-assigned managed
   * identity is used. On updates to the index, if the identity is unspecified, the
   * value remains unchanged. If set to "none", the value of this property is
   * cleared.
   */
  authIdentity?: SearchIndexerDataIdentity;
}

/**
 * Specifies an Azure Machine Learning endpoint deployed via the Azure AI Foundry
 * Model Catalog for generating the vector embedding of a query string.
 */
export interface AMLVectorizer extends VectorSearchVectorizerParent {
  /** Specifies the properties of the AML vectorizer. */
  amlParameters?: AMLParameters;
  /**
   * The name of the kind of vectorization method being configured for use with
   * vector search.
   */
  kind: "aml";
}

/** Specifies the properties for connecting to an AML vectorizer. */
export interface AMLParameters {
  /**
   * (Required for no authentication or key authentication) The scoring URI of the
   * AML service to which the JSON payload will be sent. Only the https URI scheme
   * is allowed.
   */
  uri: string;
  /** (Required for key authentication) The key for the AML service. */
  key?: string;
  /**
   * (Required for token authentication). The Azure Resource Manager resource ID of
   * the AML service. It should be in the format
   * subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.MachineLearningServices/workspaces/{workspace-name}/services/{service_name}.
   */
  resourceId?: string;
  /**
   * (Optional) When specified, indicates the timeout for the http client making the
   * API call.
   */
  timeout?: string;
  /** (Optional for token authentication). The region the AML service is deployed in. */
  region?: string;
  /**
   * The name of the embedding model from the Azure AI Foundry Catalog that is
   * deployed at the provided endpoint.
   *
   * Possible values: "OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32", "OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336", "Facebook-DinoV2-Image-Embeddings-ViT-Base", "Facebook-DinoV2-Image-Embeddings-ViT-Giant", "Cohere-embed-v3-english", "Cohere-embed-v3-multilingual"
   */
  modelName?: AIFoundryModelCatalogName;
}

/**
 * Contains configuration options specific to the compression method used during
 * indexing or querying.
 */
export interface VectorSearchCompressionParent {
  /** The name to associate with this particular configuration. */
  name: string;
  /**
   * If set to true, once the ordered set of results calculated using compressed
   * vectors are obtained, they will be reranked again by recalculating the
   * full-precision similarity scores. This will improve recall at the expense of
   * latency.
   */
  rerankWithOriginalVectors?: boolean;
  /**
   * Default oversampling factor. Oversampling will internally request more
   * documents (specified by this multiplier) in the initial search. This increases
   * the set of results that will be reranked using recomputed similarity scores
   * from full-precision vectors. Minimum value is 1, meaning no oversampling (1x).
   * This parameter can only be set when rerankWithOriginalVectors is true. Higher
   * values improve recall at the expense of latency.
   */
  defaultOversampling?: number;
  /** Contains the options for rescoring. */
  rescoringOptions?: RescoringOptions;
  /**
   * The number of dimensions to truncate the vectors to. Truncating the vectors
   * reduces the size of the vectors and the amount of data that needs to be
   * transferred during search. This can save storage cost and improve search
   * performance at the expense of recall. It should be only used for embeddings
   * trained with Matryoshka Representation Learning (MRL) such as OpenAI
   * text-embedding-3-large (small). The default value is null, which means no
   * truncation.
   */
  truncationDimension?: number;
  kind: VectorSearchCompressionKind;
}

/** Contains the options for rescoring. */
export interface RescoringOptions {
  /**
   * If set to true, after the initial search on the compressed vectors, the
   * similarity scores are recalculated using the full-precision vectors. This will
   * improve recall at the expense of latency.
   */
  enableRescoring?: boolean;
  /**
   * Default oversampling factor. Oversampling retrieves a greater set of potential
   * documents to offset the resolution loss due to quantization. This increases the
   * set of results that will be rescored on full-precision vectors. Minimum value
   * is 1, meaning no oversampling (1x). This parameter can only be set when 'enableRescoring'
   * is true. Higher values improve recall at the expense of latency.
   */
  defaultOversampling?: number;
  /**
   * Controls the storage method for original vectors. This setting is immutable.
   *
   * Possible values: "preserveOriginals", "discardOriginals"
   */
  rescoreStorageMethod?: VectorSearchCompressionRescoreStorageMethod;
}

/**
 * Contains configuration options specific to the scalar quantization compression
 * method used during indexing and querying.
 */
export interface ScalarQuantizationCompression
  extends VectorSearchCompressionParent {
  /** Contains the parameters specific to Scalar Quantization. */
  scalarQuantizationParameters?: ScalarQuantizationParameters;
  /**
   * The name of the kind of compression method being configured for use with vector
   * search.
   */
  kind: "scalarQuantization";
}

/** Contains the parameters specific to Scalar Quantization. */
export interface ScalarQuantizationParameters {
  /**
   * The quantized data type of compressed vector values.
   *
   * Possible values: "int8"
   */
  quantizedDataType?: VectorSearchCompressionTarget;
}

/**
 * Contains configuration options specific to the binary quantization compression
 * method used during indexing and querying.
 */
export interface BinaryQuantizationCompression
  extends VectorSearchCompressionParent {
  /**
   * The name of the kind of compression method being configured for use with vector
   * search.
   */
  kind: "binaryQuantization";
}

/** Specifies some text and analysis components used to break that text into tokens. */
export interface AnalyzeRequest {
  /** The text to break into tokens. */
  text: string;
  /**
   * The name of the analyzer to use to break the given text. If this parameter is
   * not specified, you must specify a tokenizer instead. The tokenizer and analyzer
   * parameters are mutually exclusive.
   *
   * Possible values: "ar.microsoft", "ar.lucene", "hy.lucene", "bn.microsoft", "eu.lucene", "bg.microsoft", "bg.lucene", "ca.microsoft", "ca.lucene", "zh-Hans.microsoft", "zh-Hans.lucene", "zh-Hant.microsoft", "zh-Hant.lucene", "hr.microsoft", "cs.microsoft", "cs.lucene", "da.microsoft", "da.lucene", "nl.microsoft", "nl.lucene", "en.microsoft", "en.lucene", "et.microsoft", "fi.microsoft", "fi.lucene", "fr.microsoft", "fr.lucene", "gl.lucene", "de.microsoft", "de.lucene", "el.microsoft", "el.lucene", "gu.microsoft", "he.microsoft", "hi.microsoft", "hi.lucene", "hu.microsoft", "hu.lucene", "is.microsoft", "id.microsoft", "id.lucene", "ga.lucene", "it.microsoft", "it.lucene", "ja.microsoft", "ja.lucene", "kn.microsoft", "ko.microsoft", "ko.lucene", "lv.microsoft", "lv.lucene", "lt.microsoft", "ml.microsoft", "ms.microsoft", "mr.microsoft", "nb.microsoft", "no.lucene", "fa.lucene", "pl.microsoft", "pl.lucene", "pt-BR.microsoft", "pt-BR.lucene", "pt-PT.microsoft", "pt-PT.lucene", "pa.microsoft", "ro.microsoft", "ro.lucene", "ru.microsoft", "ru.lucene", "sr-cyrillic.microsoft", "sr-latin.microsoft", "sk.microsoft", "sl.microsoft", "es.microsoft", "es.lucene", "sv.microsoft", "sv.lucene", "ta.microsoft", "te.microsoft", "th.microsoft", "th.lucene", "tr.microsoft", "tr.lucene", "uk.microsoft", "ur.microsoft", "vi.microsoft", "standard.lucene", "standardasciifolding.lucene", "keyword", "pattern", "simple", "stop", "whitespace"
   */
  analyzer?: LexicalAnalyzerName;
  /**
   * The name of the tokenizer to use to break the given text. If this parameter is
   * not specified, you must specify an analyzer instead. The tokenizer and analyzer
   * parameters are mutually exclusive.
   *
   * Possible values: "classic", "edgeNGram", "keyword_v2", "letter", "lowercase", "microsoft_language_tokenizer", "microsoft_language_stemming_tokenizer", "nGram", "path_hierarchy_v2", "pattern", "standard_v2", "uax_url_email", "whitespace"
   */
  tokenizer?: LexicalTokenizerName;
  /**
   * The name of the normalizer to use to normalize the given text.
   *
   * Possible values: "asciifolding", "elision", "lowercase", "standard", "uppercase"
   */
  normalizer?: LexicalNormalizerName;
  /**
   * An optional list of token filters to use when breaking the given text. This
   * parameter can only be set when using the tokenizer parameter.
   */
  tokenFilters?: TokenFilterName[];
  /**
   * An optional list of character filters to use when breaking the given text. This
   * parameter can only be set when using the tokenizer parameter.
   */
  charFilters?: CharFilterName[];
}

/**
 * Represents an index alias, which describes a mapping from the alias name to an
 * index. The alias name can be used in place of the index name for supported
 * operations.
 */
export interface SearchAlias {
  /** The name of the alias. */
  name: string;
  /** The name of the index this alias maps to. Only one index name may be specified. */
  indexes: string[];
  /** The ETag of the alias. */
  "@odata.etag"?: string;
}

/** The query parameters for vector and hybrid search queries. */
export type VectorQuery =
  | VectorQueryParent
  | VectorizedQuery
  | VectorizableTextQuery
  | VectorizableImageUrlQuery
  | VectorizableImageBinaryQuery;
/** The threshold used for vector queries. */
export type VectorThreshold =
  | VectorThresholdParent
  | VectorSimilarityThreshold
  | SearchScoreThreshold;
/** Abstract base type for data identities. */
export type SearchIndexerDataIdentity =
  | SearchIndexerDataIdentityParent
  | SearchIndexerDataNoneIdentity
  | SearchIndexerDataUserAssignedIdentity;
/** Base type for data change detection policies. */
export type DataChangeDetectionPolicy =
  | DataChangeDetectionPolicyParent
  | HighWaterMarkChangeDetectionPolicy
  | SqlIntegratedChangeTrackingPolicy;
/** Base type for data deletion detection policies. */
export type DataDeletionDetectionPolicy =
  | DataDeletionDetectionPolicyParent
  | SoftDeleteColumnDeletionDetectionPolicy
  | NativeBlobSoftDeleteDeletionDetectionPolicy;
/** Base type for skills. */
export type SearchIndexerSkill =
  | SearchIndexerSkillParent
  | ConditionalSkill
  | KeyPhraseExtractionSkill
  | OcrSkill
  | ImageAnalysisSkill
  | LanguageDetectionSkill
  | ShaperSkill
  | MergeSkill
  | EntityRecognitionSkill
  | SentimentSkill
  | SentimentSkillV3
  | EntityLinkingSkill
  | EntityRecognitionSkillV3
  | PIIDetectionSkill
  | SplitSkill
  | CustomEntityLookupSkill
  | TextTranslationSkill
  | DocumentExtractionSkill
  | DocumentIntelligenceLayoutSkill
  | WebApiSkill
  | AzureMachineLearningSkill
  | AzureOpenAIEmbeddingSkill
  | VisionVectorizeSkill;
/** Base type for describing any Azure AI service resource attached to a skillset. */
export type CognitiveServicesAccount =
  | CognitiveServicesAccountParent
  | DefaultCognitiveServicesAccount
  | CognitiveServicesAccountKey
  | AIServicesAccountKey
  | AIServicesAccountIdentity;
/** Base type for functions that can modify document scores during ranking. */
export type ScoringFunction =
  | ScoringFunctionParent
  | DistanceScoringFunction
  | FreshnessScoringFunction
  | MagnitudeScoringFunction
  | TagScoringFunction;
/** Base type for analyzers. */
export type LexicalAnalyzer =
  | LexicalAnalyzerParent
  | CustomAnalyzer
  | PatternAnalyzer
  | LuceneStandardAnalyzer
  | StopAnalyzer;
/** Base type for tokenizers. */
export type LexicalTokenizer =
  | LexicalTokenizerParent
  | ClassicTokenizer
  | EdgeNGramTokenizer
  | KeywordTokenizerV2
  | MicrosoftLanguageTokenizer
  | MicrosoftLanguageStemmingTokenizer
  | NGramTokenizer
  | PathHierarchyTokenizerV2
  | PatternTokenizer
  | LuceneStandardTokenizerV2
  | UaxUrlEmailTokenizer;
/** Base type for token filters. */
export type TokenFilter =
  | TokenFilterParent
  | AsciiFoldingTokenFilter
  | CjkBigramTokenFilter
  | CommonGramTokenFilter
  | DictionaryDecompounderTokenFilter
  | EdgeNGramTokenFilterV2
  | ElisionTokenFilter
  | KeepTokenFilter
  | KeywordMarkerTokenFilter
  | LengthTokenFilter
  | LimitTokenFilter
  | NGramTokenFilterV2
  | PatternCaptureTokenFilter
  | PatternReplaceTokenFilter
  | PhoneticTokenFilter
  | ShingleTokenFilter
  | SnowballTokenFilter
  | StemmerTokenFilter
  | StemmerOverrideTokenFilter
  | StopwordsTokenFilter
  | SynonymTokenFilter
  | TruncateTokenFilter
  | UniqueTokenFilter
  | WordDelimiterTokenFilter;
/** Base type for character filters. */
export type CharFilter =
  | CharFilterParent
  | MappingCharFilter
  | PatternReplaceCharFilter;
/** Base type for normalizers. */
export type LexicalNormalizer = LexicalNormalizerParent | CustomNormalizer;
/**
 * Base type for similarity algorithms. Similarity algorithms are used to
 * calculate scores that tie queries to documents. The higher the score, the more
 * relevant the document is to that specific query. Those scores are used to rank
 * the search results.
 */
export type SimilarityAlgorithm =
  | SimilarityAlgorithmParent
  | ClassicSimilarityAlgorithm
  | BM25SimilarityAlgorithm;
/**
 * Contains configuration options specific to the algorithm used during indexing
 * or querying.
 */
export type VectorSearchAlgorithmConfiguration =
  | VectorSearchAlgorithmConfigurationParent
  | HnswAlgorithmConfiguration
  | ExhaustiveKnnAlgorithmConfiguration;
/** Specifies the vectorization method to be used during query time. */
export type VectorSearchVectorizer =
  | VectorSearchVectorizerParent
  | AzureOpenAIVectorizer
  | WebApiVectorizer
  | AIServicesVisionVectorizer
  | AMLVectorizer;
/**
 * Contains configuration options specific to the compression method used during
 * indexing or querying.
 */
export type VectorSearchCompression =
  | VectorSearchCompressionParent
  | ScalarQuantizationCompression
  | BinaryQuantizationCompression;
/** Alias for QueryType */
export type QueryType = string;
/** Alias for SearchMode */
export type SearchMode = string;
/** Alias for ScoringStatistics */
export type ScoringStatistics = string;
/** Alias for SemanticErrorMode */
export type SemanticErrorMode = string;
/** Alias for QueryAnswerType */
export type QueryAnswerType = string;
/** Alias for QueryCaptionType */
export type QueryCaptionType = string;
/** Alias for QueryRewritesType */
export type QueryRewritesType = string;
/** Alias for QueryDebugMode */
export type QueryDebugMode = string;
/** Alias for QueryLanguage */
export type QueryLanguage = string;
/** Alias for QuerySpellerType */
export type QuerySpellerType = string;
/** Alias for VectorThresholdKind */
export type VectorThresholdKind = string;
/** Alias for VectorQueryKind */
export type VectorQueryKind = string;
/** Alias for VectorFilterMode */
export type VectorFilterMode = string;
/** Alias for HybridCountAndFacetMode */
export type HybridCountAndFacetMode = string;
/** Alias for IndexActionType */
export type IndexActionType = string;
/** Alias for AutocompleteMode */
export type AutocompleteMode = string;
/** Alias for SearchIndexerDataSourceType */
export type SearchIndexerDataSourceType = string;
/** Alias for BlobIndexerParsingMode */
export type BlobIndexerParsingMode = string;
/** Alias for MarkdownParsingSubmode */
export type MarkdownParsingSubmode = string;
/** Alias for MarkdownHeaderDepth */
export type MarkdownHeaderDepth = string;
/** Alias for BlobIndexerDataToExtract */
export type BlobIndexerDataToExtract = string;
/** Alias for BlobIndexerImageAction */
export type BlobIndexerImageAction = string;
/** Alias for BlobIndexerPDFTextRotationAlgorithm */
export type BlobIndexerPDFTextRotationAlgorithm = string;
/** Alias for IndexerExecutionEnvironment */
export type IndexerExecutionEnvironment = string;
/** Alias for KeyPhraseExtractionSkillLanguage */
export type KeyPhraseExtractionSkillLanguage = string;
/** Alias for OcrSkillLanguage */
export type OcrSkillLanguage = string;
/** Alias for OcrLineEnding */
export type OcrLineEnding = string;
/** Alias for ImageAnalysisSkillLanguage */
export type ImageAnalysisSkillLanguage = string;
/** Alias for VisualFeature */
export type VisualFeature = string;
/** Alias for ImageDetail */
export type ImageDetail = string;
/** Alias for EntityCategory */
export type EntityCategory = string;
/** Alias for EntityRecognitionSkillLanguage */
export type EntityRecognitionSkillLanguage = string;
/** Alias for SentimentSkillLanguage */
export type SentimentSkillLanguage = string;
/** Alias for PIIDetectionSkillMaskingMode */
export type PIIDetectionSkillMaskingMode = string;
/** Alias for SplitSkillLanguage */
export type SplitSkillLanguage = string;
/** Alias for TextSplitMode */
export type TextSplitMode = string;
/** Alias for SplitSkillUnit */
export type SplitSkillUnit = string;
/** Alias for SplitSkillEncoderModelName */
export type SplitSkillEncoderModelName = string;
/** Alias for CustomEntityLookupSkillLanguage */
export type CustomEntityLookupSkillLanguage = string;
/** Alias for TextTranslationSkillLanguage */
export type TextTranslationSkillLanguage = string;
/** Alias for DocumentIntelligenceLayoutSkillOutputMode */
export type DocumentIntelligenceLayoutSkillOutputMode = string;
/** Alias for DocumentIntelligenceLayoutSkillMarkdownHeaderDepth */
export type DocumentIntelligenceLayoutSkillMarkdownHeaderDepth = string;
/** Alias for AzureOpenAIModelName */
export type AzureOpenAIModelName = string;
/** Alias for IndexProjectionMode */
export type IndexProjectionMode = string;
/** Alias for SearchFieldDataType */
export type SearchFieldDataType = string;
/** Alias for LexicalAnalyzerName */
export type LexicalAnalyzerName = string;
/** Alias for LexicalNormalizerName */
export type LexicalNormalizerName = string;
/** Alias for VectorEncodingFormat */
export type VectorEncodingFormat = string;
/** Alias for ScoringFunctionInterpolation */
export type ScoringFunctionInterpolation = string;
/** Alias for ScoringFunctionAggregation */
export type ScoringFunctionAggregation = string;
/** Alias for LexicalTokenizerName */
export type LexicalTokenizerName = string;
/** Alias for TokenFilterName */
export type TokenFilterName = string;
/** Alias for CharFilterName */
export type CharFilterName = string;
/** Alias for RegexFlags */
export type RegexFlags = string;
/** Alias for TokenCharacterKind */
export type TokenCharacterKind = string;
/** Alias for MicrosoftTokenizerLanguage */
export type MicrosoftTokenizerLanguage = string;
/** Alias for MicrosoftStemmingTokenizerLanguage */
export type MicrosoftStemmingTokenizerLanguage = string;
/** Alias for CjkBigramTokenFilterScripts */
export type CjkBigramTokenFilterScripts = string;
/** Alias for EdgeNGramTokenFilterSide */
export type EdgeNGramTokenFilterSide = string;
/** Alias for PhoneticEncoder */
export type PhoneticEncoder = string;
/** Alias for SnowballTokenFilterLanguage */
export type SnowballTokenFilterLanguage = string;
/** Alias for StemmerTokenFilterLanguage */
export type StemmerTokenFilterLanguage = string;
/** Alias for StopwordsList */
export type StopwordsList = string;
/** Alias for VectorSearchAlgorithmKind */
export type VectorSearchAlgorithmKind = string;
/** Alias for VectorSearchAlgorithmMetric */
export type VectorSearchAlgorithmMetric = string;
/** Alias for VectorSearchVectorizerKind */
export type VectorSearchVectorizerKind = string;
/** Alias for AIFoundryModelCatalogName */
export type AIFoundryModelCatalogName = string;
/** Alias for VectorSearchCompressionRescoreStorageMethod */
export type VectorSearchCompressionRescoreStorageMethod = string;
/** Alias for VectorSearchCompressionKind */
export type VectorSearchCompressionKind = string;
/** Alias for VectorSearchCompressionTarget */
export type VectorSearchCompressionTarget = string;
