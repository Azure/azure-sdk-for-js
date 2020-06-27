// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  QueryType,
  SearchMode,
  FacetResult,
  AutocompleteMode,
  IndexActionType
} from "./generated/data/models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Options for performing the count operation on the index.
 */
export type CountDocumentsOptions = OperationOptions;
/**
 * Options for retrieving completion text for a partial searchText.
 */
export type AutocompleteOptions<Fields> = OperationOptions & AutocompleteRequest<Fields>;
/**
 * Options for committing a full search request.
 */
export type SearchOptions<Fields> = OperationOptions & SearchRequestOptions<Fields>;
/**
 * Options for retrieving suggestions based on the searchText.
 */
export type SuggestOptions<Fields> = OperationOptions & SuggestRequest<Fields>;

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

/**
 * An iterator for search results of a paticular query. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type SearchIterator<Fields> = PagedAsyncIterableIterator<
  SearchResult<Fields>,
  SearchDocumentsPageResult<Fields>,
  ListSearchResultsPageSettings
>;

// BEGIN manually modified generated interfaces
//
// This section is for places where we have to manually fix issues
// with interfaces from the generated code.
// Mostly this is to allow modeling additionalProperties:true as generics.

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
}

/**
 * Parameters for filtering, sorting, faceting, paging, and other search query behaviors.
 */
export interface SearchRequestOptions<Fields> {
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
  searchFields?: Fields[];
  /**
   * A value that specifies whether any or all of the search terms must be matched in order to
   * count the document as a match. Possible values include: 'any', 'all'
   */
  searchMode?: SearchMode;
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
}

/**
 * Contains a document found by a search query, plus associated metadata.
 */
export type SearchResult<T> = {
  /**
   * The relevance score of the document compared to other documents returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly score: number;
  /**
   * Text fragments from the document that indicate the matching search terms, organized by each
   * applicable field; null if hit highlighting was not enabled for the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly highlights?: { [propertyName: string]: string[] };

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
}

/**
 * Response containing search results from an index.
 */
export interface SearchDocumentsResult<T> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchIterator<T>;
}

/**
 * Response containing search page results from an index.
 */
export interface SearchDocumentsPageResult<T> extends SearchDocumentsResultBase {
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
export interface SuggestRequest<Fields> {
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
  searchFields?: Fields[];
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
export interface AutocompleteRequest<Fields> {
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
  searchFields?: Fields[];
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
