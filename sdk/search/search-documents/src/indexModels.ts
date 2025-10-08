// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  AutocompleteMode,
  DebugInfo,
  FacetResult,
  HybridSearch,
  IndexActionType,
  KnownSemanticErrorMode,
  KnownSemanticErrorReason,
  KnownSemanticSearchResultsType,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
  QueryAnswerResult,
  QueryCaptionResult,
  QueryDebugMode,
  QueryLanguage,
  QueryResultDocumentInnerHit,
  QueryResultDocumentRerankerInput,
  QuerySpellerType as QuerySpeller,
  QueryType,
  ScoringStatistics,
  SearchMode,
  SemanticFieldState,
  SemanticQueryRewritesResultType,
  VectorsDebugInfo,
} from "./generated/data/models/index.js";
import type GeographyPoint from "./geographyPoint.js";

/**
 * Options for performing the count operation on the index.
 */
export type CountDocumentsOptions = OperationOptions;

/**
 * Options for SearchIndexingBufferedSender.
 */
export interface SearchIndexingBufferedSenderOptions {
  /**
   * Indicates if autoFlush is enabled.
   */
  autoFlush?: boolean;
  /**
   * Initial Batch Action Count.
   *
   * A batch request will be sent once the documents
   * reach the initialBatchActionCount.
   */
  initialBatchActionCount?: number;
  /**
   * Flush Window.
   *
   * A batch request will be sent after flushWindowInMs is
   * reached.
   */
  flushWindowInMs?: number;
  /**
   * Maximum number of Retries
   */
  maxRetriesPerAction?: number;
  /**
   * Delay between retries
   */
  throttlingDelayInMs?: number;
  /**
   * Max Delay between retries
   */
  maxThrottlingDelayInMs?: number;
}

/**
 * Options for SearchIndexingBufferedSenderUploadDocuments.
 */
export type SearchIndexingBufferedSenderUploadDocumentsOptions = OperationOptions;
/**
 * Options for SearchIndexingBufferedSenderMergeDocuments.
 */
export type SearchIndexingBufferedSenderMergeDocumentsOptions = OperationOptions;
/**
 * Options for SearchIndexingBufferedSenderMergeOrUploadDocuments.
 */
export type SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions = OperationOptions;
/**
 * Options for SearchIndexingBufferedSenderDeleteDocuments.
 */
export type SearchIndexingBufferedSenderDeleteDocumentsOptions = OperationOptions;
/**
 * Options for SearchIndexingBufferedSenderFlushDocuments.
 */
export type SearchIndexingBufferedSenderFlushDocumentsOptions = OperationOptions;

/**
 * Options for retrieving a single document.
 */
export interface GetDocumentOptions<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> extends OperationOptions {
  /**
   * List of field names to retrieve for the document; Any field not retrieved will be missing from
   * the returned document.
   */
  selectedFields?: SelectArray<TFields>;
  /**
   * Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents.
   */
  xMsQuerySourceAuthorization?: string;
}

/**
 * Options for the modify index batch operation.
 */
export interface IndexDocumentsOptions extends OperationOptions {
  /**
   * If true, will cause this operation to throw if any document operation
   * in the batch did not succeed.
   */
  throwOnAnyFailure?: boolean;
}

/**
 * Options for the upload documents operation.
 */
export type UploadDocumentsOptions = IndexDocumentsOptions;

/**
 * Options for the merge documents operation.
 */
export type MergeDocumentsOptions = IndexDocumentsOptions;

/**
 * Options for the merge or upload documents operation.
 */
export type MergeOrUploadDocumentsOptions = IndexDocumentsOptions;

/**
 * Options for the delete documents operation.
 */
export type DeleteDocumentsOptions = IndexDocumentsOptions;

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListSearchResultsPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

// BEGIN manually modified generated interfaces
//
// This section is for places where we have to manually fix issues
// with interfaces from the generated code.
// Mostly this is to allow modeling additionalProperties:true as generics.

/**
 * Options for retrieving completion text for a partial searchText.
 */
export type AutocompleteOptions<TModel extends object> = OperationOptions &
  AutocompleteRequest<TModel>;
/**
 * Options for committing a full search request.
 */
export type SearchOptions<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = OperationOptions & SearchRequestOptions<TModel, TFields>;
/**
 * Options for retrieving suggestions based on the searchText.
 */
export type SuggestOptions<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = OperationOptions & SuggestRequest<TModel, TFields>;

/**
 * An iterator for search results of a paticular query. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type SearchIterator<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = PagedAsyncIterableIterator<
  SearchResult<TModel, TFields>,
  SearchDocumentsPageResult<TModel, TFields>,
  ListSearchResultsPageSettings
>;

/**
 * The query parameters for vector and hybrid search queries.
 */
export type VectorQuery<TModel extends object> =
  | VectorizedQuery<TModel>
  | VectorizableTextQuery<TModel>
  | VectorizableImageUrlQuery<TModel>
  | VectorizableImageBinaryQuery<TModel>;

/**
 * The query parameters for vector and hybrid search queries.
 */
export interface BaseVectorQuery<TModel extends object> {
  /**
   * ### Known values supported by the service
   * **vector**: Vector query where a raw vector value is provided.
   * **text**: Vector query where a text value that needs to be vectorized is provided.
   * **imageUrl**: Vector query where an url that represents an image value that needs to be vectorized is provided.
   * **imageBinary**: Vector query where a base 64 encoded binary of an image that needs to be vectorized is provided.
   */
  kind: VectorQueryKind;
  /**
   * Number of nearest neighbors to return as top hits.
   */
  kNearestNeighborsCount?: number;
  /**
   * Vector Fields of type Collection(Edm.Single) to be included in the vector searched.
   */
  fields?: SearchFieldArray<TModel>;
  /**
   * When true, triggers an exhaustive k-nearest neighbor search across all vectors within the
   * vector index. Useful for scenarios where exact matches are critical, such as determining ground
   * truth values.
   */
  exhaustive?: boolean;
  /**
   * Oversampling factor. Minimum value is 1. It overrides the 'defaultOversampling' parameter
   * configured in the index definition. It can be set only when 'rerankWithOriginalVectors' is
   * true. This parameter is only permitted when a compression method is used on the underlying
   * vector field.
   */
  oversampling?: number;
  /**
   * Relative weight of the vector query when compared to other vector query and/or the text query within the same search request. This value is used when combining the results of multiple ranking lists produced by the different vector queries and/or the results retrieved through the text query. The higher the weight, the higher the documents that matched that query will be in the final ranking. Default is 1.0 and the value needs to be a positive number larger than zero.
   */
  weight?: number;
  /**
   * The threshold used for vector queries. Note this can only be set if all 'fields' use the same similarity metric.
   */
  threshold?: VectorThreshold;
  /**
   * The OData filter expression to apply to this specific vector query. If no filter expression is defined at the vector level, the expression defined in
   * the top level filter parameter is used instead.
   */
  filterOverride?: string;
  /**
   * Controls how many vectors can be matched from each document in a vector search query. Setting it to 1 ensures at most one vector per document is matched, guaranteeing results come from distinct documents. Setting it to 0 (unlimited) allows multiple relevant vectors from the same document to be matched. Default is 0.
   */
  perDocumentVectorLimit?: number;
}

/**
 * The query parameters to use for vector search when a raw vector value is provided.
 */
export interface VectorizedQuery<TModel extends object> extends BaseVectorQuery<TModel> {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "vector";
  /**
   * The vector representation of a search query.
   */
  vector: number[];
}

/**
 * The query parameters to use for vector search when a text value that needs to be vectorized is provided.
 */
export interface VectorizableTextQuery<TModel extends object> extends BaseVectorQuery<TModel> {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "text";
  /**
   * The text to be vectorized to perform a vector search query.
   */
  text: string;
  /**
   * Can be configured to let a generative model rewrite the query before sending it to be
   * vectorized.
   */
  queryRewrites?: QueryRewrites;
}

/**
 * The query parameters to use for vector search when an url that represents an image value that needs to be vectorized is provided.
 */
export interface VectorizableImageUrlQuery<TModel extends object> extends BaseVectorQuery<TModel> {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "imageUrl";
  /**
   * The URL of an image to be vectorized to perform a vector search query.
   */
  url: string;
}

/**
 * The query parameters to use for vector search when a base 64 encoded binary of an image that needs to be vectorized is provided.
 */
export interface VectorizableImageBinaryQuery<TModel extends object>
  extends BaseVectorQuery<TModel> {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "imageBinary";
  /**
   * The base64 encoded binary of an image to be vectorized to perform a vector search query.
   */
  binaryImage: string;
}

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query behaviors.
 */
export interface BaseSearchRequestOptions<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> {
  /**
   * A value that specifies whether to fetch the total count of results. Default is false. Setting
   * this value to true may have a performance impact. Note that the count returned is an
   * approximation.
   */
  includeTotalCount?: boolean;
  /**
   * The list of facet expressions to apply to the search query. Each facet expression contains a
   * field name, optionally followed by a comma-separated list of name:value pairs.
   */
  facets?: string[];
  /**
   * The OData $filter expression to apply to the search query.
   */
  filter?: string;
  /**
   * The comma-separated list of field names to use for hit highlights. Only searchable fields can
   * be used for hit highlighting.
   */
  highlightFields?: string;
  /**
   * A string tag that is appended to hit highlights. Must be set with highlightPreTag. Default is
   * &lt;/em&gt;.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with highlightPostTag. Default
   * is &lt;em&gt;.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be covered by a
   * search query in order for the query to be reported as a success. This parameter can be useful
   * for ensuring search availability even for services with only one replica. The default is 100.
   */
  minimumCoverage?: number;
  /**
   * The list of OData $orderby expressions by which to sort the results. Each
   * expression can be either a field name or a call to either the geo.distance() or the
   * search.score() functions. Each expression can be followed by asc to indicate ascending, or
   * desc to indicate descending. The default is ascending order. Ties will be broken by the match
   * scores of documents. If no $orderby is specified, the default sort order is descending by
   * document match score. There can be at most 32 $orderby clauses.
   */
  orderBy?: string[];
  /**
   * A value that specifies the syntax of the search query. The default is 'simple'. Use 'full' if
   * your query uses the Lucene query syntax. Possible values include: 'simple', 'full', 'semantic'
   */
  queryType?: QueryType;
  /**
   * The list of parameter values to be used in scoring functions (for example,
   * referencePointParameter) using the format name-values. For example, if the scoring profile
   * defines a function with a parameter called 'mylocation' the parameter string would be
   * "mylocation--122.2,44.8" (without the quotes).
   */
  scoringParameters?: string[];
  /**
   * The name of a scoring profile to evaluate match scores for matching documents in order to sort
   * the results.
   */
  scoringProfile?: string;
  /**
   * The comma-separated list of field names to which to scope the full-text search. When using
   * fielded search (fieldName:searchExpression) in a full Lucene query, the field names of each
   * fielded search expression take precedence over any field names listed in this parameter.
   */
  searchFields?: SearchFieldArray<TModel>;
  /**
   * The language of the query.
   */
  queryLanguage?: QueryLanguage;
  /**
   * Improve search recall by spell-correcting individual search query terms.
   */
  speller?: QuerySpeller;
  /**
   * A value that specifies whether any or all of the search terms must be matched in order to
   * count the document as a match. Possible values include: 'any', 'all'
   */
  searchMode?: SearchMode;
  /**
   * A value that specifies whether we want to calculate scoring statistics (such as document
   * frequency) globally for more consistent scoring, or locally, for lower latency. Possible
   * values include: 'Local', 'Global'
   */
  scoringStatistics?: ScoringStatistics;
  /**
   * A value to be used to create a sticky session, which can help to get more consistent results.
   * As long as the same sessionId is used, a best-effort attempt will be made to target the same
   * replica set. Be wary that reusing the same sessionID values repeatedly can interfere with the
   * load balancing of the requests across replicas and adversely affect the performance of the
   * search service. The value used as sessionId cannot start with a '_' character.
   */
  sessionId?: string;
  /**
   * The list of fields to retrieve. If unspecified, all fields marked as
   * retrievable in the schema are included.
   */
  select?: SelectArray<TFields>;
  /**
   * The number of search results to skip. This value cannot be greater than 100,000. If you need
   * to scan documents in sequence, but cannot use skip due to this limitation, consider using
   * orderby on a totally-ordered key and filter with a range query instead.
   */
  skip?: number;
  /**
   * The number of search results to retrieve. This can be used in conjunction with $skip to
   * implement client-side paging of search results. If results are truncated due to server-side
   * paging, the response will include a continuation token that can be used to issue another
   * Search request for the next page of results.
   */
  top?: number;
  /**
   * Defines options for vector search queries
   */
  vectorSearchOptions?: VectorSearchOptions<TModel>;
  /**
   * The query parameters to configure hybrid search behaviors.
   */
  hybridSearch?: HybridSearch;
  /**
   * Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents.
   */
  xMsQuerySourceAuthorization?: string;
}

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query behaviors.
 */
export type SearchRequestOptions<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = BaseSearchRequestOptions<TModel, TFields> & SearchRequestQueryTypeOptions;

export type SearchRequestQueryTypeOptions =
  | {
      queryType: "semantic";
      /**
       * Defines options for semantic search queries
       */
      semanticSearchOptions: SemanticSearchOptions;
    }
  | { queryType?: "simple" | "full" };

/**
 * Contains a document found by a search query, plus associated metadata.
 */
export type SearchResult<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = {
  /**
   * The relevance score of the document compared to other documents returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly score: number;
  /**
   * The relevance score computed by the semantic ranker for the top search results. Search results are sorted by the RerankerScore first and then by the Score. RerankerScore is only returned for queries of type 'semantic'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rerankerScore?: number;
  /**
   * The relevance score computed by boosting the Reranker Score. Search results are sorted by the RerankerScore/RerankerBoostedScore based on useScoringProfileBoostedRanking in the Semantic Config. RerankerBoostedScore is only returned for queries of type 'semantic'
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rerankerBoostedScore?: number;
  /**
   * Text fragments from the document that indicate the matching search terms, organized by each
   * applicable field; null if hit highlighting was not enabled for the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly highlights?: { [k in SelectFields<TModel>]?: string[] };
  /**
   * Captions are the most representative passages from the document relatively to the search query. They are often used as document summary. Captions are only returned for queries of type 'semantic'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly captions?: QueryCaptionResult[];

  document: NarrowedModel<TModel, TFields>;

  /**
   * Contains debugging information that can be used to further explore your search results.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly documentDebugInfo?: DocumentDebugInfo;
};

/**
 * Response containing search results from an index.
 */
export interface SearchDocumentsResultBase {
  /**
   * The total count of results found by the search operation, or null if the count was not
   * requested. If present, the count may be greater than the number of results in this response.
   * This can happen if you use the $top or $skip parameters, or if Azure AI Search can't
   * return all the requested documents in a single Search response.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly count?: number;
  /**
   * A value indicating the percentage of the index that was included in the query, or null if
   * minimumCoverage was not specified in the request.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly coverage?: number;
  /**
   * The facet query results for the search operation, organized as a collection of buckets for
   * each faceted field; null if the query did not include any facet expressions.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly facets?: { [propertyName: string]: FacetResult[] };
  /**
   * The answers query results for the search operation; null if the answers query parameter was
   * not specified or set to 'none'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly answers?: QueryAnswerResult[];
  /**
   * Debug information that applies to the search results as a whole.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly debugInfo?: DebugInfo;
  /**
   * Reason that a partial response was returned for a semantic search request.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly semanticErrorReason?: SemanticErrorReason;
  /**
   * Type of partial response that was returned for a semantic search request.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly semanticSearchResultsType?: SemanticSearchResultsType;
  /**
   * Type of query rewrite that was used to retrieve documents.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly semanticQueryRewritesResultType?: SemanticQueryRewritesResultType;
}

/**
 * Response containing search results from an index.
 */
export interface SearchDocumentsResult<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchIterator<TModel, TFields>;
}

/**
 * Response containing search page results from an index.
 */
export interface SearchDocumentsPageResult<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchResult<TModel, TFields>[];
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * Parameters for filtering, sorting, fuzzy matching, and other suggestions query behaviors.
 */
export interface SuggestRequest<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> {
  /**
   * An OData expression that filters the documents considered for suggestions.
   */
  filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the suggestion query. Default is false.
   * When set to true, the query will find suggestions even if there's a substituted or missing
   * character in the search text. While this provides a better experience in some scenarios, it
   * comes at a performance cost as fuzzy suggestion searches are slower and consume more
   * resources.
   */
  useFuzzyMatching?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted,
   * hit highlighting of suggestions is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If
   * omitted, hit highlighting of suggestions is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be covered by a
   * suggestion query in order for the query to be reported as a success. This parameter can be
   * useful for ensuring search availability even for services with only one replica. The default
   * is 80.
   */
  minimumCoverage?: number;
  /**
   * The list of OData $orderby expressions by which to sort the results. Each
   * expression can be either a field name or a call to either the geo.distance() or the
   * search.score() functions. Each expression can be followed by asc to indicate ascending, or
   * desc to indicate descending. The default is ascending order. Ties will be broken by the match
   * scores of documents. If no $orderby is specified, the default sort order is descending by
   * document match score. There can be at most 32 $orderby clauses.
   */
  orderBy?: string[];
  /**
   * The comma-separated list of field names to search for the specified search text. Target fields
   * must be included in the specified suggester.
   */
  searchFields?: SearchFieldArray<TModel>;
  /**
   * The list of fields to retrieve. If unspecified, only the key field will be
   * included in the results.
   */
  select?: SelectArray<TFields>;
  /**
  /**
   * The number of suggestions to retrieve. This must be a value between 1 and 100. The default is
   * 5.
   */
  top?: number;
}

/**
 * A result containing a document found by a suggestion query, plus associated metadata.
 */
export type SuggestResult<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = {
  /**
   * The text of the suggestion result.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly text: string;
  document: SuggestNarrowedModel<TModel, TFields>;
};

/**
 * Response containing suggestion query results from an index.
 */
export interface SuggestDocumentsResult<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SuggestResult<TModel, TFields>[];
  /**
   * A value indicating the percentage of the index that was included in the query, or null if
   * minimumCoverage was not set in the request.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly coverage?: number;
}

/**
 * Parameters for fuzzy matching, and other autocomplete query behaviors.
 */
export interface AutocompleteRequest<TModel extends object> {
  /**
   * Specifies the mode for Autocomplete. The default is 'oneTerm'. Use 'twoTerms' to get shingles
   * and 'oneTermWithContext' to use the current context while producing auto-completed terms.
   * Possible values include: 'oneTerm', 'twoTerms', 'oneTermWithContext'
   */
  autocompleteMode?: AutocompleteMode;
  /**
   * An OData expression that filters the documents used to produce completed terms for the
   * Autocomplete result.
   */
  filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the autocomplete query. Default is false.
   * When set to true, the query will autocomplete terms even if there's a substituted or missing
   * character in the search text. While this provides a better experience in some scenarios, it
   * comes at a performance cost as fuzzy autocomplete queries are slower and consume more
   * resources.
   */
  useFuzzyMatching?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted,
   * hit highlighting is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If
   * omitted, hit highlighting is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be covered by an
   * autocomplete query in order for the query to be reported as a success. This parameter can be
   * useful for ensuring search availability even for services with only one replica. The default
   * is 80.
   */
  minimumCoverage?: number;
  /**
   * The comma-separated list of field names to consider when querying for auto-completed terms.
   * Target fields must be included in the specified suggester.
   */
  searchFields?: SearchFieldArray<TModel>;
  /**
   * The number of auto-completed terms to retrieve. This must be a value between 1 and 100. The
   * default is 5.
   */
  top?: number;
}

/**
 * Represents an index action that operates on a document.
 */
export type IndexDocumentsAction<TModel> = {
  /**
   * The operation to perform on a document in an indexing batch. Possible values include:
   * 'upload', 'merge', 'mergeOrUpload', 'delete'
   */
  __actionType: IndexActionType;
} & Partial<TModel>;

// END manually modified generated interfaces

// Utility types

/**
 * If `TFields` is never, an untyped string array
 * Otherwise, a narrowed `Fields[]` type to be used elsewhere in the consuming type.
 */
export type SelectArray<TFields = never> = [string] extends [TFields]
  ? readonly TFields[]
  : (<T>() => T extends TFields ? true : false) extends <T>() => T extends never ? true : false
    ? readonly string[]
    : readonly TFields[];

/**
 * If `TModel` is an untyped object, an untyped string array
 * Otherwise, the slash-delimited fields of `TModel`.
 */
export type SearchFieldArray<TModel extends object = object> =
  (<T>() => T extends TModel ? true : false) extends <T>() => T extends object ? true : false
    ? readonly string[]
    : readonly SelectFields<TModel>[];

export type UnionToIntersection<Union> =
  // Distribute members of U into parameter position of a union of functions
  (
    Union extends unknown ? (_: Union) => unknown : never
  ) extends // Infer the intersection of the members of U as a single intersected parameter type
  (_: infer I) => unknown
    ? I
    : never;

// Types that should not be included in SelectFields recursion
export type ExcludedODataTypes = Date | GeographyPoint;

/**
 * Produces a union of valid AI Search OData $select paths for T
 * using a post-order traversal of the field tree rooted at T.
 */
export type SelectFields<TModel extends object> =
  // If T is never, any, or object, resolves to string
  (<T>() => T extends TModel ? true : false) extends <T>() => T extends never ? true : false
    ? string
    : (<T>() => T extends TModel ? true : false) extends <T>() => T extends any ? true : false
      ? string
      : (<T>() => T extends TModel ? true : false) extends <T>() => T extends object ? true : false
        ? string
        : // If T is an array, allow selecting from fields in the array's element type
          TModel extends Array<infer Elem>
          ? // Allow selecting fields only from elements which are objects
            Elem extends object
            ? SelectFields<Elem>
            : never
          : {
              // Only consider string keys
              [Key in keyof TModel]: Key extends string
                ? NonNullable<TModel[Key]> extends object
                  ? NonNullable<TModel[Key]> extends ExcludedODataTypes
                    ? // Excluded, so don't recur
                      Key
                    : // Extract subpaths from T[Key]
                      SelectFields<NonNullable<TModel[Key]>> extends infer NextPaths
                      ? // This check is required to avoid distributing `never` over the condition
                        (<T>() => T extends NextPaths ? true : false) extends <
                          T,
                        >() => T extends never ? true : false
                        ? Key
                        : NextPaths extends string
                          ? Key | `${Key}/${NextPaths}`
                          : Key
                      : never
                  : // Not an object, so can't recur
                    Key
                : never;
            }[keyof TModel & string] &
              // Filter out undefined properties
              string;

/**
 * Deeply pick fields of T using valid AI Search OData $select
 * paths.
 */
export type SearchPick<TModel extends object, TFields extends SelectFields<TModel>> =
  (<T>() => T extends TModel ? true : false) extends <T>() => T extends object ? true : false
    ? // Picking from an untyped object should return `object`
      TModel
    : // If paths is any or never, yield the original type
      (<T>() => T extends TFields ? true : false) extends <T>() => T extends any ? true : false
      ? TModel
      : (<T>() => T extends TFields ? true : false) extends <T>() => T extends never ? true : false
        ? TModel
        : // We're going to get a union of individual interfaces for each field in T that's selected, so convert that to an intersection.
          UnionToIntersection<
            // Paths is a union or single string type, so if it's a union it will be _distributed_ over this conditional.
            // Fortunately, template literal types are not greedy, so we can infer the field name easily.
            TFields extends `${infer FieldName}/${infer RestPaths}`
              ? // Symbols and numbers are invalid types for field names
                FieldName extends keyof TModel & string
                ? NonNullable<TModel[FieldName]> extends Array<infer Elem>
                  ? Elem extends object
                    ? // Extends clause is necessary to refine the constraint of RestPaths
                      RestPaths extends SelectFields<Elem>
                      ? // Narrow the type of every element in the array
                        {
                          [Key in keyof TModel as Key & FieldName]: Array<
                            SearchPick<Elem, RestPaths>
                          >;
                        }
                      : // Unreachable by construction
                        never
                    : // Don't recur on arrays of non-object types
                      never
                  : NonNullable<TModel[FieldName]> extends object
                    ? // Recur :)
                      {
                        [Key in keyof TModel as Key & FieldName]: RestPaths extends SelectFields<
                          TModel[Key] & {
                            // This empty intersection fixes `T[Key]` not being narrowed to an object type in older versions of TS
                          }
                        >
                          ?
                              | SearchPick<
                                  TModel[Key] & {
                                    // Ditto
                                  },
                                  RestPaths
                                >
                              | Extract<TModel[Key], null>
                          : // Unreachable by construction
                            never;
                      }
                    : // Unreachable by construction
                      never
                : // Ignore symbols and numbers
                  never
              : // Otherwise, capture the paths that are simple keys of T itself
                TFields extends keyof TModel
                ? Pick<TModel, TFields> | Extract<TModel, null>
                : never
          > & {
            // This useless intersection actually prevents the TypeScript language server from
            // expanding the definition of SearchPick<TModel, Paths> in IntelliSense. Since we're
            // sure the type always yields an object, this intersection does not alter the type
            // at all, only the display string of the type.
          };

export type ExtractDocumentKey<TModel> = {
  [K in keyof TModel as TModel[K] extends string | undefined ? K : never]: TModel[K];
};

/**
 * Narrows the Model type to include only the selected Fields
 */
export type NarrowedModel<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> =
  // If the model isn't specified, the type is the same as the input type
  (<T>() => T extends TModel ? true : false) extends <T>() => T extends never ? true : false
    ? TModel
    : (<T>() => T extends TModel ? true : false) extends <T>() => T extends object ? true : false
      ? TModel
      : (<T>() => T extends TModel ? true : false) extends <T>() => T extends any ? true : false
        ? TModel
        : (<T>() => T extends TModel ? true : false) extends <T>() => T extends unknown
              ? true
              : false
          ? TModel
          : (<T>() => T extends TFields ? true : false) extends <T>() => T extends never
                ? true
                : false
            ? // If fields aren't specified, this object can't exist
              never
            : (<T>() => T extends TFields ? true : false) extends <
                  T,
                >() => T extends SelectFields<TModel> ? true : false
              ? // Avoid calculating the narrowed type if every field is specified
                TModel
              : SearchPick<TModel, TFields>;

export type SuggestNarrowedModel<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> =
  (<T>() => T extends TModel ? true : false) extends <T>() => T extends never ? true : false
    ? TModel
    : (<T>() => T extends TModel ? true : false) extends <T>() => T extends object ? true : false
      ? TModel
      : (<T>() => T extends TFields ? true : false) extends <T>() => T extends never ? true : false
        ? // Filter nullable (i.e. non-key) properties from the model, as they're not returned by
          // the service by default
          keyof ExtractDocumentKey<TModel> extends never
          ? // Return the original model if none of the properties are non-nullable
            TModel
          : ExtractDocumentKey<TModel>
        : // TFields isn't narrowed to exclude null by the first condition, so it needs to be
          // narrowed here
          TFields extends SelectFields<TModel>
          ? NarrowedModel<TModel, TFields>
          : // Unreachable by construction
            never;

/**
 * Description of fields that were sent to the semantic enrichment process, as well as how they were
 * used
 */
export interface QueryResultDocumentSemanticField {
  /**
   * The name of the field that was sent to the semantic enrichment process
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The way the field was used for the semantic enrichment process (fully used, partially used, or
   * unused)
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly state?: SemanticFieldState;
}

/**
 * Contains debugging information that can be used to further explore your search results.
 */
export interface DocumentDebugInfo {
  /**
   * Contains debugging information specific to semantic search queries.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly semantic?: SemanticDebugInfo;
  /**
   * Contains debugging information specific to vector and hybrid search.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vectors?: VectorsDebugInfo;
  /**
   * Contains debugging information specific to vectors matched within a collection of complex types.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly innerHits?: {
    [propertyName: string]: QueryResultDocumentInnerHit[];
  };
}

/**
 * Debug options for semantic search queries.
 */
export interface SemanticDebugInfo {
  /**
   * The title field that was sent to the semantic enrichment process, as well as how it was used
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly titleField?: QueryResultDocumentSemanticField;
  /**
   * The content fields that were sent to the semantic enrichment process, as well as how they were used
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly contentFields?: QueryResultDocumentSemanticField[];
  /**
   * The keyword fields that were sent to the semantic enrichment process, as well as how they were used
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly keywordFields?: QueryResultDocumentSemanticField[];
  /**
   * The raw concatenated strings that were sent to the semantic enrichment process.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rerankerInput?: QueryResultDocumentRerankerInput;
}

/**
 * Extracts answer candidates from the contents of the documents returned in response to a query
 * expressed as a question in natural language.
 */
export interface ExtractiveQueryAnswer {
  answerType: "extractive";
  /**
   * The number of answers returned. Default count is 1
   */
  count?: number;
  /**
   * The confidence threshold. Default threshold is 0.7
   */
  threshold?: number;
  /**
   * An optional upper bound on the number of characters in each answer.
   */
  maxAnswerLength?: number;
}

/**
 * A value that specifies whether answers should be returned as part of the search response.
 * This parameter is only valid if the query type is 'semantic'. If set to `extractive`, the query
 * returns answers extracted from key passages in the highest ranked documents.
 */
export type QueryAnswer = ExtractiveQueryAnswer;

/**
 * Extracts captions from the matching documents that contain passages relevant to the search query.
 */
export interface ExtractiveQueryCaption {
  captionType: "extractive";
  highlight?: boolean;
  /**
   * An optional upper bound on the number of characters in each caption.
   */
  maxCaptionLength?: number;
}

/**
 * A value that specifies whether captions should be returned as part of the search response.
 * This parameter is only valid if the query type is 'semantic'. If set, the query returns captions
 * extracted from key passages in the highest ranked documents. When Captions is 'extractive',
 * highlighting is enabled by default. Defaults to 'none'.
 */
export type QueryCaption = ExtractiveQueryCaption;

/**
 * Defines options for semantic search queries
 */
export interface SemanticSearchOptions {
  /**
   * The name of a semantic configuration that will be used when processing documents for queries of
   * type semantic.
   */
  configurationName?: string;
  /**
   * Allows the user to choose whether a semantic call should fail completely, or to return partial
   * results (default).
   */
  errorMode?: SemanticErrorMode;
  /**
   * Allows the user to set an upper bound on the amount of time it takes for semantic enrichment
   * to finish processing before the request fails.
   */
  maxWaitInMilliseconds?: number;
  /**
   * If set, the query returns answers extracted from key passages in the highest ranked documents.
   */
  answers?: QueryAnswer;
  /**
   * If set, the query returns captions extracted from key passages in the highest ranked
   * documents. When Captions is set to 'extractive', highlighting is enabled by default. Defaults
   * to 'None'.
   */
  captions?: QueryCaption;
  /**
   * When QueryRewrites is set to `generative`, the query terms are sent to a generate model which will
   * produce 10 (default) rewrites to help increase the recall of the request. Defaults to `none`.
   */
  queryRewrites?: QueryRewrites;
  /**
   * Allows setting a separate search query that will be solely used for semantic reranking,
   * semantic captions and semantic answers. Is useful for scenarios where there is a need to use
   * different queries between the base retrieval and ranking phase, and the L2 semantic phase.
   */
  semanticQuery?: string;
  /**
   * The list of field names used for semantic search.
   */
  semanticFields?: string[];
  /**
   * Enables a debugging tool that can be used to further explore your search results.
   */
  debugMode?: QueryDebugMode;
}

/**
 * Defines options for query rewrites.
 */
export type QueryRewrites = GenerativeQueryRewrites;

/**
 * Generate alternative query terms to increase the recall of a search request.
 */
export interface GenerativeQueryRewrites {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  rewritesType: "generative";
  /**
   * The number of query rewrites to generate. Defaults to 10.
   */
  count?: number;
}

/**
 * Defines options for vector search queries
 */
export interface VectorSearchOptions<TModel extends object> {
  /**
   * The query parameters for vector, hybrid, and multi-vector search queries.
   */
  queries: VectorQuery<TModel>[];
  /**
   * Determines whether or not filters are applied before or after the vector search is performed.
   * Default is 'preFilter'.
   */
  filterMode?: VectorFilterMode;
}
/**
 * The threshold used for vector queries.
 */
export interface BaseVectorThreshold {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "vectorSimilarity" | "searchScore";
}

/**
 * The results of the vector query will be filtered based on the vector similarity metric. Note this
 * is the canonical definition of similarity metric, not the 'distance' version. The threshold
 * direction (larger or smaller) will be chosen automatically according to the metric used by the
 * field.
 */
export interface VectorSimilarityThreshold extends BaseVectorThreshold {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "vectorSimilarity";
  /**
   * The threshold will filter based on the similarity metric value. Note this is the canonical
   * definition of similarity metric, not the 'distance' version. The threshold direction (larger or
   * smaller) will be chosen automatically according to the metric used by the field.
   */
  value: number;
}

/**
 * The results of the vector query will filter based on the '\@search.score' value. Note this is the
 * \@search.score returned as part of the search response. The threshold direction will be chosen
 * for higher \@search.score.
 */
export interface SearchScoreThreshold extends BaseVectorThreshold {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "searchScore";
  /**
   * The threshold will filter based on the '\@search.score' value. Note this is the \@search.score
   * returned as part of the search response. The threshold direction will be chosen for higher
   * \@search.score.
   */
  value: number;
}

/**
 * The threshold used for vector queries.
 */
export type VectorThreshold = VectorSimilarityThreshold | SearchScoreThreshold;
export type SemanticErrorMode = `${KnownSemanticErrorMode}`;
export type SemanticErrorReason = `${KnownSemanticErrorReason}`;
export type SemanticSearchResultsType = `${KnownSemanticSearchResultsType}`;
export type VectorFilterMode = `${KnownVectorFilterMode}`;
export type VectorQueryKind = `${KnownVectorQueryKind}`;
