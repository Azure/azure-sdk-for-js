// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  QueryType,
  ScoringStatistics,
  QueryDebugMode,
  SearchMode,
  QueryLanguage,
  QuerySpellerType,
  SemanticErrorMode,
  QueryAnswerType,
  QueryCaptionType,
  QueryRewritesType,
  VectorQueryUnion,
  VectorFilterMode,
  HybridSearch,
  AutocompleteMode,
} from "../../models/azure/search/documents/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AutocompletePostOptionalParams extends OperationOptions {
  /** Specifies the mode for Autocomplete. The default is 'oneTerm'. Use 'twoTerms' to get shingles and 'oneTermWithContext' to use the current context while producing auto-completed terms. */
  autocompleteMode?: AutocompleteMode;
  /** An OData expression that filters the documents used to produce completed terms for the Autocomplete result. */
  filter?: string;
  /** A value indicating whether to use fuzzy matching for the autocomplete query. Default is false. When set to true, the query will autocomplete terms even if there's a substituted or missing character in the search text. While this provides a better experience in some scenarios, it comes at a performance cost as fuzzy autocomplete queries are slower and consume more resources. */
  useFuzzyMatching?: boolean;
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted, hit highlighting is disabled. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If omitted, hit highlighting is disabled. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by an autocomplete query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 80. */
  minimumCoverage?: number;
  /** The comma-separated list of field names to consider when querying for auto-completed terms. Target fields must be included in the specified suggester. */
  searchFields?: string[];
  /** The number of auto-completed terms to retrieve. This must be a value between 1 and 100. The default is 5. */
  top?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface AutocompleteGetOptionalParams extends OperationOptions {
  /** Specifies the mode for Autocomplete. The default is 'oneTerm'. Use 'twoTerms' to get shingles and 'oneTermWithContext' to use the current context while producing auto-completed terms. */
  autocompleteMode?: AutocompleteMode;
  /** An OData expression that filters the documents used to produce completed terms for the Autocomplete result. */
  filter?: string;
  /** A value indicating whether to use fuzzy matching for the autocomplete query. Default is false. When set to true, the query will find terms even if there's a substituted or missing character in the search text. While this provides a better experience in some scenarios, it comes at a performance cost as fuzzy autocomplete queries are slower and consume more resources. */
  useFuzzyMatching?: boolean;
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted, hit highlighting is disabled. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If omitted, hit highlighting is disabled. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by an autocomplete query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 80. */
  minimumCoverage?: number;
  /** The list of field names to consider when querying for auto-completed terms. Target fields must be included in the specified suggester. */
  searchFields?: string[];
  /** The number of auto-completed terms to retrieve. This must be a value between 1 and 100. The default is 5. */
  top?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface IndexOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SuggestPostOptionalParams extends OperationOptions {
  /** An OData expression that filters the documents considered for suggestions. */
  filter?: string;
  /** A value indicating whether to use fuzzy matching for the suggestion query. Default is false. When set to true, the query will find suggestions even if there's a substituted or missing character in the search text. While this provides a better experience in some scenarios, it comes at a performance cost as fuzzy suggestion searches are slower and consume more resources. */
  useFuzzyMatching?: boolean;
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted, hit highlighting of suggestions is disabled. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If omitted, hit highlighting of suggestions is disabled. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by a suggestion query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 80. */
  minimumCoverage?: number;
  /** The comma-separated list of OData $orderby expressions by which to sort the results. Each expression can be either a field name or a call to either the geo.distance() or the search.score() functions. Each expression can be followed by asc to indicate ascending, or desc to indicate descending. The default is ascending order. Ties will be broken by the match scores of documents. If no $orderby is specified, the default sort order is descending by document match score. There can be at most 32 $orderby clauses. */
  orderBy?: string;
  /** The comma-separated list of field names to search for the specified search text. Target fields must be included in the specified suggester. */
  searchFields?: string;
  /** The comma-separated list of fields to retrieve. If unspecified, only the key field will be included in the results. */
  select?: string;
  /** The number of suggestions to retrieve. This must be a value between 1 and 100. The default is 5. */
  top?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SuggestGetOptionalParams extends OperationOptions {
  /** An OData expression that filters the documents considered for suggestions. */
  filter?: string;
  /** A value indicating whether to use fuzzy matching for the suggestions query. Default is false. When set to true, the query will find terms even if there's a substituted or missing character in the search text. While this provides a better experience in some scenarios, it comes at a performance cost as fuzzy suggestions queries are slower and consume more resources. */
  useFuzzyMatching?: boolean;
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. If omitted, hit highlighting of suggestions is disabled. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. If omitted, hit highlighting of suggestions is disabled. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by a suggestions query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 80. */
  minimumCoverage?: number;
  /** The list of OData $orderby expressions by which to sort the results. Each expression can be either a field name or a call to either the geo.distance() or the search.score() functions. Each expression can be followed by asc to indicate ascending, or desc to indicate descending. The default is ascending order. Ties will be broken by the match scores of documents. If no $orderby is specified, the default sort order is descending by document match score. There can be at most 32 $orderby clauses. */
  orderBy?: string;
  /** The list of field names to search for the specified search text. Target fields must be included in the specified suggester. */
  searchFields?: string;
  /** The list of fields to retrieve. If unspecified, only the key field will be included in the results. */
  select?: string;
  /** The number of suggestions to retrieve. The value must be a number between 1 and 100. The default is 5. */
  top?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetDocumentOptionalParams extends OperationOptions {
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** A value that enables elevated read that bypass document level permission checks for the query operation. */
  enableElevatedRead?: boolean;
  /** List of field names to retrieve for the document; Any field not retrieved will be missing from the returned document. */
  selectedFields?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SearchPostOptionalParams extends OperationOptions {
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** A value that enables elevated read that bypass document level permission checks for the query operation. */
  enableElevatedRead?: boolean;
  /** A value that specifies whether to fetch the total count of results. Default is false. Setting this value to true may have a performance impact. Note that the count returned is an approximation. */
  includeTotalCount?: boolean;
  /** The list of facet expressions to apply to the search query. Each facet expression contains a field name, optionally followed by a comma-separated list of name:value pairs. */
  facets?: string[];
  /** The OData $filter expression to apply to the search query. */
  filter?: string;
  /** The comma-separated list of field names to use for hit highlights. Only searchable fields can be used for hit highlighting. */
  highlightFields?: string[];
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. Default is &lt;/em&gt;. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. Default is &lt;em&gt;. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by a search query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 100. */
  minimumCoverage?: number;
  /** The comma-separated list of OData $orderby expressions by which to sort the results. Each expression can be either a field name or a call to either the geo.distance() or the search.score() functions. Each expression can be followed by asc to indicate ascending, or desc to indicate descending. The default is ascending order. Ties will be broken by the match scores of documents. If no $orderby is specified, the default sort order is descending by document match score. There can be at most 32 $orderby clauses. */
  orderBy?: string;
  /** A value that specifies the syntax of the search query. The default is 'simple'. Use 'full' if your query uses the Lucene query syntax. */
  queryType?: QueryType;
  /** A value that specifies whether we want to calculate scoring statistics (such as document frequency) globally for more consistent scoring, or locally, for lower latency. The default is 'local'. Use 'global' to aggregate scoring statistics globally before scoring. Using global scoring statistics can increase latency of search queries. */
  scoringStatistics?: ScoringStatistics;
  /** A value to be used to create a sticky session, which can help getting more consistent results. As long as the same sessionId is used, a best-effort attempt will be made to target the same replica set. Be wary that reusing the same sessionID values repeatedly can interfere with the load balancing of the requests across replicas and adversely affect the performance of the search service. The value used as sessionId cannot start with a '_' character. */
  sessionId?: string;
  /** The list of parameter values to be used in scoring functions (for example, referencePointParameter) using the format name-values. For example, if the scoring profile defines a function with a parameter called 'mylocation' the parameter string would be "mylocation--122.2,44.8" (without the quotes). */
  scoringParameters?: string[];
  /** The name of a scoring profile to evaluate match scores for matching documents in order to sort the results. */
  scoringProfile?: string;
  /** Enables a debugging tool that can be used to further explore your reranked results. */
  debug?: QueryDebugMode;
  /** A full-text search query expression; Use "*" or omit this parameter to match all documents. */
  searchText?: string;
  /** The comma-separated list of field names to which to scope the full-text search. When using fielded search (fieldName:searchExpression) in a full Lucene query, the field names of each fielded search expression take precedence over any field names listed in this parameter. */
  searchFields?: string;
  /** A value that specifies whether any or all of the search terms must be matched in order to count the document as a match. */
  searchMode?: SearchMode;
  /** A value that specifies the language of the search query. */
  queryLanguage?: QueryLanguage;
  /** A value that specifies the type of the speller to use to spell-correct individual search query terms. */
  querySpeller?: QuerySpellerType;
  /** The comma-separated list of fields to retrieve. If unspecified, all fields marked as retrievable in the schema are included. */
  select?: string;
  /** The number of search results to skip. This value cannot be greater than 100,000. If you need to scan documents in sequence, but cannot use skip due to this limitation, consider using orderby on a totally-ordered key and filter with a range query instead. */
  skip?: number;
  /** The number of search results to retrieve. This can be used in conjunction with $skip to implement client-side paging of search results. If results are truncated due to server-side paging, the response will include a continuation token that can be used to issue another Search request for the next page of results. */
  top?: number;
  /** The name of a semantic configuration that will be used when processing documents for queries of type semantic. */
  semanticConfigurationName?: string;
  /** Allows the user to choose whether a semantic call should fail completely (default / current behavior), or to return partial results. */
  semanticErrorHandling?: SemanticErrorMode;
  /** Allows the user to set an upper bound on the amount of time it takes for semantic enrichment to finish processing before the request fails. */
  semanticMaxWaitInMilliseconds?: number;
  /** Allows setting a separate search query that will be solely used for semantic reranking, semantic captions and semantic answers. Is useful for scenarios where there is a need to use different queries between the base retrieval and ranking phase, and the L2 semantic phase. */
  semanticQuery?: string;
  /** A value that specifies whether answers should be returned as part of the search response. */
  answers?: QueryAnswerType;
  /** A value that specifies whether captions should be returned as part of the search response. */
  captions?: QueryCaptionType;
  /** A value that specifies whether query rewrites should be generated to augment the search query. */
  queryRewrites?: QueryRewritesType;
  /** The comma-separated list of field names used for semantic ranking. */
  semanticFields?: string[];
  /** The query parameters for vector and hybrid search queries. */
  vectorQueries?: VectorQueryUnion[];
  /** Determines whether or not filters are applied before or after the vector search is performed. Default is 'preFilter' for new indexes. */
  vectorFilterMode?: VectorFilterMode;
  /** The query parameters to configure hybrid search behaviors. */
  hybridSearch?: HybridSearch;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SearchGetOptionalParams extends OperationOptions {
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** A value that enables elevated read that bypass document level permission checks for the query operation. */
  enableElevatedRead?: boolean;
  /** A full-text search query expression; Use "*" or omit this parameter to match all documents. */
  searchText?: string;
  /** A value that specifies whether to fetch the total count of results. Default is false. Setting this value to true may have a performance impact. Note that the count returned is an approximation. */
  includeTotalResultCount?: boolean;
  /** The list of facet expressions to apply to the search query. Each facet expression contains a field name, optionally followed by a comma-separated list of name:value pairs. */
  facets?: string[];
  /** The OData $filter expression to apply to the search query. */
  filter?: string;
  /** The list of field names to use for hit highlights. Only searchable fields can be used for hit highlighting. */
  highlightFields?: string[];
  /** A string tag that is appended to hit highlights. Must be set with highlightPreTag. Default is &lt;/em&gt;. */
  highlightPostTag?: string;
  /** A string tag that is prepended to hit highlights. Must be set with highlightPostTag. Default is &lt;em&gt;. */
  highlightPreTag?: string;
  /** A number between 0 and 100 indicating the percentage of the index that must be covered by a search query in order for the query to be reported as a success. This parameter can be useful for ensuring search availability even for services with only one replica. The default is 100. */
  minimumCoverage?: number;
  /** The list of OData $orderby expressions by which to sort the results. Each expression can be either a field name or a call to either the geo.distance() or the search.score() functions. Each expression can be followed by asc to indicate ascending, and desc to indicate descending. The default is ascending order. Ties will be broken by the match scores of documents. If no OrderBy is specified, the default sort order is descending by document match score. There can be at most 32 $orderby clauses. */
  orderBy?: string;
  /** A value that specifies the syntax of the search query. The default is 'simple'. Use 'full' if your query uses the Lucene query syntax. */
  queryType?: QueryType;
  /** The list of parameter values to be used in scoring functions (for example, referencePointParameter) using the format name-values. For example, if the scoring profile defines a function with a parameter called 'mylocation' the parameter string would be "mylocation--122.2,44.8" (without the quotes). */
  scoringParameters?: string[];
  /** The name of a scoring profile to evaluate match scores for matching documents in order to sort the results. */
  scoringProfile?: string;
  /** The list of field names to which to scope the full-text search. When using fielded search (fieldName:searchExpression) in a full Lucene query, the field names of each fielded search expression take precedence over any field names listed in this parameter. */
  searchFields?: string;
  /** A value that specifies whether any or all of the search terms must be matched in order to count the document as a match. */
  searchMode?: SearchMode;
  /** A value that specifies whether we want to calculate scoring statistics (such as document frequency) globally for more consistent scoring, or locally, for lower latency. */
  scoringStatistics?: ScoringStatistics;
  /** A value to be used to create a sticky session, which can help to get more consistent results. As long as the same sessionId is used, a best-effort attempt will be made to target the same replica set. Be wary that reusing the same sessionID values repeatedly can interfere with the load balancing of the requests across replicas and adversely affect the performance of the search service. The value used as sessionId cannot start with a '_' character. */
  sessionId?: string;
  /** The list of fields to retrieve. If unspecified, all fields marked as retrievable in the schema are included. */
  select?: string;
  /** The number of search results to skip. This value cannot be greater than 100,000. If you need to scan documents in sequence, but cannot use $skip due to this limitation, consider using $orderby on a totally-ordered key and $filter with a range query instead. */
  skip?: number;
  /** The number of search results to retrieve. This can be used in conjunction with $skip to implement client-side paging of search results. If results are truncated due to server-side paging, the response will include a continuation token that can be used to issue another Search request for the next page of results. */
  top?: number;
  /** The name of the semantic configuration that lists which fields should be used for semantic ranking, captions, highlights, and answers */
  semanticConfiguration?: string;
  /** Allows the user to choose whether a semantic call should fail completely, or to return partial results (default). */
  semanticErrorHandling?: SemanticErrorMode;
  /** Allows the user to set an upper bound on the amount of time it takes for semantic enrichment to finish processing before the request fails. */
  semanticMaxWaitInMilliseconds?: number;
  /** This parameter is only valid if the query type is `semantic`. If set, the query returns answers extracted from key passages in the highest ranked documents. The number of answers returned can be configured by appending the pipe character `|` followed by the `count-<number of answers>` option after the answers parameter value, such as `extractive|count-3`. Default count is 1. The confidence threshold can be configured by appending the pipe character `|` followed by the `threshold-<confidence threshold>` option after the answers parameter value, such as `extractive|threshold-0.9`. Default threshold is 0.7. The maximum character length of answers can be configured by appending the pipe character '|' followed by the 'count-<number of maximum character length>', such as 'extractive|maxcharlength-600'. */
  answers?: QueryAnswerType;
  /** This parameter is only valid if the query type is `semantic`. If set, the query returns captions extracted from key passages in the highest ranked documents. When Captions is set to `extractive`, highlighting is enabled by default, and can be configured by appending the pipe character `|` followed by the `highlight-<true/false>` option, such as `extractive|highlight-true`. Defaults to `None`. The maximum character length of captions can be configured by appending the pipe character '|' followed by the 'count-<number of maximum character length>', such as 'extractive|maxcharlength-600'. */
  captions?: QueryCaptionType;
  /** Allows setting a separate search query that will be solely used for semantic reranking, semantic captions and semantic answers. Is useful for scenarios where there is a need to use different queries between the base retrieval and ranking phase, and the L2 semantic phase. */
  semanticQuery?: string;
  /** When QueryRewrites is set to `generative`, the query terms are sent to a generate model which will produce 10 (default) rewrites to help increase the recall of the request. The requested count can be configured by appending the pipe character `|` followed by the `count-<number of rewrites>` option, such as `generative|count-3`. Defaults to `None`. This parameter is only valid if the query type is `semantic`. */
  queryRewrites?: QueryRewritesType;
  /** Enables a debugging tool that can be used to further explore your search results. */
  debug?: QueryDebugMode;
  /** The language of the query. */
  queryLanguage?: QueryLanguage;
  /** Improve search recall by spell-correcting individual search query terms. */
  speller?: QuerySpellerType;
  /** The list of field names used for semantic ranking. */
  semanticFields?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetDocumentCountOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
