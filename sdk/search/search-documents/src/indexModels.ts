// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  QueryType,
  SearchMode,
  FacetResult,
  AutocompleteMode,
  IndexActionType,
  ScoringStatistics,
  QueryLanguage,
  Speller,
  Answers,
  CaptionResult,
  AnswerResult,
  Captions,
  QuerySpellerType,
  QueryAnswerType,
  QueryCaptionType,
} from "./generated/data/models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

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
export interface GetDocumentOptions<Fields> extends OperationOptions {
  /**
   * List of field names to retrieve for the document; Any field not retrieved will be missing from
   * the returned document.
   */
  selectedFields?: Fields[];
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
export type AutocompleteOptions<T extends object> = OperationOptions & AutocompleteRequest<T>;
/**
 * Options for committing a full search request.
 */
export type SearchOptions<T extends object, Fields extends SelectFields<T>> = OperationOptions &
  SearchRequestOptions<T, Fields>;
/**
 * Options for retrieving suggestions based on the searchText.
 */
export type SuggestOptions<T extends object, Fields extends SelectFields<T>> = OperationOptions &
  SuggestRequest<T, Fields>;

/**
 * An iterator for search results of a paticular query. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type SearchIterator<T extends object> = PagedAsyncIterableIterator<
  SearchResult<T>,
  SearchDocumentsPageResult<T>,
  ListSearchResultsPageSettings
>;

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query behaviors.
 */
export interface SearchRequest {
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
   * The comma-separated list of OData $orderby expressions by which to sort the results. Each
   * expression can be either a field name or a call to either the geo.distance() or the
   * search.score() functions. Each expression can be followed by asc to indicate ascending, or
   * desc to indicate descending. The default is ascending order. Ties will be broken by the match
   * scores of documents. If no $orderby is specified, the default sort order is descending by
   * document match score. There can be at most 32 $orderby clauses.
   */
  orderBy?: string;
  /**
   * A value that specifies the syntax of the search query. The default is 'simple'. Use 'full' if
   * your query uses the Lucene query syntax. Possible values include: 'Simple', 'Full'
   */
  queryType?: QueryType;
  /**
   * A value that specifies whether we want to calculate scoring statistics (such as document
   * frequency) globally for more consistent scoring, or locally, for lower latency. The default is
   * 'local'. Use 'global' to aggregate scoring statistics globally before scoring. Using global
   * scoring statistics can increase latency of search queries. Possible values include: 'Local',
   * 'Global'
   */
  scoringStatistics?: ScoringStatistics;
  /**
   * A value to be used to create a sticky session, which can help getting more consistent results.
   * As long as the same sessionId is used, a best-effort attempt will be made to target the same
   * replica set. Be wary that reusing the same sessionID values repeatedly can interfere with the
   * load balancing of the requests across replicas and adversely affect the performance of the
   * search service. The value used as sessionId cannot start with a '_' character.
   */
  sessionId?: string;
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
   * The name of a semantic configuration that will be used when processing documents for queries of
   * type semantic.
   */
  semanticConfiguration?: string;
  /**
   * A full-text search query expression; Use "*" or omit this parameter to match all documents.
   */
  searchText?: string;
  /**
   * The comma-separated list of field names to which to scope the full-text search. When using
   * fielded search (fieldName:searchExpression) in a full Lucene query, the field names of each
   * fielded search expression take precedence over any field names listed in this parameter.
   */
  searchFields?: string;
  /**
   * A value that specifies whether any or all of the search terms must be matched in order to
   * count the document as a match. Possible values include: 'Any', 'All'
   */
  searchMode?: SearchMode;
  /**
   * A value that specifies the language of the search query.
   */
  queryLanguage?: QueryLanguage;
  /**
   * A value that specified the type of the speller to use to spell-correct individual search
   * query terms.
   */
  speller?: QuerySpellerType;
  /**
   * A value that specifies whether answers should be returned as part of the search response.
   */
  answers?: QueryAnswerType;
  /**
   * The comma-separated list of fields to retrieve. If unspecified, all fields marked as
   * retrievable in the schema are included.
   */
  select?: string;
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
   * A value that specifies whether captions should be returned as part of the search response.
   */
  captions?: QueryCaptionType;
  /**
   * The comma-separated list of field names used for semantic search.
   */
  semanticFields?: string;
}

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query behaviors.
 */
export interface SearchRequestOptions<T extends object, Fields extends SelectFields<T>> {
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
   * your query uses the Lucene query syntax. Possible values include: 'simple', 'full'
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
  searchFields?: SelectFields<T>[];
  /**
   * The language of the query.
   */
  queryLanguage?: QueryLanguage;
  /**
   * Improve search recall by spell-correcting individual search query terms.
   */
  speller?: Speller;
  /**
   * This parameter is only valid if the query type is 'semantic'. If set, the query returns answers
   * extracted from key passages in the highest ranked documents. The number of answers returned can
   * be configured by appending the pipe character '|' followed by the 'count-\<number of answers\>' option
   * after the answers parameter value, such as 'extractive|count-3'. Default count is 1.
   */
  answers?: Answers;
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
  select?: Fields[];
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
   * This parameter is only valid if the query type is 'semantic'. If set, the query returns captions
   * extracted from key passages in the highest ranked documents. When Captions is set to 'extractive',
   * highlighting is enabled by default, and can be configured by appending the pipe character '|'
   * followed by the 'highlight-true'/'highlight-false' option, such as 'extractive|highlight-true'. Defaults to 'None'.
   */
  captions?: Captions;
  /**
   * The list of field names used for semantic search.
   */
  semanticFields?: string[];
}

/**
 * Contains a document found by a search query, plus associated metadata.
 */
export type SearchResult<T extends object> = {
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
   * Text fragments from the document that indicate the matching search terms, organized by each
   * applicable field; null if hit highlighting was not enabled for the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly highlights?: { [k in SelectFields<T>]?: string[] };
  /**
   * Captions are the most representative passages from the document relatively to the search query. They are often used as document summary. Captions are only returned for queries of type 'semantic'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly captions?: CaptionResult[];

  document: T;
};

/**
 * Response containing search results from an index.
 */
export interface SearchDocumentsResultBase {
  /**
   * The total count of results found by the search operation, or null if the count was not
   * requested. If present, the count may be greater than the number of results in this response.
   * This can happen if you use the $top or $skip parameters, or if Azure Cognitive Search can't
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
  readonly answers?: AnswerResult[];
}

/**
 * Response containing search results from an index.
 */
export interface SearchDocumentsResult<T extends object> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchIterator<T>;
}

/**
 * Response containing search page results from an index.
 */
export interface SearchDocumentsPageResult<T extends object> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchResult<T>[];
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * Parameters for filtering, sorting, fuzzy matching, and other suggestions query behaviors.
 */
export interface SuggestRequest<T extends object, Fields extends SelectFields<T>> {
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
  searchFields?: SelectFields<T>[];
  /**
   * The list of fields to retrieve. If unspecified, only the key field will be
   * included in the results.
   */
  select?: Fields[];
  /**
   * The number of suggestions to retrieve. This must be a value between 1 and 100. The default is
   * 5.
   */
  top?: number;
}

/**
 * A result containing a document found by a suggestion query, plus associated metadata.
 */
export type SuggestResult<T> = {
  /**
   * The text of the suggestion result.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly text: string;
  document: T;
};

/**
 * Response containing suggestion query results from an index.
 */
export interface SuggestDocumentsResult<T> {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SuggestResult<T>[];
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
export interface AutocompleteRequest<T extends object> {
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
  searchFields?: SelectFields<T>[];
  /**
   * The number of auto-completed terms to retrieve. This must be a value between 1 and 100. The
   * default is 5.
   */
  top?: number;
}

/**
 * Represents an index action that operates on a document.
 */
export type IndexDocumentsAction<T> = {
  /**
   * The operation to perform on a document in an indexing batch. Possible values include:
   * 'upload', 'merge', 'mergeOrUpload', 'delete'
   */
  __actionType: IndexActionType;
} & Partial<T>;

// END manually modified generated interfaces

// Utility types

export type UnionToIntersection<U> =
  // Distribute members of U into parameter position of a union of functions
  (
    U extends unknown ? (_: U) => unknown : never
  ) extends // Infer the intersection of the members of U as a single intersected parameter type
  (_: infer I) => unknown
    ? I
    : never;

// Types that should not be included in SelectPaths recursion
export type ExcludedODataTypes = Date;

/**
 * Produces a union of valid Cognitive Search OData $select paths for T
 * using a post-order traversal of the field tree rooted at T.
 */
export type SelectFields<T extends object> = T extends (infer U)[]
  ? // Allow selecting fields only from elements which are objects
    NonNullable<U> extends object
    ? SelectFields<NonNullable<U>>
    : never
  : {
      // Only consider string keys
      [K in Exclude<keyof T, symbol | number>]: NonNullable<T[K]> extends object
        ? NonNullable<T[K]> extends ExcludedODataTypes
          ? // Excluded, so don't recur
            K
          : SelectFields<NonNullable<T[K]>> extends infer NextPaths extends string
          ? // Union this key with all the next paths separated with '/'
            K | `${K}/${NextPaths}`
          : // We didn't infer any nested paths, so just use this key
            K
        : // Not an object, so can't recur
          K;
    }[Exclude<keyof T, symbol | number>];

/**
 * Deeply pick fields of T using valid Cognitive Search OData $select
 * paths.
 */
export type SearchPick<T extends object, Paths extends SelectFields<T>> =
  // We're going to get a union of individual interfaces for each field in T that's selected, so convert that to an intersection.
  UnionToIntersection<
    // Paths is a union or single string type, so if it's a union it will be _distributed_ over this conditional.
    // Fortunately, template literal types are not greedy, so we can infer the field name easily.
    Paths extends `${infer FieldName extends Exclude<keyof T, symbol | number>}/${infer RestPaths}`
      ? NonNullable<T[FieldName]> extends object
        ? NonNullable<T[FieldName]> extends Array<infer U extends object>
          ? // Extends clause is necessary to refine the constraint of RestPaths
            RestPaths extends SelectFields<U>
            ? // Narrow the type of every element in the array
              {
                [K in FieldName]: Array<SearchPick<U, RestPaths>> | Extract<T[K], null | undefined>;
              }
            : // Unreachable by construction
              never
          : // Recur :)
            {
              [K in FieldName]: RestPaths extends SelectFields<NonNullable<T[K]>>
                ? SearchPick<NonNullable<T[K]>, RestPaths> | Extract<T[K], null | undefined>
                : // Unreachable by construction
                  never;
            }
        : // Unreachable by construction
          never
      : // Otherwise, capture the paths that are simple keys of T itself
      Paths extends keyof T
      ? { [K in Paths]: T[K] }
      : // Unreachable by construction
        never
  > & {
    // This useless intersection actually prevents the TypeScript language server from
    // expanding the definition of SearchPick<T, Paths> in IntelliSense. Since we're
    // sure the type always yields an object, this intersection does not alter the type
    // at all, only the display string of the type.
  };
